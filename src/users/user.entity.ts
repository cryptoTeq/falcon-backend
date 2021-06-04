import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { AutoMap } from '@automapper/classes';

@Entity()
export class User {
  static getName() {
    return 'ha ha ha';
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @AutoMap()
  firstName: string;

  @Column()
  @AutoMap()
  lastName: string;

  @Column({ default: false })
  @AutoMap()
  kyc: boolean;

  @Column({ default: true })
  @AutoMap()
  isActive: boolean;
}
