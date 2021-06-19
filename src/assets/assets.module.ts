import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Asset } from './asset.entity';
import { AssetsController } from './assets.controller';
import { AssetsService } from './assets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Asset]), ConfigModule, UsersModule],
  providers: [AssetsService],
  exports: [AssetsService],
  controllers: [AssetsController],
})
export class AssetsModule {}
