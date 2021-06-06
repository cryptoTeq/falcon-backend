import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AutoMap } from '@automapper/classes';

@Entity()
export class BaseEntity {
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @Column({ nullable: true })
  status: string;
}
