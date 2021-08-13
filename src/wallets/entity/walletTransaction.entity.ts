import { Entity, Column } from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { BaseEntity } from '../../database/baseEntity';

export enum TransactionStatus {
  PENDING = 'PENDING',
  FAILED = 'FAILED',
  COMPLETED = 'COMPLETED',
}

export enum TransactionType {
  FROM_BANK_ACC = 'FROM_BANK_ACC',
  CARD_GENERATION = 'CARD_GENERATION',

  // FROM_ASSET_CARD = 'FROM_ASSET_CARD',
  // FROM_CLIENT = 'FROM_CLIENT',
  // TO_ASSET_CARD = 'TO_ASSET_CARD', // card generation
  // TO_BANK_ACC = 'TO_BANK_ACC',
  // TO_CLIENT = 'TO_CLIENT',
  CONVERT_ASSET = 'CONVERT_ASSET',
}

@Entity('wallet_transactions')
export class WalletTransaction extends BaseEntity {
  constructor() {
    super();
    this.status = TransactionStatus.PENDING;
  }

  @AutoMap()
  @Column({ name: 'from_asset_id' })
  fromAssetId: number;

  @AutoMap()
  @Column({ name: 'to_asset_id' })
  toAssetId: number;

  @AutoMap()
  @Column()
  fromSymbol: string;

  @AutoMap()
  @Column()
  toSymbol: string;

  @AutoMap()
  @Column()
  size: string;

  @AutoMap()
  @Column({
    name: 'total_value_usd',
    default: '0.0',
  })
  totalValueUsd: string; // total value of transaction

  @AutoMap()
  @Column({
    name: 'from_asset_value_usd',
    default: '0.0',
  })
  fromAssetValueUsd: string; // each 1 asset price

  @AutoMap()
  @Column({
    name: 'to_asset_value_usd',
    default: '0.0',
  })
  toAssetValueUsd: string; // each 1 asset price

  @AutoMap()
  @Column({ name: 'tx_fee_usd', default: '0.0' })
  txFeeUsd: string;

  @AutoMap()
  @Column({ name: 'tx_fee', default: '0.00' })
  txFee: string;

  @AutoMap()
  @Column({ name: 'from_wallet_id' })
  fromWalletId: number;

  @AutoMap()
  @Column() // for users only
  from: string;

  @AutoMap()
  @Column() // for users only
  to: string;

  @AutoMap()
  @Column({ name: 'to_wallet_id' })
  toWalletId: number;

  @Column('json', { default: {} })
  @AutoMap()
  extras: any;

  @AutoMap()
  @Column({ nullable: true, name: 'system_note' })
  systemNote: string;

  @AutoMap()
  @Column({ nullable: true, name: 'sender_private_note' })
  senderPrivateNote: string;

  @AutoMap()
  @Column({ nullable: true, name: 'sender_to_receiver_note' })
  senderToReceiverNote: string;

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
    type: 'enum',
    enum: TransactionType,
  })
  @AutoMap()
  type: TransactionType;

  @Column({
    // TODO: validate utc datetime
    type: 'timestamp with time zone',
    nullable: true,
    name: 'confirmed_at',
  })
  @AutoMap()
  confirmedAt: Date;

  @AutoMap()
  @Column({ nullable: true })
  prevTxId: number;
}
