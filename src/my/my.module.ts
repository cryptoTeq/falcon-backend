import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { MyController } from './my.controller';
import { WalletsModule } from '../wallets/wallets.module';
import { AssetsModule } from '../assets/assets.module';

@Module({
  imports: [UsersModule, WalletsModule, AssetsModule],
  controllers: [MyController],
})
export class MyModule {}
