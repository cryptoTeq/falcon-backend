import { Entity, Column } from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { BaseEntity } from '../../database/baseEntity';

const WALLET_DEFAULT_VALUES = {
  name: 'My Royal Wallet',
};

export enum WalletType {
  SYSTEM = 'SYSTEM',
  USER = 'USER',
}

export const SYSTEM_WALLETS = {
  BANK_ACCOUNT_WALLET_ID: 1,
  ASSET_CONVERTER_WALLET_ID: 2,
  ASSET_HOLDER_WALLET_ID: 3,
};

@Entity('wallets')
export class Wallet extends BaseEntity {
  constructor() {
    super();
    this.status = 'ACTIVE';
  }

  @Column({
    type: 'enum',
    enum: WalletType,
    default: WalletType.USER,
  })
  type: WalletType;

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

  @AutoMap()
  @Column({ nullable: true, name: 'system_note' })
  systemNote: string;

  getName(): string {
    return this.name || WALLET_DEFAULT_VALUES.name;
  }
}
