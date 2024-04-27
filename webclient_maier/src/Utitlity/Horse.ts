export default class Horse {
  private _name: string;
  private _speed: number;
  private _bets: Record<string, number>; // Assuming bets is a mapping of string to number
  private _runDistance: number = 0;

  constructor(name: string, speed: number, bets: Record<string, number> = {}) {
    this._name = name;
    this._speed = speed;
    this._bets = bets;
  }

  public get name(){
    return this._name;
  }

  public set name(name:string){
    this._name = name;
  }

  public get speed(){
    return this._speed;
  }

  public set speed(speed:number){
    this._speed = speed;
  }

  public get bets(): Record<string, number> {
    return this._bets;
  }

  public set bets(bets: Record<string, number>){
    this.bets = bets;
  }

  public get runDistance(){
    return this._runDistance;
  }

  public set runDistance(distance:number){
    this._runDistance = distance;
  }

}
