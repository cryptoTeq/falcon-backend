import { InjectMapper } from '@automapper/nestjs';
import { ConfigService } from '@nestjs/config';
import { Mapper } from '@automapper/types';

import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import {
  CreateUserResDto,
  CreateUserReqDto,
  UserPreferencesResDto,
} from './dto/createUserDto';
import { Preferences, User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private configService: ConfigService,
    private readonly userService: UsersService,
    @InjectMapper('classMapper') private mapper: Mapper,
  ) {
    this.mapper.createMap(User, CreateUserReqDto);
    this.mapper.createMap(CreateUserReqDto, User);
    this.mapper.createMap(User, CreateUserResDto);
    this.mapper.createMap(Preferences, UserPreferencesResDto);
  }

  @Get()
  findAll() {
    console.log(`config`, this.configService.get<string>('sampleConfig'));
    return { ok: true };
  }

  @Post()
  async create(@Body() userDto: CreateUserReqDto): Promise<CreateUserResDto> {
    const user = this.mapper.map(userDto, User, CreateUserReqDto);
    const saveUser = await this.userService.create(user);
    return this.mapper.map<User, CreateUserResDto>(
      saveUser,
      CreateUserResDto,
      User,
    );
  }

  @Put()
  update(@Body() userDto: CreateUserReqDto): string {
    const user = this.mapper.map(userDto, User, CreateUserReqDto);
    return 'createUser';
  }
}
