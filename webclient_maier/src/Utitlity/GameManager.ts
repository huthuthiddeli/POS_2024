import BetLocation from "./BetLocation";
import User from "./User";


export default class GameManager {
  private static INSTANCE: GameManager;
  private _gamelocation: BetLocation | undefined;
  private _user: User | undefined;

  private constructor(){
  }

  public set user(newUser: User){
    this._user = newUser;
  }

  public get user(): User{
    return this._user!;
  }

  public set gamelocation(location: BetLocation){
    this._gamelocation = location;
  }

  public get gamelocation(): BetLocation{
    return this._gamelocation!;
  }

  public static GetInstance(): GameManager{
    if(!GameManager.INSTANCE){
        GameManager.INSTANCE = new GameManager();
    }
    return GameManager.INSTANCE;
  }
}
