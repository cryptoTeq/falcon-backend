import { AutoMap } from '@automapper/classes';

export class AssetDto {
  @AutoMap()
  name: string;

  @AutoMap()
  symbol: string;

  @AutoMap()
  type: string;

  avatarUrl: string;
}
