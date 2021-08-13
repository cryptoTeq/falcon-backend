import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  TransactionStatus,
  WalletTransaction,
} from './entity/walletTransaction.entity';
import { TransactionFilters } from './interfaces';
import { FactoryType, TransactionFactory } from './transaction.factory';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(WalletTransaction)
    private transactionsRepository: Repository<WalletTransaction>,
  ) {}

  async transactionsFor(
    filters: TransactionFilters,
  ): Promise<WalletTransaction[]> {
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

  async bulkSave(
    transactions: WalletTransaction[],
  ): Promise<WalletTransaction[]> {
    return this.transactionsRepository.save(transactions);
  }

  async addTx(tx: WalletTransaction): Promise<WalletTransaction> {
    //TODO: refactor all functions to accept object not bare params
    return this.transactionsRepository.save(tx);
  }

  async getBy(txId: number): Promise<WalletTransaction> {
    return this.transactionsRepository.findOne(txId);
  }

  async updateStatus(
    txId: number,
    newStatus: TransactionStatus,
  ): Promise<WalletTransaction> {
    const wtx = await this.getBy(txId);
    if (!wtx) return null;
    wtx.status = newStatus;
    return this.transactionsRepository.save(wtx);
  }

  createTransaction(type: FactoryType, params: object): WalletTransaction {
    return TransactionFactory.createTransaction(type, params);
  }
}
