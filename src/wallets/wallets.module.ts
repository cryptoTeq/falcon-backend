import { Module } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TransactionsService } from './transactions.service';
import { WalletTransaction } from './entity/walletTransaction.entity';
import { Wallet } from './entity/wallet.entity';
import { WalletsController } from './wallets.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Wallet, WalletTransaction]),
    ConfigModule,
  ],
  providers: [WalletsService, TransactionsService],
  controllers: [WalletsController],
})
export class WalletsModule {}
