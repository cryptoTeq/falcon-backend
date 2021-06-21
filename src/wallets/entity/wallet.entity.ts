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
  @Column({ name: 'owner_id' })
  ownerId: number;

  @AutoMap()
  @Column()
  address: string;

  @AutoMap()
  @Column({ nullable: true })
  name: string;

  @Column({ name: 'sort_order', nullable: true })
  @AutoMap()
  sortOrder: number;

  @Column('json', { default: {} })
  @AutoMap()
  extras: any;

  getName(): string {
    return this.name || WALLET_DEFAULT_VALUES.name;
  }
}
