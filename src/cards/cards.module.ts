import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsService } from '../wallets/transactions.service';
import { AssetsModule } from '../assets/assets.module';
import { MarketModule } from '../market/market.module';
import { UsersModule } from '../users/users.module';
import { WalletsModule } from '../wallets/wallets.module';
import { Card } from './card.entity';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';

@Module({
  imports: [
    UsersModule,
    ConfigModule,
    AssetsModule,
    WalletsModule,
    MarketModule,
    TypeOrmModule.forFeature([Card]),
  ],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}
