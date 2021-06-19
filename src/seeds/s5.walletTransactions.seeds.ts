import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import {
  WalletTransaction,
  TransactionStatus,
} from '../wallets/entity/transaction.entity';

export default class CreateWalletTransactions implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .getRepository(WalletTransaction)
      .createQueryBuilder()
      .insert()
      .into(WalletTransaction)
      .values([
        {
          assetId: 1,
          confirmedAt: '2021-06-15 13:15:20',
          fromWalletAddress:
            '0x75047aee1432c5b2f11b9d32810c0a55d2e626631ac8d5892b1c294a822b3f61',
          toWalletAddress:
            '0x75047aee1432c5b2f11b9d32810c0a55d2e626631ac8d5892b1c294a822b3f62',
          incoming: false,
          internal: true,
          hash: '0x75047aee1432c5b2f11b9d32810c0a55d2e626631ac8d5892b1c294a822b3f61',
          privateNote: 'July Home Rent',
          size: '11.0002',
          status: TransactionStatus.COMPLETED,
          txFee: '0.002',
          txFeeUsd: '0.24',
          valueUsd: '2400',
        },
        {
          assetId: 1,
          confirmedAt: new Date('2021-02-15 13:13:20').toUTCString(),
          fromWalletAddress:
            '0x75047aee1432c5b2f11b9d32810c0a55d2e626631ac8d5892b1c294a822b3f61',
          toWalletAddress:
            '0x75047aee1432c5b2f11b9d32810c0a55d2e626631ac8d5892b1c294a822b3f62',
          incoming: true,
          internal: false,
          hash: '0x75047aee1432c5b2f11b9d32810c0a55d2e626631ac8d5892b1c294a822b3f61',
          privateNote: 'July Payroll Deposite',
          size: '19.1902',
          status: TransactionStatus.PENDING,
          txFee: '0.002',
          txFeeUsd: '0.31',
          valueUsd: '9000',
        },
      ])
      .execute();
  }
}
