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
import {
  CardBill,
  CardDepositReqDto,
  CardGenerationReq,
  CardGenReqItem,
} from './dto/card.dto';
import { WalletsService } from '../wallets/wallets.service';
import { MarketService } from '../market/market.service';
import { AssetsService } from '../assets/assets.service';
import { MarketTransactionStatus } from '../market/dto'; //TODO: refactor all to src/PATH
import { CardStatus } from './card.entity';
import { SYSTEM_WALLETS } from '../wallets/entity/wallet.entity';
import { TransferReq } from '../wallets/dto';
import { TransactionsService } from '../wallets/transactions.service';
import { TransactionStatus } from 'src/wallets/entity/walletTransaction.entity';

@Controller('cards')
export class CardsController {
  constructor(
    private readonly userService: UsersService, //TODO: add s to userService everywhere
    private readonly cardsService: CardsService,
    private readonly walletsService: WalletsService,
    private readonly marketService: MarketService,
    private readonly assetsService: AssetsService,
    private readonly transactionsService: TransactionsService,
    @InjectMapper('classMapper') private mapper: Mapper,
  ) {
    this.mapper.createMap(User, MyUserDto);
  }

  @Post('/generate')
  @UseGuards(JwtAuthGuard)
  async generate(@Req() req: any): Promise<String> {
    const user = await this.userService.findById(req.user.id);

    const cardGenItem1 = new CardGenReqItem(CardBill.CAD_5, 2);
    const cardGenItem2 = new CardGenReqItem(CardBill.CAD_10, 3);
    const cardGenItem3 = new CardGenReqItem(CardBill.CAD_50, 6);
    const cardGenItem4 = new CardGenReqItem(CardBill.CAD_100, 3);

    const cardGenItems = [
      cardGenItem2,
      cardGenItem1,
      cardGenItem3,
      cardGenItem4,
    ]; // TODO: check if there's enough fund

    const symbol = 'CAD'; //TODO: get from req.body
    const asset = await this.assetsService.findBySymbol(symbol); // CAD
    const enrichedAsset = await this.assetsService.enrichWithMarketData(asset);

    const fromWallet = await this.walletsService.getById(
      SYSTEM_WALLETS.CIBC_CREDIT_CARD_WALLET.id,
    );
    const toWallet = await this.walletsService.getById(
      SYSTEM_WALLETS.ASSET_HOLDER_WALLET.id,
    );

    const cardGenReq = new CardGenerationReq(
      cardGenItems,
      50,
      enrichedAsset,
      fromWallet,
      toWallet,
    );
    const cardGenResult = await this.cardsService.generateCards(cardGenReq);
    // console.log(`cardGenResult`, cardGenResult);

    return cardGenResult.success
      ? `Done - ${cardGenResult.cards.length} cards generated`
      : 'Error';
  }

  @Post('/deposit')
  @UseGuards(JwtAuthGuard)
  async deposit(
    @Req() req: any,
    @Body() { deviceId, location, qrCode }: CardDepositReqDto, //TODO:  Device ID, Location, ...
  ): Promise<String> {
    const user = await this.userService.findById(req.user.id);

    // TODO: create a guard if request is from one of the user's trusted devices

    // Validation
    const validCard = await this.cardsService.getValidCardBy(qrCode);
    if (!validCard || validCard.status !== CardStatus.ACTIVE) {
      const msg =
        validCard && validCard.status === CardStatus.DEPOSIT
          ? 'Card Depositted'
          : 'Invalid Card';
      throw new HttpException(msg, HttpStatus.BAD_REQUEST);
    }

    const cardPending = await this.cardsService.upateStatus(
      validCard,
      CardStatus.PENDING,
    );
    const { symbol, size, assetType, assetId } = validCard;

    // Transfer card's value from
    if (!cardPending)
      throw new HttpException('Invalid Card', HttpStatus.BAD_REQUEST);

    const cardDepositted = await this.cardsService.upateStatus(
      validCard,
      CardStatus.DEPOSIT,
    );

    if (!cardDepositted)
      throw new HttpException(
        'Something went wrong',
        HttpStatus.EXPECTATION_FAILED,
      );

    const fromWallet = await this.walletsService.getAssetHolderWallet();
    const toWallet = await this.walletsService.getById(user.defaultWalletId);
    const asset = await this.assetsService.findById(assetId);
    const enrichedAsset = await this.assetsService.enrichWithMarketData(asset);

    // Transfer Asset
    const transferReq = new TransferReq(
      fromWallet,
      toWallet,
      enrichedAsset,
      size,
    );
    const { transaction } = await this.walletsService.transfer(transferReq);

    // Update Card Generation Tx to Active
    const updatedCardGenTx = await this.transactionsService.updateStatus(
      validCard.generationTxId,
      TransactionStatus.COMPLETED,
    );
    if (!updatedCardGenTx)
      throw new HttpException(
        'Error Updating CardGenTx',
        HttpStatus.BAD_REQUEST,
      );

    // Notify User. send deposit receipt

    return transaction.id.toString();
  }
}
