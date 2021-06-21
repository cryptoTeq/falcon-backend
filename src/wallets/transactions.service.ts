import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WalletTransaction } from './entity/walletTransaction.entity';
import { TransactionFilters } from './interfaces';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(WalletTransaction)
    private transactionsRepository: Repository<WalletTransaction>,
  ) {}

  transactionsFor(filters: TransactionFilters): Promise<WalletTransaction[]> {
    console.log(`filters`, filters);

    const fromFilters = {
      ...filters,
      fromWalletId: filters.walletId,
    };

    const toFilters = {
      ...filters,
      toWalletId: filters.walletId,
    };
    delete fromFilters.walletId;
    delete toFilters.walletId;

    console.log(`toFilters`, toFilters);
    console.log(`fromFilters`, fromFilters);

    return this.transactionsRepository.find({
      where: [fromFilters, toFilters],
      order: { createdAt: 'DESC' },
    });
  }
}
