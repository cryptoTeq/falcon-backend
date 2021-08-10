import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Card, QrCodeInfo, CardStatus, OperationalZone } from './card.entity';
import { CONFIG } from '../config/configuration';
import { InjectRepository } from '@nestjs/typeorm';
import { generator } from 'rand-token';
import { Repository } from 'typeorm';
import { fill } from 'lodash';
import {
  TransactionStatus,
  WalletTransaction,
} from '../wallets/entity/walletTransaction.entity';
import { Utils } from '../utils';
import { WalletsService } from '../wallets/wallets.service';
import { CardGenerationReq, CardGenerationResult } from './dto/card.dto';
import { Asset } from '../assets/asset.entity';
import { FactoryType, TxFromCardGenReq } from '../wallets/transaction.factory';
import { TransactionsService } from '../wallets/transactions.service';
import { TransferReq } from '../wallets/dto';

@Injectable()
export class CardsService {
  constructor(
    private readonly configService: ConfigService,
    private readonly walletsService: WalletsService,
    private readonly transactionsService: TransactionsService,
    @InjectRepository(Card)
    private cardsRepository: Repository<Card>,
  ) {}

  generateQrCode(serial: string, key: string): string {
    const secret = this.configService.get<string>(CONFIG.CARD_QRCODE_SECRET);
    const data = {
      serial,
      key,
    };
    return Utils.encrypt(secret, JSON.stringify(data));
  }

  generateCard(asset: Asset, size: string): Card {
    const result = new Card();
    result.status = CardStatus.ACTIVE;
    result.assetId = asset.id;
    result.assetType = asset.type;
    result.size = size;
    result.generationRequestId = 0;
    result.generationTxId = 0;
    result.serial = this.generateCardSerial();
    result.key = this.generateCardKey(result.serial); // TODO: generate key
    result.generationRequestId = 0; // TODO: CardGenRequest
    result.symbol = asset.symbol;
    result.qrCode = this.generateQrCode(result.serial, result.key);

    return result;
  }

  async generateCards(cgReq: CardGenerationReq): Promise<CardGenerationResult> {
    const { enrichedAsset: asset, cardBills } = cgReq;

    const cardsToBePersisted = {};
    const cardGenerationTxs = {};
    let cardTotal = '0.0';

    // Create cards
    for (const cb of cardBills) {
      fill(Array(cb.quantity), null).forEach(() => {
        const notPesistedCard = this.generateCard(asset, cb.cardBillType);
        cardTotal = Utils.add(cardTotal, notPesistedCard.size);
        cardsToBePersisted[notPesistedCard.serial] = notPesistedCard;

        const txParams = new TxFromCardGenReq();
        txParams.cardGenReq = cgReq;
        txParams.generatedCard = notPesistedCard;
        const notPersistedCardGenTx =
          this.transactionsService.createTransaction(
            FactoryType.CARD_GENERATION,
            txParams,
          );
        notPersistedCardGenTx.status = TransactionStatus.PENDING;
        cardGenerationTxs[notPesistedCard.serial] = notPersistedCardGenTx;
      });
    }

    if (cgReq.cardsTotalAmount().toString() !== cardTotal)
      throw new HttpException('Card Total Error', HttpStatus.BAD_REQUEST);

    await this.cardsRepository.save(
      Object.keys(cardsToBePersisted).map((k) => cardsToBePersisted[k]),
    );

    await this.transactionsService.bulkSave(
      Object.keys(cardGenerationTxs).map((k) => cardGenerationTxs[k]),
    );

    // Set TXId to cards
    await this.cardsRepository.save(
      Object.keys(cardsToBePersisted).map((k) => {
        const card: Card = cardsToBePersisted[k];
        card.generationRequestId = 0;
        card.generationTxId = (cardGenerationTxs[k] as WalletTransaction).id;
        return card;
      }),
    );

    const transferReq = new TransferReq(
      cgReq.fromWallet,
      cgReq.toWallet,
      cgReq.enrichedAsset,
      cgReq.cardsTotalAmount().toString(),
      false,
    );
    // Transfer Asset
    const { transaction } = await this.walletsService.transfer(transferReq);

    return new CardGenerationResult(
      Object.keys(cardsToBePersisted).map((k) => cardsToBePersisted[k]),
      Object.keys(cardGenerationTxs).map((k) => cardGenerationTxs[k]),
      transaction,
      true,
    );
  }

  async getBy(key: string, serial: string): Promise<Card> {
    return this.cardsRepository.findOne({
      where: { key, serial },
    });
  }

  decryptQrCode(code: string): QrCodeInfo {
    const secret = this.configService.get<string>(CONFIG.CARD_QRCODE_SECRET);
    try {
      const stringifiedMsg = Utils.decrypt(secret, code);
      const { key, serial } = JSON.parse(stringifiedMsg);
      return new QrCodeInfo(serial, key);
    } catch {
      return null;
    }
  }

  async upateStatus(card: Card, status: CardStatus): Promise<Boolean> {
    card.status = status;
    let cardUpdate: Card;
    try {
      cardUpdate = await this.cardsRepository.save(card);
    } catch {
      cardUpdate = null;
    }
    return cardUpdate ? cardUpdate.status === status : false;
  }

  async getValidCardBy(qrCode: string): Promise<Card> {
    const qrCodeInfo = this.decryptQrCode(qrCode);
    if (!qrCodeInfo) return null;

    const { key, serial } = qrCodeInfo;
    const card = await this.getBy(key, serial);
    if (!card) return null;

    return card;
  }

  generateCardSerial(
    zone: string = OperationalZone.CANADA.code.toLowerCase(),
  ): string {
    const token = generator().generate(
      this.configService.get<number>(CONFIG.CARD_SERIAL_LENGTH),
    );
    return `${zone}${token}`;
  }

  generateCardKey(
    serial: string,
    zone: string = OperationalZone.CANADA.code.toLowerCase(),
  ): string {
    const token = generator().generate(
      this.configService.get<number>(CONFIG.CARD_KEY_LENGTH),
    );
    return `${zone}${token}`;
  }
}
