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
  CIBC_CREDIT_CARD_WALLET: {
    id: 1,
    name: 'CIBC Credit Account',
  },
  ASSET_CONVERTER_WALLET: {
    id: 2,
    name: 'Asset Converter',
  },
  ASSET_HOLDER_WALLET: {
    id: 3,
    name: 'Asset Holder',
  },
  SYSTEM_AGENT: {
    id: 4,
    name: 'System Agent',
  },
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

  getName = (): string => {
    return this.name || WALLET_DEFAULT_VALUES.name;
  };
}
