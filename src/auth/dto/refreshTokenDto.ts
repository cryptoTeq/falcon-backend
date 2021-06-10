import { AutoMap } from '@automapper/classes';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class RefreshTokenDto {
  //   @MinLength()
  //   @MaxLength()
  @AutoMap()
  @IsString()
  refreshToken: string;
}
