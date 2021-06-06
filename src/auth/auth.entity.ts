import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { AutoMap } from '@automapper/classes';

@Entity()
export class Auth {
  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @Column({ length: 100 })
  username: string;

  @AutoMap()
  @Column()
  userId: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  password: string;

  @Column()
  @AutoMap()
  refreshToken: string;

  @Column({ default: '1m' })
  @AutoMap()
  refreshTokenExpires: string;

  @Column({ default: 'ACTIVE' })
  @AutoMap()
  status: string; //TODO: Enum => active, inactive, ...
}
