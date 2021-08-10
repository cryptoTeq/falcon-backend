import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Card, CardStatus } from '../cards/card.entity';
import { AssetTypes } from 'src/assets/asset.entity';

export default class CreateCards implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .getRepository(Card)
      .createQueryBuilder()
      .insert()
      .into(Card)
      .values([
        {
          status: CardStatus.ACTIVE,
          symbol: 'CAD',
          assetId: 1,
          serial: 'CA1122334455',
          key: 'xg8250nbg4klq5b3',
          size: '5.00',
          assetType: AssetTypes.FIAT,
          //U2FsdGVkX1/+2sxCYu6xiHCGzD5tbio7/DOQfQhcWXD887UGpaNmyanmwdWhUtprso2zAJdNW+Bb31D9ra6RYH3jGm6Nro4IPbXe3PDRgdM=
        },
        {
          status: CardStatus.ACTIVE,
          symbol: 'CAD',
          assetId: 1,
          serial: 'CA9988776655',
          assetType: AssetTypes.FIAT,
          key: 'xg1450nbz4klq7z9',
          size: '10.00',
          //U2FsdGVkX1/kAxtNVEuRKtoggRD9K5v2hUhtyBC6rDUYjIQouew5y0nTrPd3U+bOs0sRC/SJKfWJKKVKSWz+i9TAQl0Tw5jnMCf5E2JO/R0=
        },
      ])
      .execute();
  }
}
