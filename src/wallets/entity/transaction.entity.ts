import { Entity, Column } from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { BaseEntity } from '../../database/baseEntity';

enum TransactionType {
  UNKNOWN = 'UNKNOWN',
  INTERNAL = 'INTERNAL',
  EXTERNAL = 'EXTERNAL',
}

enum TransactionStatus {
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
  @Column()
  fromWalletAddress: string;

  @AutoMap()
  @Column()
  toWalletAddress: string;

  @AutoMap()
  @Column({ default: '0.0' })
  valueUsd: string;

  @Column('json', { default: {} })
  @AutoMap()
  extras: any;

  @Column({
    type: 'enum',
    enum: TransactionType,
    default: TransactionType.UNKNOWN,
  })
  @AutoMap()
  type: TransactionType;

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
