import {
  Controller,
  Req,
  Post,
  UseGuards,
  HttpException,
  HttpStatus,
  Body,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { MyUserDto } from 'src/my/myDto';
import { InjectMapper } from '@automapper/nestjs';
import { User } from 'src/users/user.entity';
import { Mapper } from '@automapper/types';
import { UsersService } from '../users/users.service';
import { CardsService } from './cards.service';
import { CardDepositReqDto } from './dto/card.dto';
import { WalletsService } from 'src/wallets/wallets.service';

@Controller('cards')
export class CardsController {
  constructor(
    private readonly userService: UsersService, //TODO: add s to userService everywhere
    private readonly cardsService: CardsService,
    private readonly walletsService: WalletsService,
    @InjectMapper('classMapper') private mapper: Mapper,
  ) {
    this.mapper.createMap(User, MyUserDto);
  }

  @Post('/deposit')
  @UseGuards(JwtAuthGuard)
  async deposit(
    @Req() req: any,
    @Body() { deviceId, location, qrMessage }: CardDepositReqDto,
  ): Promise<String> {
    const user = await this.userService.findById(req.user.id);

    // Validation
    const validCard = await this.cardsService.getValidCardBy(qrMessage);
    if (!validCard)
      throw new HttpException('Invalid Card', HttpStatus.BAD_REQUEST);

    // Purchase asset from market and keep in Service Wallet

    // Deposit into account
    // const { assetId, size } = validCard;
    // const walletTransaction = await this.walletsService.deposit(
    //   user.defaultWalletId,
    //   assetId,
    //   size,
    // );

    // Add Transaction

    // Notify User

    return user.firstName;
  }
}
