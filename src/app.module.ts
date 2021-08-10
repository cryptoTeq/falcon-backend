import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { UsersModule } from './users/users.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MyModule } from './my/my.module';
import { WalletsModule } from './wallets/wallets.module';
import { AssetsModule } from './assets/assets.module';
import { MarketModule } from './market/market.module';
import configuration from './config/configuration';
import { CardsModule } from './cards/cards.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    AutomapperModule.forRoot({
      options: [{ name: 'classMapper', pluginInitializer: classes }],
      // singular: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        //TODO: Check connection number in loops
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    UsersModule,
    AuthModule,
    CardsModule,
    MyModule,
    WalletsModule,
    AssetsModule,
    MarketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
