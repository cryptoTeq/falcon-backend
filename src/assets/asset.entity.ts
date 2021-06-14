import { Entity, Column } from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { BaseEntity, BASE_ENTITY_SATUSES } from '../database/baseEntity';

const ASSET_DEFAULT_VALUES = {
  avatarUrl: 'THEME_ASSETSYMBOL.png',
  avatarUrlExample: 'royal_black_tik.png',
};

@Entity('assets')
export class Asset extends BaseEntity {
  constructor() {
    super();
    this.status = BASE_ENTITY_SATUSES.ACTIVE;
  }

  @AutoMap()
  @Column({ length: 100 })
  name: string;

  @AutoMap()
  @Column({ length: 100 })
  symbol: string;

  @Column({ nullable: true })
  @AutoMap()
  sortOrder: number;

  @Column('json', { default: {} })
  @AutoMap()
  extras: any;
}
