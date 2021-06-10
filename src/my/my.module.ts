import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { MyController } from './my.controller';

@Module({
  imports: [UsersModule],
  controllers: [MyController],
})
export class MyModule {}
