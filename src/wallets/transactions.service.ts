import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WalletTransaction } from './entity/walletTransaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(WalletTransaction)
    private transactionsRepository: Repository<WalletTransaction>,
  ) {}
}
