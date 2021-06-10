import { MyController } from './my.controller';
import { UsersService } from './users.service';
import { Mapper } from '@automapper/types';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { createMapper } from '@automapper/core';
import { classes } from '@automapper/classes';
import { CreateUserResDto } from './dto/createUserDto';

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
    created_at: new Date(1623295236),
    id: 1,
    kyc: true,
    preferences: {
      locale: 'LOCALE',
      theme: 'THEME',
      timezone: 'TIMEZONE',
      currencyCode: 'CODE',
      currencySign: 'SIGN',
    },
    status: 'STATUS',
    updated_at: new Date(1623295236),
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
}: User): CreateUserResDto => ({ firstName, kyc, lastName });

describe('My Controller', () => {
  let myController: MyController;
  let usersService: UsersService;
  let usersRepository: Repository<User>;
  let mapper: Mapper;

  beforeEach(() => {
    mapper = createMapper({ name: 'classMapper', pluginInitializer: classes });
    usersService = new UsersService(usersRepository);
    myController = new MyController(usersService, mapper);
  });

  it('should return hello', async () => {
    const user = getUser();
    jest.spyOn(usersService, 'findById').mockImplementation(async () => user);
    const { firstName, kyc, lastName } = await myController.getMe('username', {
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
