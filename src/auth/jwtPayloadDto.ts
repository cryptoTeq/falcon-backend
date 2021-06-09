import { AutoMap } from '@automapper/classes';
import { IsString, IsBoolean } from 'class-validator';

export class JWTPayloadDto {
  @AutoMap()
  @IsString()
  firstName: string;

  @AutoMap()
  @IsString()
  username: string;

  @AutoMap()
  @IsString()
  locale: string;
}
