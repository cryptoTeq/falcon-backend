import { AES, enc } from 'crypto-js';
import Big from 'big.js';

export class Utils {
  static decrypt(secret: string, qrCodeData: string): string {
    return AES.decrypt(qrCodeData, secret).toString(enc.Utf8);
  }

  static encrypt(secret: string, qrCodeData: string): string {
    return AES.encrypt(qrCodeData, secret).toString(); //TODO: improve en/decryption
  }

  static convertToBig(numbers: string[]) {
    return numbers.map((n) => Big(n));
  }

  static isLessThan(a: string, b: string) {
    const [A, B] = this.convertToBig([a, b]);
    return A.lt(B);
  }

  static isGreaterThan(a: string, b: string) {
    const [A, B] = this.convertToBig([a, b]);
    return A.gt(B);
  }

  static isGreaterOrEqual(a: string, b: string) {
    const [A, B] = this.convertToBig([a, b]);
    return A.gte(B);
  }

  static add(a: string, b: string): string {
    //TODO: improve this convert to big in all funcs
    const [A, B] = this.convertToBig([a, b]);
    return A.add(B).toString();
  }

  static minus(a: string, b: string): string {
    const [A, B] = this.convertToBig([a, b]);
    return A.minus(B).toString();
  }

  static multiply(a: string, b: string): string {
    const [A, B] = this.convertToBig([a, b]);
    return A.mul(B).toString();
  }

  static average(a: string, b: string): string {
    const [A, B] = this.convertToBig([a, b]);
    return A.add(B).div('2').toString();
  }
}
