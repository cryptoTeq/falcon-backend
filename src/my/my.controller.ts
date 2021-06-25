import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  MyUserDto,
  MyPreferencesDto,
  MyAssetDto,
  MyTransactionDto,
  MyWalletDto,
} from './myDto';
import { UsersService } from '../users/users.service';
import { User, Preferences } from '../users/user.entity';
import { WalletsService } from '../wallets/wallets.service';
import { AssetsService } from '../assets/assets.service';
import { WalletAsset } from '../wallets/entity/walletAsset.entity';
import { getAssetAvatar } from '../assets/assets.utils';
import { TransactionsService } from '../wallets/transactions.service';
import { WalletTransaction } from '../wallets/entity/walletTransaction.entity';
import { Asset } from '../assets/asset.entity';

@Controller('my')
export class MyController {
  constructor(
    private readonly userService: UsersService,
    private readonly assetsService: AssetsService,
    private readonly walletsService: WalletsService,
    private readonly transactionsService: TransactionsService,
    @InjectMapper('classMapper') private mapper: Mapper,
  ) {
    this.mapper.createMap(User, MyUserDto);
    this.mapper.createMap(Preferences, MyPreferencesDto);
    this.mapper.createMap(WalletAsset, MyAssetDto);
    this.mapper.createMap(WalletTransaction, MyTransactionDto);
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

  @Get('brief')
  @UseGuards(JwtAuthGuard)
  async myBrief(@Req() req: any): Promise<MyPreferencesDto> {
    const user = await this.userService.findById(req.user.id);
    const userDto = this.mapper.map(user, MyUserDto, User);
    const result = this.mapper.map(
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
    return { ...result, ...userDto };
  }

  async assetsFor(user: User): Promise<MyAssetDto[]> {
    const [myAssets] = await Promise.all([
      this.walletsService.assetsFor(user.defaultWalletId),
      // TODO: get market data from marketModule
    ]);
    return myAssets.map((m) => this.enrichMyAssetsToDto(m, user));
  }

  @Get('wallet')
  @UseGuards(JwtAuthGuard)
  async myAssets(@Req() req: any): Promise<MyWalletDto> {
    const user = await this.userService.findById(req.user.id);
    return {
      assets: await this.assetsFor(user),
      totalValue: '1000',
    } as MyWalletDto;
  }

  @Get('assets/:symbol')
  @UseGuards(JwtAuthGuard)
  async myAssetDetails(
    @Param('symbol') symbol: string,
    @Req() req: any,
  ): Promise<MyAssetDto> {
    const user = await this.userService.findById(req.user.id);
    const result = (await this.assetsFor(user)).find(
      (a) => a.symbol === symbol.toUpperCase(),
    );
    if (!result)
      throw new HttpException('Asset Not Found', HttpStatus.NOT_FOUND);
    // TODO: Encrich with asset details => property info or edu/news contents
    return result;
  }

  @Get('assets/:symbol/transactions')
  @UseGuards(JwtAuthGuard)
  async myAssetTransactions(
    @Param('symbol') symbol: string,
    @Req() req: any,
  ): Promise<MyTransactionDto[]> {
    if (!symbol)
      throw new HttpException('Symbol Not Found', HttpStatus.BAD_REQUEST);
    const user = await this.userService.findById(req.user.id);
    const asset = await this.assetsService.findBySymbol(symbol);
    if (!asset)
      throw new HttpException('Symbol Not Found', HttpStatus.NOT_FOUND);
    const transactions = await this.transactionsService.transactionsFor({
      walletId: user.defaultWalletId,
      assetId: asset.id,
    });
    return transactions.map((tx) => this.enrichMyTransaction(tx, asset));
  }

  enrichMyTransaction(
    walletTx: WalletTransaction,
    asset: Asset,
  ): MyTransactionDto {
    const result = this.mapper.map(
      walletTx,
      MyTransactionDto,
      WalletTransaction,
    );
    result.symbol = asset.symbol;
    return result;
  }

  enrichMyAssetsToDto(myAsset: WalletAsset, user: User): MyAssetDto {
    const result = this.mapper.map(myAsset, MyAssetDto, WalletAsset);
    result.value = 'size X assetValue';
    result.avatar = getAssetAvatar(result.symbol, user.getTheme());
    result.currencyCode = user.getCurrencyCode();
    result.currencySign = user.getCurrencySign();
    result.assetValue = '123456'; // TODO: get from MarketModule>MarketService
    return result;
  }
}
