import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { User } from '../users/user.entity';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .getRepository(User)
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          firstName: 'CIBC Credit Account',
          kyc: true,
          lastName: '',
          defaultWalletId: 1,
          avatarUrl: '79ba1628-cc65-11eb-b8bc-0242ac130003.jpg',
          preferences: {
            timezone: 'America/Toronto',
          },
        },
        {
          firstName: 'Asset Converter',
          kyc: true,
          lastName: '',
          defaultWalletId: 2,
          avatarUrl: '79ba1628-cc65-11eb-b8bc-0242ac130003.jpg',
          preferences: {
            timezone: 'America/Toronto',
          },
        },
        {
          firstName: 'Asset Holder',
          kyc: true,
          lastName: '',
          defaultWalletId: 3,
          avatarUrl: '79ba1628-cc65-11eb-b8bc-0242ac130003.jpg',
          preferences: {
            timezone: 'America/Toronto',
          },
        },
        {
          firstName: 'System Agent',
          kyc: true,
          lastName: '',
          defaultWalletId: 4,
          avatarUrl: '79ba1628-cc65-11eb-b8bc-0242ac130003.jpg',
          preferences: {
            timezone: 'America/Toronto',
          },
        },

        {
          firstName: 'Amir Mohsen',
          kyc: false,
          lastName: 'Hossein Zadeh',
          defaultWalletId: 5,
          avatarUrl: '79ba1628-cc65-11eb-b8bc-0242ac130003.jpg',
          preferences: {
            timezone: 'America/Toronto',
          },
        },
        {
          firstName: 'Amir Ahmad',
          kyc: true,
          defaultWalletId: 6,
          lastName: 'Hosseinzadeh',
          preferences: {
            locale: 'de',
            timezone: 'Europe/Berlin',
          },
        },
        {
          firstName: 'Amir Hadi',
          kyc: true,
          defaultWalletId: 7,
          lastName: 'Hossein-zadeh',
        },
      ])
      .execute();
  }
}
