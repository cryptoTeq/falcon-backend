import { Module } from '@nestjs/common';
import { MarketService } from './market.service';
import { ConvertService } from './convert.service';

@Module({
  providers: [MarketService, ConvertService],
  exports: [MarketService],
})
export class MarketModule {}
