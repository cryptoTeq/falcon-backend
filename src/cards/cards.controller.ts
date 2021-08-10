import {
  Controller,
  Req,
  Post,
  UseGuards,
  HttpException,
  HttpStatus,
  Body,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MyUserDto } from '../my/myDto';
import { InjectMapper } from '@automapper/nestjs';
import { User } from '../users/user.entity';
import { Mapper } from '@automapper/types';
import { UsersService } from '../users/users.service';
import { CardsService } from './cards.service';
import { CardDepositReqDto } from './dto/card.dto';
import { WalletsService } from '../wallets/wallets.service';
import { MarketService } from '../market/market.service';
import { AssetsService } from '../assets/assets.service';
import { MarketTransactionStatus } from '../market/dto'; //TODO: refactor all to src/PATH
import { CardStatus } from './card.entity';

@Controller('cards')
export class CardsController {
  constructor(
    private readonly userService: UsersService, //TODO: add s to userService everywhere
    private readonly cardsService: CardsService,
    private readonly walletsService: WalletsService,
    private readonly assetsService: AssetsService,
    private readonly marketService: MarketService,

    @InjectMapper('classMapper') private mapper: Mapper,
  ) {
    this.mapper.createMap(User, MyUserDto);
  }

  @Post('/deposit')
  @UseGuards(JwtAuthGuard)
  async deposit(
    @Req() req: any,
    @Body() { deviceId, location, qrCode }: CardDepositReqDto,
  ): Promise<String> {
    const user = await this.userService.findById(req.user.id);

    // TODO: create a guard if request is from one of the user's trusted devices

    // Validation
    const validCard = await this.cardsService.getValidCardBy(qrCode);
    if (!validCard)
      throw new HttpException('Invalid Card', HttpStatus.BAD_REQUEST);
    const cardPending = await this.cardsService.upateStatus(
      validCard,
      CardStatus.PENDING,
    );
    const { symbol, size, assetType, assetId } = validCard;

    // Transfer card's value from
    // if (!cardPending)
    //   throw new HttpException('Invalid Card', HttpStatus.BAD_REQUEST);
    // const marketTransaction = await this.marketService.buyAsset(
    //   assetType,
    //   symbol,
    //   size,
    // );

    // Update card's status to Deposit
    // if (marketTransaction.status !== MarketTransactionStatus.SUCCESS)
    //   throw new HttpException(
    //     'Market Order Failed',
    //     HttpStatus.EXPECTATION_FAILED,
    //   );
    // const cardDepositted = await this.cardsService.upateStatus(
    //   validCard,
    //   CardStatus.DEPOSIT,
    // );

    // if (!cardDepositted)
    //   throw new HttpException(
    //     'Something went wrong',
    //     HttpStatus.EXPECTATION_FAILED,
    //   );

    // Transfer Asset
    // const { txPriceUsd, txFeeUsd, txSize, txType, txAssetValueUsd } =
    //   marketTransaction;
    // const walletAsset = await this.walletsService.deposit(
    //   user.defaultWalletId,
    //   assetId,
    //   size,
    //   txPriceUsd,
    // );

    // console.log(
    //   `tx`,
    //   symbol,
    //   size,
    //   txPriceUsd,
    //   txFeeUsd,
    //   txSize,
    //   txType,
    //   txAssetValueUsd,
    // );

    // Notify User. send deposit receipt

    return user.firstName;
  }
}
