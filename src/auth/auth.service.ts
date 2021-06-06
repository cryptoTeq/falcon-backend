import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Auth } from './auth.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
    private jwtService: JwtService,
  ) {}

  findOneByUsername(username: string): Promise<Auth> {
    return this.authRepository.findOne({ username });
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.findOneByUsername(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload),
    };
  }
}
