import { Entity, Column } from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { BaseEntity } from '../database/baseEntity';
import { AssetTypes } from 'src/assets/asset.entity';

const DEFAULT_VALUES = {
  CANADA: 'CANADA',
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
  constructor() {
    super();
    this.status = CardStatus.PENDING;
  }

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

  @AutoMap()
  @Column({ default: '0' })
  size: string;

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
    return DEFAULT_VALUES.CANADA;
  }

  getSerialNumber(): string {
    return this.getOperationalZone() + this.serial;
  }
}
