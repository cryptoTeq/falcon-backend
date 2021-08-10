import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import {
  TransactionStatus,
  TransactionType,
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
          fromWalletId: 1,
          toWalletId: 1,
          from: 'CIBC Bank Account: 6*****2',
          to: "CIBC user's wallet",
          internal: false,
          status: TransactionStatus.COMPLETED,
          confirmedAt: new Date(),
          hash: '',
          assetId: 1,
          symbol: 'CAD',
          size: '15.00',
          assetValueUsd: '0.76',
          totalValueUsd: (0.76 * 15.0).toFixed(2),
          txFee: '0.00',
          txFeeUsd: '0.0',
          type: TransactionType.FROM_BANK_ACC,
          senderPrivateNote: 'Tranfer from bank account into system',
        },
      ])
      .execute();
  }
}
