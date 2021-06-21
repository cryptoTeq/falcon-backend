import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { BaseEntity } from '../database/baseEntity';

@Entity()
export class Auth extends BaseEntity {
  @AutoMap()
  @Column({ length: 100 })
  username: string;

  @AutoMap()
  @Column({ name: 'user_id' })
  userId: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  password: string;

  @Column({ name: 'refresh_token' })
  @AutoMap()
  refreshToken: string;

  @Column({ default: '1m', name: 'refresh_token_expires' })
  @AutoMap()
  refreshTokenExpires: string;
}
