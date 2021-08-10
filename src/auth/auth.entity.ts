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

  @AutoMap()
  @Column('json', { default: [] })
  deviceIds: string[]; //TODO: check if the sender's deviceID is in user's trusted devices

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    name: 'password_hash',
  })
  passwordHash: string;

  @Column({ name: 'refresh_token' })
  @AutoMap()
  refreshToken: string;

  @Column({ default: '1m', name: 'refresh_token_expires' })
  @AutoMap()
  refreshTokenExpires: string;
}
