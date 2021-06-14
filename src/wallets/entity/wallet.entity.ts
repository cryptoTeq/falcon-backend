import { Entity, Column } from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { BaseEntity } from '../../database/baseEntity';

const WALLET_DEFAULT_VALUES = {
  name: 'My Royal Wallet',
};

@Entity('wallets')
export class Wallet extends BaseEntity {
  constructor() {
    super();
    this.status = 'ACTIVE';
  }

  @AutoMap()
  @Column()
  ownerId: number;

  @AutoMap()
  @Column()
  address: string;

  @AutoMap()
  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  @AutoMap()
  sort_order: number;

  @Column('json', { default: {} })
  @AutoMap()
  extras: any;

  getName(): string {
    return this.name || WALLET_DEFAULT_VALUES.name;
  }
}
