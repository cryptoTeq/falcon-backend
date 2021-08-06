import { AutoMap } from '@automapper/classes';
import { IsString } from 'class-validator';

export class CardDepositReqDto {
  @AutoMap()
  @IsString()
  qrMessage: string;

  @AutoMap()
  @IsString()
  deviceId: string;

  @AutoMap()
  @IsString() //long,lat
  location: string;
}
