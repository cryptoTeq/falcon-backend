import { Entity, Column } from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { BaseEntity } from '../../database/baseEntity';

export enum TransactionStatus {
  PENDING = 'PENDING',
  FAILED = 'FAILED',
  COMPLETED = 'COMPLETED',
}

@Entity('wallet_transactions')
export class WalletTransaction extends BaseEntity {
  constructor() {
    super();
    this.status = TransactionStatus.PENDING;
  }

  @AutoMap()
  @Column({ name: 'asset_id' })
  assetId: number;

  @AutoMap()
  @Column({ default: '0' })
  size: string;

  @AutoMap()
  @Column({ name: 'value_usd' })
  valueUsd: string;

  @AutoMap()
  @Column({ name: 'tx_fee_usd', default: '0.0' })
  txFeeUsd: string;

  @AutoMap()
  @Column({ name: 'tx_fee', default: '0.0000' })
  txFee: string;

  @AutoMap()
  @Column({ name: 'from_wallet_id' })
  fromWalletId: number;

  @AutoMap()
  @Column({ name: 'to_wallet_id' })
  toWalletId: number;

  @Column('json', { default: {} })
  @AutoMap()
  extras: any;

  @AutoMap()
  @Column({ nullable: true, name: 'sender_note' })
  senderNote: string;

  @Column()
  @AutoMap()
  internal: boolean;

  @Column({ nullable: true })
  @AutoMap()
  hash: string;

  @Column({
    type: 'enum',
    enum: TransactionStatus,
    default: TransactionStatus.PENDING,
  })
  @AutoMap()
  status: TransactionStatus;

  @Column({
    type: 'timestamp with time zone',
    nullable: true,
    name: 'confirmed_at',
  })
  @AutoMap()
  confirmedAt: Date;
}
