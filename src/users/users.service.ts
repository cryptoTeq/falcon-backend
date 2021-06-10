import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, Preferences } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findById(id: number): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  create(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  async getUserPreferences(id: number): Promise<Preferences> {
    const user = await this.findById(id);
    return user.preferences;
  }
}
