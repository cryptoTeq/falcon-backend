import { AutoMap } from '@automapper/classes';
import { IsBoolean, IsString } from 'class-validator';
import { UserBaseDto } from '../users/dto/userDto';

export class MyUserDto extends UserBaseDto {}

export class MyPreferencesDto {
  @AutoMap()
  firstName: string;

  @AutoMap()
  locale: string;

  @AutoMap()
  theme: string;

  @AutoMap()
  @IsString()
  timezone: string;

  @AutoMap()
  @IsString()
  currencyCode: string;

  @AutoMap()
  @IsString()
  currencySign: string;
}

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

export class MyWalletDto {
  @AutoMap()
  assets: MyAssetDto[];

  @AutoMap()
  @IsString()
  totalValue: string;
}

export class MyTransactionDto {
  @AutoMap()
  @IsString()
  status: string;

  @AutoMap()
  @IsString()
  symbol: string;

  @AutoMap()
  @IsString()
  size: string;

  @AutoMap()
  @IsString()
  valueUsd: string;

  @AutoMap()
  @IsString()
  txFeeUsd: string;

  @AutoMap()
  @IsString()
  txFee: string;

  @AutoMap()
  @IsString()
  privateNote: string;

  @AutoMap()
  @IsString()
  hash: string;

  @AutoMap()
  @IsString()
  confirmedAt: Date;

  @AutoMap()
  @IsBoolean()
  internal: boolean;

  @IsString()
  from: string;

  @IsString()
  to: string;
}
