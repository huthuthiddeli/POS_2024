import { Injectable } from '@angular/core';
import {sha256} from "crypto-hash";

@Injectable({
  providedIn: 'root'
})
export class PasswordHasherService {

  constructor() { }


  public async hashPassword(password: string): Promise<string> {
    let passwordHashed: string = await sha256(password);

    return passwordHashed;
  }
}
