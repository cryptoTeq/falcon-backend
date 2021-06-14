import { Controller } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/types';

@Controller('wallets')
export class WalletsController {
  constructor(
    private readonly walletsService: WalletsService,
    @InjectMapper('classMapper') private mapper: Mapper,
  ) {
    // this.mapper.createMap(User, MyUserDto);
    // this.mapper.createMap(Preferences, MyPreferencesDto);
  }
}
