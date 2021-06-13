import { AutoMap } from '@automapper/classes';
import { IsString } from 'class-validator';

export class MyAssetDto {
  @AutoMap()
  @IsString()
  symbol: string;

  @AutoMap()
  @IsString()
  name: string;

  @AutoMap()
  @IsString()
  avatar: string;

  @AutoMap()
  @IsString()
  size: string;

  @AutoMap()
  @IsString()
  value: string;

  @AutoMap()
  @IsString()
  assetValue: string;

  @AutoMap()
  @IsString()
  currencyCode: string;

  @AutoMap()
  @IsString()
  currencySign: string;
}
