import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { Mapper } from '@automapper/types';
import { InjectMapper } from '@automapper/nestjs';
import { AssetsService } from './assets.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Asset } from './asset.entity';
import { AssetDto } from './assetDto';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { getAssetAvatar } from './assets.utils';

@Controller('assets')
export class AssetsController {
  constructor(
    private readonly assetsService: AssetsService,
    private readonly usersService: UsersService,
    @InjectMapper('classMapper') private mapper: Mapper,
  ) {
    this.mapper.createMap(Asset, AssetDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async myUser(@Req() req: any): Promise<AssetDto[]> {
    const dbAssets = await this.assetsService.findActives();
    const user = await this.usersService.findById(req.user.id);
    return dbAssets.map((a) => this.enrichMapToDto(a, user));
  }

  enrichMapToDto(asset: Asset, user: User): AssetDto {
    const result = this.mapper.map(asset, AssetDto, Asset);
    result.avatarUrl = getAssetAvatar(asset.symbol, user.getTheme());
    return result;
  }
}
