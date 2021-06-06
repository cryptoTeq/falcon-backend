import { InjectMapper, MapPipe } from '@automapper/nestjs';
import { ConfigService } from '@nestjs/config';
import { Mapper } from '@automapper/types';

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { CreateUserResDto, CreateUserReqDto } from './dto/createUserDto';
import { User } from './user.entity';
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
  }

  @Get()
  findAll() {
    return { ok: true };
  }

  @Get(':username')
  // @UseGuards(JwtAuthGuard)
  async findOne(
    @Param('username') username: string,
  ): Promise<CreateUserResDto> {
    console.log(`username`, username);
    console.log(`config`, this.configService.get<string>('sampleConfig'));
    const user = await this.userService.findOne('2');
    console.log(`user`, user);
    console.log(`avatar`, user.getAvatarUrl());
    console.log(`local`, user.getLocale());
    console.log(`timezone`, user.getTimezone());
    return this.mapper.map(user, CreateUserResDto, User);
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
    console.log(`user`, user, user instanceof User);
    return 'createUser';
  }
}
