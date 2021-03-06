import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';
import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    @InjectMapper('classMapper') private mapper: Mapper,
  ) {}

  @Get()
  findAll() {
    return { ok: true };
  }

  // @Post()
  // async create(@Body() userDto: CreateUserReqDto): Promise<CreateUserResDto> {
  //   const user = this.mapper.map(userDto, User, CreateUserReqDto);
  //   const saveUser = await this.userService.create(user);
  //   return this.mapper.map<User, CreateUserResDto>(
  //     saveUser,
  //     CreateUserResDto,
  //     User,
  //   );
  // }

  // @Put()
  // update(@Body() userDto: CreateUserReqDto): string {
  //   const user = this.mapper.map(userDto, User, CreateUserReqDto);
  //   return 'createUser';
  // }
}
