import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Card, QrCodeInfo, Status } from './card.entity';
import { CONFIG } from 'src/config/configuration';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WalletTransaction } from 'src/wallets/entity/walletTransaction.entity';
import { Utils } from '../utils';
import { WalletsService } from 'src/wallets/wallets.service';

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

  async getBy(
    key: string,
    serial: string,
    status = Status.ACTIVE,
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

  async getValidCardBy(code: string): Promise<Card> {
    //TODO:  FOR TEST ONLY
    // console.log(this.generateQrCode('CA1122334455', 'xg8250nbg4klq5b3'));
    const qrCodeInfo = this.decryptQrCode(code);
    if (!qrCodeInfo) return null;

    const { key, serial } = qrCodeInfo;
    const card = await this.getBy(key, serial);
    if (!card) return null;

    return card;
  }
}
