import { InjectMapper } from '@automapper/nestjs';
import { ConfigService } from '@nestjs/config';
import { Mapper } from '@automapper/types';

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import {
  CreateUserResDto,
  CreateUserReqDto,
  UserPreferencesResDto,
} from './dto/createUserDto';
import { Preferences, User } from './user.entity';
import { UsersService } from './users.service';

@Controller('my')
export class MyController {
  constructor(
    private readonly userService: UsersService,
    @InjectMapper('classMapper') private mapper: Mapper,
  ) {
    this.mapper.createMap(User, CreateUserReqDto);
    this.mapper.createMap(CreateUserReqDto, User);
    this.mapper.createMap(User, CreateUserResDto);
    this.mapper.createMap(Preferences, UserPreferencesResDto);
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  async getMe(
    @Param('username') username: string,
    @Req() req: any,
  ): Promise<CreateUserResDto> {
    const user = await this.userService.findById(req.user.id);
    return this.mapper.map(user, CreateUserResDto, User);
  }

  @Get('preferences')
  @UseGuards(JwtAuthGuard)
  async getPreferences(@Req() req: any): Promise<UserPreferencesResDto> {
    const user = await this.userService.findById(req.user.id);
    return this.mapper.map(
      {
        locale: user.getLocale(),
        theme: user.getTheme(),
        timezone: user.getTimezone(),
      } as Preferences,
      UserPreferencesResDto,
      Preferences,
    );
  }
}
