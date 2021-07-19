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

  @IsString()
  avatar: string;

  @AutoMap()
  @IsString()
  size: string;

  @IsString()
  value: string;

  @IsString()
  assetValue: string;

  @IsString()
  currencyCode: string;

  @IsString()
  currencySign: string;
}

export class MyWalletDto {
  @AutoMap()
  assets: MyAssetDto[];

  @AutoMap()
  @IsString()
  totalValue: string;

  @AutoMap()
  @IsString()
  currencyCode: string;

  @AutoMap()
  @IsString()
  currencySign: string;
}

export class MyTransactionDto {
  @AutoMap()
  @IsString()
  status: string;

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
  senderNote: string;

  @AutoMap()
  @IsString()
  hash: string;

  @AutoMap()
  @IsString()
  confirmedAt: Date;

  @AutoMap()
  @IsBoolean()
  internal: boolean;

  @AutoMap()
  @IsBoolean()
  incoming: boolean;

  @IsString()
  from: string;

  @IsString()
  to: string;
}
