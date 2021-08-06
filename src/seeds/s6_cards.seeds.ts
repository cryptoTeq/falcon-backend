import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Card, Status } from 'src/cards/card.entity';

export default class CreateCards implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .getRepository(Card)
      .createQueryBuilder()
      .insert()
      .into(Card)
      .values([
        {
          status: Status.ACTIVE,
          assetId: 1,
          serial: 'CA1122334455',
          key: 'xg8250nbg4klq5b3',
          size: '5.00',
        },
        {
          status: Status.PENDING,
          assetId: 1,
          serial: 'CA9988776655',
          key: 'xg1450nbz4klq7z9',
          size: '5.00',
        },
      ])
      .execute();
  }
}
