import { Module } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TransactionsService } from './transactions.service';
import { WalletTransaction } from './entity/walletTransaction.entity';
import { Wallet } from './entity/wallet.entity';
import { WalletsController } from './wallets.controller';
import { WalletAsset } from './entity/walletAsset.entity';
import { TransactionFactory } from './transaction.factory';

@Module({
  imports: [
    TypeOrmModule.forFeature([Wallet, WalletTransaction, WalletAsset]),
    ConfigModule,
  ],
  providers: [WalletsService, TransactionsService, TransactionFactory],
  exports: [WalletsService, TransactionsService],
  controllers: [WalletsController],
})
export class WalletsModule {}
