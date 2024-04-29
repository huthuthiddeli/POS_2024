import BetLocation from "./BetLocation";
import User from "./User";


export default class GameManager {
  private static INSTANCE: GameManager;
  private _gamelocation: BetLocation | undefined;
  private _user: User | undefined;

  private constructor(){
  }

  public set user(newUser: User){

    console.log(newUser instanceof User);
    console.log(typeof(newUser) === 'object');

    this._user = newUser;
  }

  public get user(): User{
    return this._user!;
  }

  public set gamelocation(location: BetLocation){
    this._gamelocation = location;
  }

  public get gamelocation(): BetLocation{
    if(!this._gamelocation){
      console.log("Betlocation is null in: Gamemanager line 27")
    }

    return this._gamelocation!;
  }

  public static GetInstance(): GameManager{
    if(!GameManager.INSTANCE){
        GameManager.INSTANCE = new GameManager();
    }
    return GameManager.INSTANCE;
  }
}
