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
          username: 'aMir',
          userId: 1,
          refreshToken: 'refreshToken',
          password: '1234',
        },
      ])
      .execute();
  }
}
