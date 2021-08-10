import { Entity, Column } from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { BaseEntity } from '../database/baseEntity';
import { AssetTypes } from '../assets/asset.entity';

export const OperationalZone = {
  CANADA: {
    code: 'CA',
    name: 'CANADA',
  },
};

export enum CardStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  DEPOSIT = 'DEPOSIT',
  CANCEL = 'CANCEL',
}

export class QrCodeInfo {
  constructor(serial: string, key: string) {
    this.key = key;
    this.serial = serial;
  }
  serial: string;
  key: string;
}

@Entity('cards')
export class Card extends BaseEntity {
  @AutoMap()
  @Column({ length: 100 })
  serial: string;

  @AutoMap()
  @Column({ length: 100 })
  key: string;

  @AutoMap()
  @Column()
  symbol: string;

  @AutoMap()
  @Column()
  assetId: number;

  @Column({
    type: 'enum',
    enum: AssetTypes,
    default: AssetTypes.UNKNOWN,
  })
  @AutoMap()
  assetType: AssetTypes;

  @Column({
    type: 'enum',
    enum: CardStatus,
    default: CardStatus.PENDING,
  })
  @AutoMap()
  status: CardStatus;

  @AutoMap()
  @Column({ default: '0' })
  size: string;

  @AutoMap()
  @Column()
  generationRequestId: number; // TODO: Persist Generate Requests in Database

  @AutoMap()
  @Column()
  qrCode: string;

  @AutoMap()
  @Column()
  generationTxId: number;

  @Column('json', { default: {} })
  @AutoMap()
  extras: any;

  @Column({
    // TODO: validate it
    type: 'timestamp with time zone',
    nullable: true,
    name: 'deposit_at',
  })
  @AutoMap()
  depositAt: Date;

  @Column('json', { default: {} })
  @AutoMap()
  depositInfo: any;

  getOperationalZone(): string {
    return OperationalZone.CANADA.code;
  }

  getSerialNumber(): string {
    return this.getOperationalZone() + this.serial;
  }
}

export enum CardGenReqStatus {
  PENDING = 'PENDING',
  FAIL = 'FAIL',
  SUCCESS = 'SUCCESS',
}

// @Entity('card-gen-requests')
// export class CardGenerationRequest extends BaseEntity {
// TODO: CardGeneration should be an Async operation
//   @AutoMap()
//   @Column()
//   assetId: number;

//   @AutoMap()
//   @Column({ default: '0' })
//   size: string;

//   @AutoMap()
//   @Column({ default: '0' })
//   fromWalletId: number;

//   @Column({
//     type: 'enum',
//     enum: CardGenReqStatus,
//     default: CardGenReqStatus.PENDING,
//   })
//   @AutoMap()
//   status: CardGenReqStatus;
// }
