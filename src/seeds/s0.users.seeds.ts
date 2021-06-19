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
          firstName: 'Amir Mohsen',
          kyc: false,
          lastName: 'Hossein Zadeh',
          avatarUrl: '79ba1628-cc65-11eb-b8bc-0242ac130003.jpg',
          preferences: {
            timezone: 'america/toronto',
          },
        },
        {
          firstName: 'Amir Ahmad',
          kyc: true,
          lastName: 'Hosseinzadeh',
          preferences: {
            locale: 'de',
            timezone: 'europe/germany',
          },
        },
        {
          firstName: 'Amir Hadi',
          kyc: true,
          lastName: 'Hossein-zadeh',
        },
      ])
      .execute();
  }
}
