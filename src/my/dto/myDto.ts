import { AutoMap } from '@automapper/classes';
import { IsString } from 'class-validator';
import { UserBaseDto } from '../../users/dto/userDto';

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
