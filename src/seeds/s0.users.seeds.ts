import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { User } from '../users/user.entity';

export default class CreateAuthUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .getRepository(User)
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          firstName: 'Amir Mohsen',
          kyc: true,
          lastName: 'Zad',
          avatarUrl: 'myavatar.jpg',
          preferences: {
            locale: 'fr',
            timezone: 'america/toronto',
          },
        },
        {
          firstName: 'Amir Hadi',
          kyc: true,
          lastName: 'Zad',
        },
      ])
      .execute();
  }
}
