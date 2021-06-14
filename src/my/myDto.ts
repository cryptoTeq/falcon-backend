import { AutoMap } from '@automapper/classes';
import { IsString } from 'class-validator';
import { UserBaseDto } from '../users/dto/userDto';

export class MyUserDto extends UserBaseDto {}

export class MyPreferencesDto {
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
