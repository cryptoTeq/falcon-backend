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
  @Column()
  assetId: number;

  @AutoMap()
  @Column({ default: '0' })
  size: string;

  @AutoMap()
  @Column({ default: '0.0' })
  valueUsd: string;

  @AutoMap()
  @Column({ default: 0.0 })
  txFeeUsd: number;

  @AutoMap()
  @Column({ default: '0.0000' })
  txFee: string;

  @AutoMap()
  @Column()
  fromWalletAddress: string;

  @AutoMap()
  @Column()
  toWalletAddress: string;

  @Column('json', { default: {} })
  @AutoMap()
  extras: any;

  @AutoMap()
  @Column({ default: '0.0' })
  privateNote: string;

  @Column()
  @AutoMap()
  internal: boolean;

  @Column()
  @AutoMap()
  incoming: boolean;

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

  @Column()
  @AutoMap()
  createdUtcInt: number; //TODO: if I can covert to user's timezone from/to this

  @Column()
  @AutoMap()
  confirmedUtcInt: number;
}
