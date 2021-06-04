import { AutoMap } from '@automapper/classes';
import { IsString } from 'class-validator';

export class UserBaseDto {
  @AutoMap()
  @IsString()
  firstName: string;

  @AutoMap()
  @IsString()
  lastName: string;
}

class CreateUserBaseDto extends UserBaseDto {}
export class CreateUserReqDto extends CreateUserBaseDto {}
export class CreateUserResDto extends CreateUserBaseDto {}
