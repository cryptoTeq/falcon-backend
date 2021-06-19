import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  TransactionStatus,
  WalletTransaction,
} from './entity/walletTransaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(WalletTransaction)
    private transactionsRepository: Repository<WalletTransaction>,
  ) {}

  async transactionsFor(
    walletAddress: string,
    symbol?: string,
    status?: TransactionStatus,
  ): Promise<WalletTransaction[]> {
    console.log(`status`, status);
    console.log(`walletAddress`, walletAddress);
    return this.transactionsRepository.find({
      where: [
        { fromWalletAddress: walletAddress, status, symbol },
        { toWalletAddress: walletAddress, status, symbol },
      ],
      order: { createdAt: 'DESC' },
    });
  }
}
