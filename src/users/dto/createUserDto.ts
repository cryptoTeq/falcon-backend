import { AutoMap } from '@automapper/classes';
import { IsString, IsBoolean } from 'class-validator';

export class UserBaseDto {
  @AutoMap()
  @IsString()
  firstName: string;

  @AutoMap()
  @IsString()
  lastName: string;

  @AutoMap()
  @IsBoolean()
  kyc: boolean;
}

class CreateUserBaseDto extends UserBaseDto {}
export class CreateUserReqDto extends CreateUserBaseDto {}
export class CreateUserResDto extends CreateUserBaseDto {}
export class UserPreferencesResDto {
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
