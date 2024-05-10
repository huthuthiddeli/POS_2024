export default class User{

  private _id: string;
  private _username : string;
  private _money : number;
  private _passwordHashed : string;

  public constructor(_id: string, _username : string, _money : number, _passwordHahsed : string ){
    this._id = _id;
    this._username = _username;
    this._money = _money;
    this._passwordHashed = _passwordHahsed;
  }

  // Method to print person's details
  printDetails(): string {
    return (`Name: ${this._username}, Money: ${this._money}, HashedPassword: ${this._passwordHashed}`);
  }

  public get id(): string{
    return this._id;
  }

  public set id(_id: string){
    this._id = _id;
  }

  get username(): string {
    return this._username;
  }

  set username(username: string) {
    this._username = username;
  }

  public get money(): number {
    return this._money;
  }

  set money(money: number) {
    this._money = money;
  }

  get passwordHashed(): string {
    return this._passwordHashed;
  }

  set passwordHashed(passwordHashed: string) {
    this._passwordHashed = passwordHashed;
  }

}
