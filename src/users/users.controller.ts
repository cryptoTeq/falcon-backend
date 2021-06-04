import { InjectMapper, MapPipe } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';

import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserResDto, CreateUserReqDto } from './dto/createUserDto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    @InjectMapper('classMapper') private mapper: Mapper,
  ) {
    this.mapper.createMap(User, CreateUserReqDto);
    this.mapper.createMap(CreateUserReqDto, User);
    this.mapper.createMap(User, CreateUserResDto);
  }

  @Get()
  findAll(): string {
    return 'hello';
  }

  @Get(':username')
  async findOne(
    @Param('username') username: string,
  ): Promise<CreateUserResDto> {
    const user = await this.userService.findOne('7');
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
