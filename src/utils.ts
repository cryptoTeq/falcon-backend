import { AES, enc } from 'crypto-js';
import Big from 'big.js';

export class Utils {
  static decrypt(secret: string, qrCodeData: string): string {
    return AES.decrypt(qrCodeData, secret).toString(enc.Utf8);
  }

  static encrypt(secret: string, qrCodeData: string): string {
    return AES.encrypt(qrCodeData, secret).toString();
  }

  static add(a: string, b): string {
    const A = Big(a);
    const B = Big(b);
    return A.add(B).toString();
  }

  static minus(a: string, b): string {
    const A = Big(a);
    const B = Big(b);
    return A.minus(B).toString();
  }

  static multiply(a: string, b): string {
    const A = Big(a);
    const B = Big(b);
    return A.mul(B).toString();
  }
}
