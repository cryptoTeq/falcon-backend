import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { MyUserDto, MyPreferencesDto } from './dto/myDto';
import { UsersService } from '../users/users.service';
import { User, Preferences } from '../users/user.entity';

@Controller('my')
export class MyController {
  constructor(
    private readonly userService: UsersService,
    @InjectMapper('classMapper') private mapper: Mapper,
  ) {
    this.mapper.createMap(User, MyUserDto);
    this.mapper.createMap(Preferences, MyPreferencesDto);
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  async myUser(@Req() req: any): Promise<MyUserDto> {
    const user = await this.userService.findById(req.user.id);
    return this.mapper.map(user, MyUserDto, User);
  }

  @Get('preferences')
  @UseGuards(JwtAuthGuard)
  async myPreferences(@Req() req: any): Promise<MyPreferencesDto> {
    const user = await this.userService.findById(req.user.id);
    return this.mapper.map(
      {
        locale: user.getLocale(),
        theme: user.getTheme(),
        timezone: user.getTimezone(),
        currencyCode: user.getCurrencyCode(),
        currencySign: user.getCurrencySign(),
      } as Preferences,
      MyPreferencesDto,
      Preferences,
    );
  }
}
