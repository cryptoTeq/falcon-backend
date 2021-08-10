import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Card, QrCodeInfo, CardStatus } from './card.entity';
import { CONFIG } from '../config/configuration';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WalletTransaction } from '../wallets/entity/walletTransaction.entity';
import { Utils } from '../utils';
import { WalletsService } from '../wallets/wallets.service';

@Injectable()
export class CardsService {
  constructor(
    private readonly configService: ConfigService,
    private readonly walletsService: WalletsService,
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

  async generateCards(): Promise<void> {
    // use fiat asset available in the wallet of the CIBC user to generate cards
    // generate transactions and store them all
    //REMOVE CARDS SEED DATA, since all asssets should have an origin
  }

  async getBy(
    key: string,
    serial: string,
    status = CardStatus.ACTIVE,
  ): Promise<Card> {
    return this.cardsRepository.findOne({
      where: { key, serial, status },
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
    //TODO:  FOR TEST ONLY
    console.log(this.generateQrCode('CA1122334455', 'xg8250nbg4klq5b3'));
    console.log(this.generateQrCode('CA9988776655', 'xg1450nbz4klq7z9'));

    const qrCodeInfo = this.decryptQrCode(qrCode);
    if (!qrCodeInfo) return null;

    const { key, serial } = qrCodeInfo;
    const card = await this.getBy(key, serial);
    if (!card) return null;

    return card;
  }
}
