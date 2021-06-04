import { InjectMapper, MapPipe } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';
import { ValidationPipe } from '../pipes/validation.pipe';
import { Body, Controller, Get, Post, Put } from '@nestjs/common';
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

  @Post()
  async create(
    @Body(new ValidationPipe()) userDto: CreateUserReqDto,
  ): Promise<CreateUserResDto> {
    const user = this.mapper.map(userDto, User, CreateUserReqDto);
    const saveUser = await this.userService.create(user);
    return this.mapper.map<User, CreateUserResDto>(
      saveUser,
      CreateUserResDto,
      User,
    );
  }

  @Put()
  update(@Body(new ValidationPipe()) userDto: CreateUserReqDto): string {
    const user = this.mapper.map(userDto, User, CreateUserReqDto);
    console.log(`user`, user);
    return 'createUser';
  }
}
