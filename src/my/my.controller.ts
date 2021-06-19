import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { MyUserDto, MyPreferencesDto, MyAssetDto } from './myDto';
import { UsersService } from '../users/users.service';
import { User, Preferences } from '../users/user.entity';
import { WalletsService } from '../wallets/wallets.service';
import { AssetsService } from '../assets/assets.service';

@Controller('my')
export class MyController {
  constructor(
    private readonly userService: UsersService,
    private readonly assetsService: AssetsService,
    private readonly walletsService: WalletsService,
    @InjectMapper('classMapper') private mapper: Mapper,
  ) {
    this.mapper.createMap(User, MyUserDto);
    this.mapper.createMap(Preferences, MyPreferencesDto);
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  async myUser(@Req() req: any): Promise<MyUserDto> {
    const user = await this.userService.findById(req.user.id);
    return this.mapper.map(user, MyUserDto, User);
  }

  @Get('preferences')
  @UseGuards(JwtAuthGuard)
  async myPreferences(@Req() req: any): Promise<MyPreferencesDto> {
    const user = await this.userService.findById(req.user.id);
    return this.mapper.map(
      {
        locale: user.getLocale(),
        theme: user.getTheme(),
        timezone: user.getTimezone(),
        currencyCode: user.getCurrencyCode(),
        currencySign: user.getCurrencySign(),
      } as Preferences,
      MyPreferencesDto,
      Preferences,
    );
  }

  @Get('assets')
  @UseGuards(JwtAuthGuard)
  async myAssets(@Req() req: any): Promise<MyAssetDto[]> {
    const user = await this.userService.findById(req.user.id);
    console.log(`user`, user);
    // const assets = await this.
    // const myAssets = await this.assetsService.
    return [];
  }

  @Get('assets/:symbol')
  @UseGuards(JwtAuthGuard)
  async myAssetDetails(
    @Param('symbol') symbol: string,
    @Req() req: any,
  ): Promise<MyAssetDto[]> {
    console.log(`symbol`, symbol);
    return [];
  }

  @Get('assets/:symbol/transactions')
  @UseGuards(JwtAuthGuard)
  async myAssetTransactions(
    @Param('symbol') symbol: string,
    @Req() req: any,
  ): Promise<MyAssetDto[]> {
    console.log(`symbol transactions for `, symbol);
    return [];
  }
}
