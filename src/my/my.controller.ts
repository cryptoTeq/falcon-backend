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
import { MarketService } from '../market/market.service';

@Controller('my')
export class MyController {
  constructor(
    private readonly userService: UsersService,
    private readonly assetsService: AssetsService,
    private readonly walletsService: WalletsService,
    private readonly transactionsService: TransactionsService,
    private readonly marketService: MarketService,
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

  async enrichedAssetsFor(user: User): Promise<MyAssetDto[]> {
    const myAssets = await this.walletsService.assetsFor(user.defaultWalletId);
    const enrichedAssetsDto = await Promise.all(
      myAssets.map((a) => this.enrichMyAssetsToDto(a, user)),
    ).catch((e) => []); //TODO: Will Catch work?
    return enrichedAssetsDto;
  }

  @Get('wallet')
  @UseGuards(JwtAuthGuard)
  async myAssets(@Req() req: any): Promise<MyWalletDto> {
    const user = await this.userService.findById(req.user.id);
    const enrichedAssets = await this.enrichedAssetsFor(user);
    return {
      assets: enrichedAssets,
      totalValue: this.walletTotalValue(enrichedAssets).toString(),
      currencyCode: user.getCurrencyCode(),
      currencySign: user.getCurrencySign(),
    } as MyWalletDto;
  }

  @Get('assets/:symbol')
  @UseGuards(JwtAuthGuard)
  async myAssetDetails(
    @Param('symbol') symbol: string,
    @Req() req: any,
  ): Promise<MyAssetDto> {
    const user = await this.userService.findById(req.user.id);
    const result = (await this.enrichedAssetsFor(user)).find(
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
    return transactions.map((tx) => this.enrichMyTransaction(tx, asset, user));
  }

  enrichMyTransaction(
    //TODO: Implement Enrich transaction
    walletTx: WalletTransaction,
    asset: Asset,
    user: User,
  ): MyTransactionDto {
    const result = this.mapper.map(
      walletTx,
      MyTransactionDto,
      WalletTransaction,
    );
    result.symbol = asset.symbol;
    result.from = 'FROM';
    result.to = 'TO';
    // result.incoming
    return result;
  }

  async enrichMyAssetsToDto(
    myAsset: WalletAsset,
    user: User,
  ): Promise<MyAssetDto> {
    const result = this.mapper.map(myAsset, MyAssetDto, WalletAsset);
    const { price: marketPrice } = await this.marketService.marketDataFor(
      myAsset.symbol,
    );
    result.value = (Number(marketPrice) * Number(result.size)).toString();
    result.avatar = getAssetAvatar(result.symbol, user.getTheme());
    result.currencyCode = user.getCurrencyCode();
    result.currencySign = user.getCurrencySign();
    result.assetValue = marketPrice; //TODO: Rename all value to price
    return result;
  }

  walletTotalValue(myAssets: MyAssetDto[]) {
    return myAssets.reduce(
      (totalValue, { assetValue }) => totalValue + Number(assetValue),
      0,
    );
  }
}
