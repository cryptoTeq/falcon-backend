import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { jwtConstants } from '../constants';
import { UsersService } from '../..//users/users.service';

import { JWTPayloadDto } from '../dto/jwtPayloadDto';
import { AuthService } from '../auth.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate({ username }: JWTPayloadDto) {
    const authUser = await this.authService.findByUsername(username);
    if (!authUser) throw new HttpException('', HttpStatus.NOT_FOUND);
    const user = await this.usersService.findById(authUser.id);
    if (!user) throw new HttpException('', HttpStatus.NOT_FOUND);
    return user;
  }
}
