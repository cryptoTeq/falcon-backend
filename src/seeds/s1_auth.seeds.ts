import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Auth } from '../auth/auth.entity';

export default class CreateAuthUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .getRepository(Auth)
      .createQueryBuilder()
      .insert()
      .into(Auth)
      .values([
        {
          refreshTokenExpires: '',
          status: 'ACTIVE',
          username: 'am@getroyalwallet.com',
          userId: 5,
          refreshToken: 'refreshToken',
          passwordHash: '1234',
        },
        {
          refreshTokenExpires: '',
          status: 'ACTIVE',
          username: 'aa@getroyalwallet.com',
          userId: 6,
          refreshToken: 'refreshToken',
          passwordHash: '1234',
        },
        {
          refreshTokenExpires: '',
          status: 'ACTIVE',
          username: 'ah@getroyalwallet.com',
          userId: 7,
          refreshToken: 'refreshToken',
          passwordHash: '1234',
        },
      ])
      .execute();
  }
}
