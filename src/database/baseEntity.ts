import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AutoMap } from '@automapper/classes';

export enum BASE_ENTITY_SATUSES {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

@Entity()
export class BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_at' })
  @AutoMap()
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @AutoMap()
  updatedAt: Date;

  @AutoMap()
  @Column({ nullable: true })
  status: string;
}
