import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import {
  TransactionStatus,
  WalletTransaction,
} from '../wallets/entity/walletTransaction.entity';

export default class CreateWalletTransactions implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .getRepository(WalletTransaction)
      .createQueryBuilder()
      .insert()
      .into(WalletTransaction)
      .values([
        {
          fromWalletId: 0,
          internal: false,
          toWalletId: 1,
          status: TransactionStatus.COMPLETED,
          confirmedAt: new Date(),
          hash: '0xbddd46713d9941864c120be9a9d1c5579c1003b03ee2d83ade138ccff570c3f3',
          assetId: 1,
          size: '90000',
          valueUsd: '20.79',
          txFee: '0.000231',
          txFeeUsd: '0.002  ',
        },
        {
          fromWalletId: 0,
          internal: false,
          toWalletId: 1,
          status: TransactionStatus.COMPLETED,
          confirmedAt: new Date(),
          hash: '0xbddd46713d9941864c120be9a9d1c5579c1003b03ee2d83ade138ccff570c3f3',
          assetId: 2,
          size: '100236',
          valueUsd: '900.72',
          txFee: '0.000298',
          txFeeUsd: '0.015  ',
        },
      ])
      .execute();
  }
}
