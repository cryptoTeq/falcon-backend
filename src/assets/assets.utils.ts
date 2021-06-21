import { User } from '../users/user.entity';
import { Asset } from './asset.entity';

export const getAssetAvatar = (symbol: string, themeName: string) => {
  return `${themeName}_${symbol}_use_util_function`;
};
