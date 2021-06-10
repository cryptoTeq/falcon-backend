import { Entity, Column } from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { BaseEntity } from '../database/baseEntity.entiry';

const DEFAULT_VALUES = {
  locale: 'en',
  avatarUrl: 'default image url',
  timezone: 'america/toronto',
  theme: 'royal-black',
  currencyCode: 'USD',
  currencySign: '$',
};

export class Preferences {
  @AutoMap() locale: string;
  @AutoMap() timezone: string;
  @AutoMap() theme: string;
  @AutoMap() currencyCode: string;
  @AutoMap() currencySign: string;
}

@Entity('users')
export class User extends BaseEntity {
  @AutoMap()
  @Column({ length: 100 })
  firstName: string;

  @Column()
  @AutoMap()
  @Column({ length: 100 })
  lastName: string;

  @Column({ default: false })
  @AutoMap()
  kyc: boolean;

  @Column('json', { default: {} })
  @AutoMap()
  preferences: Preferences;

  @Column({ nullable: true })
  @AutoMap()
  avatarUrl: string;

  getAvatarUrl(): string {
    return this.avatarUrl || DEFAULT_VALUES.avatarUrl;
  }

  getTimezone(): string {
    return this.preferences?.timezone || DEFAULT_VALUES.timezone;
  }

  getLocale(): string {
    return this.preferences?.locale || DEFAULT_VALUES.locale;
  }

  getTheme(): string {
    return this.preferences?.theme || DEFAULT_VALUES.theme;
  }

  getCurrencyCode(): string {
    return this.preferences?.currencyCode || DEFAULT_VALUES.currencyCode;
  }

  getCurrencySign(): string {
    return this.preferences?.currencySign || DEFAULT_VALUES.currencySign;
  }
}
