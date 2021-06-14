import { Entity, Column } from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { BaseEntity } from '../../database/baseEntity';

@Entity('wallet_assets')
export class MyAsset extends BaseEntity {
  constructor() {
    super();
    this.status = 'ACTIVE';
  }

  @AutoMap()
  @Column()
  walletId: number;

  @AutoMap()
  @Column()
  assetId: number;

  @AutoMap()
  @Column({ default: '0' })
  size: string;

  @AutoMap()
  @Column({ default: '0.0' })
  averageInValueUsd: string;

  @Column({ nullable: true })
  @AutoMap()
  sort_order: number;

  @Column('json', { default: {} })
  @AutoMap()
  extras: any;
}
