import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet } from './entity/wallet.entity';
import { WalletAsset } from './entity/walletAsset.entity';

@Injectable()
export class WalletsService {
  constructor(
    @InjectRepository(Wallet)
    private walletsRepository: Repository<Wallet>,
    @InjectRepository(WalletAsset)
    private walletAssetsRepository: Repository<WalletAsset>,
  ) {}

  async assetsFor(walletId: string): Promise<WalletAsset[]> {
    return [];
  }
}
