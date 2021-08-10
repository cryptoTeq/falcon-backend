import { MyController } from './my.controller';
import { UsersService } from '../users/users.service';
import { Mapper } from '@automapper/types';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { createMapper } from '@automapper/core';
import { classes } from '@automapper/classes';
import { UserBaseDto } from '../users/dto/userDto';
import { WalletsService } from '../wallets/wallets.service';
import { AssetsService } from '../assets/assets.service';
import { TransactionsService } from '../wallets/transactions.service';
import { MarketService } from '../market/market.service';

const getUser = (): User => {
  let getAvatarUrl = jest.fn();
  let getLocale = jest.fn();
  let getTheme = jest.fn();
  let getTimezone = jest.fn();
  let getCurrencyCode = jest.fn();
  let getCurrencySign = jest.fn();

  const user: User = {
    firstName: 'FIRSTNAME',
    lastName: 'LASTNAME',
    avatarUrl: 'AVATARURL',
    createdAt: new Date(1623295236),
    id: 1,
    kyc: true,
    defaultWalletId: 1,
    preferences: {
      locale: 'LOCALE',
      theme: 'THEME',
      timezone: 'TIMEZONE',
      currencyCode: 'CODE',
      currencySign: 'SIGN',
    },
    status: 'STATUS',
    updatedAt: new Date(1623295236),
    getAvatarUrl,
    getLocale,
    getTheme,
    getTimezone,
    getCurrencyCode,
    getCurrencySign,
  };
  return user;
};

const getCreateUserResDto = ({
  firstName,
  kyc,
  lastName,
}: User): UserBaseDto => ({ firstName, kyc, lastName });

describe('My Controller', () => {
  let myController: MyController;
  let usersService: UsersService;
  let walletsService: WalletsService;
  let assetsService: AssetsService;
  let transactionsService: TransactionsService;
  let marketService: MarketService;

  let usersRepository: Repository<User>;
  let mapper: Mapper;

  beforeEach(() => {
    mapper = createMapper({ name: 'classMapper', pluginInitializer: classes });
    usersService = new UsersService(usersRepository);
    myController = new MyController(
      usersService,
      assetsService,
      walletsService,
      transactionsService,
      marketService,
      mapper,
    );
  });

  it('should return hello', async () => {
    const user = getUser();
    jest.spyOn(usersService, 'findById').mockImplementation(async () => user);
    const { firstName, kyc, lastName } = await myController.myUser({
      user: { id: user.id },
    });
    const {
      firstName: firstNameDto,
      kyc: ktcDto,
      lastName: lastNameDto,
    } = getCreateUserResDto(user);

    expect(firstName).toEqual(firstNameDto);
    expect(lastName).toEqual(lastNameDto);
    expect(kyc).toEqual(ktcDto);
  });
});
