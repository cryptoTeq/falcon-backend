import { Entity, Column } from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { BaseEntity } from '../database/baseEntity.entiry';

const ASSET_DEFAULT_VALUES = {
  avatarUrl: 'default image url',
};

const WALLET_DEFAULT_VALUES = {
  name: 'My Royal Wallet',
};

@Entity('assets')
export class Asset extends BaseEntity {
  constructor() {
    super();
    this.status = 'ACTIVE';
  }

  @AutoMap()
  @Column({ length: 100 })
  name: string;

  @AutoMap()
  @Column({ length: 100 })
  symbol: string;

  @Column({ nullable: true })
  @AutoMap()
  avatarUrl: string;

  @Column({ nullable: true })
  @AutoMap()
  order: number;

  @Column('json', { default: {} })
  @AutoMap()
  extras: any;

  getAvatarUrl(): string {
    return this.avatarUrl || ASSET_DEFAULT_VALUES.avatarUrl;
  }
}

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
  order: number;

  @Column('json', { default: {} })
  @AutoMap()
  extras: any;

  getName(): string {
    return this.name || WALLET_DEFAULT_VALUES.name;
  }
}

@Entity('wallet-assets')
export class MyAsset extends BaseEntity {
  constructor() {
    super();
    this.status = 'ACTIVE';
  }

  @AutoMap()
  @Column()
  assetId: number;

  @AutoMap()
  @Column()
  walletId: number;

  @AutoMap()
  @Column({ default: '0' })
  size: string;

  @AutoMap()
  @Column({ default: '0.0' })
  averageInValueUsd: string;

  @Column({ nullable: true })
  @AutoMap()
  order: number;
}

@Entity('wallet-transactions')
export class WalletTransaction extends BaseEntity {
  constructor() {
    super();
    this.status = 'PENDING';
  }

  @AutoMap()
  @Column()
  assetId: number;

  @AutoMap()
  @Column({ default: '0' })
  size: string;

  @AutoMap()
  @Column()
  fromAddress: string;

  @AutoMap()
  @Column()
  toAddress: string;

  @AutoMap()
  @Column({ default: '0.0' })
  averageInValueUsd: string;

  @Column('json', { default: {} })
  @AutoMap()
  extras: any;

  @Column('string')
  @AutoMap()
  type: TransactionType;

  @Column('string')
  @AutoMap()
  status: TransactionStatus;

  @Column()
  @AutoMap()
  datetimeUtcInt: number; //TODO: if I can covert to user's timezone from/to this
}

enum TransactionType {
  INTERNAL = 'INTERNAL',
  EXTERNAL = 'EXTERNAL',
}

enum TransactionStatus {
  PENDING = 'PENDING',
  FAILED = 'FAILED',
  COMPLETED = 'COMPLETED',
}
