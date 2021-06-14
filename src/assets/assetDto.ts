import { AutoMap } from '@automapper/classes';

export class AssetDto {
  @AutoMap()
  name: string;

  @AutoMap()
  symbol: string;

  avatarUrl: string;
}
