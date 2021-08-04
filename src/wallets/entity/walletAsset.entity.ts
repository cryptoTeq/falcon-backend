import { Entity, Column } from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { BaseEntity } from '../../database/baseEntity';

@Entity('wallet_assets')
export class WalletAsset extends BaseEntity {
  constructor() {
    super();
    this.status = 'ACTIVE';
  }

  @AutoMap()
  @Column({ name: 'wallet_id' })
  walletId: number;

  @AutoMap()
  @Column({ name: 'asset_id' })
  assetId: number;

  @AutoMap()
  @Column({ default: '0' })
  size: string;

  @AutoMap()
  @Column({ name: 'average_in_value_usd', default: '0.0' })
  averageInValueUsd: string;

  @Column({ nullable: true, name: 'sort_order' })
  @AutoMap()
  sortOrder: number;

  @Column('json', { default: {} })
  @AutoMap()
  extras: any;

  @AutoMap()
  symbol: string;

  @AutoMap()
  type: string;
}
