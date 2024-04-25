import { sha256 } from 'crypto-hash';

export class PasswordHasher {
  public static async hashPassword(password: string): Promise<string> {
    let passwordHashed: string = await sha256(password);

    return passwordHashed;
  }}
