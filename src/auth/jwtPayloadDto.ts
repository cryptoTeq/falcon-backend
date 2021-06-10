import { AutoMap } from '@automapper/classes';
import { IsString } from 'class-validator';

export class JWTPayloadDto {
  @AutoMap()
  @IsString()
  username: string;

  @AutoMap()
  @IsString()
  locale: string;

  @AutoMap()
  @IsString()
  theme: string;
}
