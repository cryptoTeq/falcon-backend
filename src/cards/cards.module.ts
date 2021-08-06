import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarketModule } from 'src/market/market.module';
import { UsersModule } from 'src/users/users.module';
import { WalletsModule } from 'src/wallets/wallets.module';
import { Card } from './card.entity';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';

@Module({
  imports: [
    UsersModule,
    ConfigModule,
    WalletsModule,
    TypeOrmModule.forFeature([Card]),
  ],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}
