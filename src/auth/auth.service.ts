import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Auth } from './auth.entity';
import { JWTPayloadDto } from './jwtPayloadDto';
import { Mapper } from '@automapper/types';
import { UsersService } from '../users/users.service';
import { User, Preferences } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    @InjectMapper('classMapper') private mapper: Mapper,
  ) {
    this.mapper.createMap(Auth, JWTPayloadDto);
    this.mapper.createMap(Preferences, JWTPayloadDto);
    this.mapper.createMap(User, JWTPayloadDto);
  }

  async findByUsername(username: string): Promise<Auth> {
    const authUser = await this.authRepository.findOne({ username });
    if (!authUser) throw new HttpException('', HttpStatus.NOT_FOUND);
    return authUser;
  }

  async validateUser(username: string, pass: string): Promise<JWTPayloadDto> {
    const authData = await this.findByUsername(username);
    if (authData && authData.password === pass) {
      const user = await this.usersService.findById(authData.userId);
      const { username } = this.mapper.map(authData, JWTPayloadDto, Auth);
      const { firstName } = this.mapper.map(user, JWTPayloadDto, User);
      const { locale } = this.mapper.map(
        user.preferences,
        JWTPayloadDto,
        Preferences,
      );
      return {
        username,
        firstName,
        locale,
      } as JWTPayloadDto;
    }
  }

  async login(jwtPayload: JWTPayloadDto) {
    return {
      access_token: this.jwtService.sign(jwtPayload),
      refresh_token: this.jwtService.sign(jwtPayload), //TODO: refresh token
    };
  }
}
