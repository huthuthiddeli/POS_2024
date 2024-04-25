import BetLocation from "./BetLocation";
import User from "./User";


export default class GameManager {
  private static INSTANCE: GameManager;
  private gamelocation: BetLocation | undefined;
  private user: User | undefined;

  private constructor(){}



  public SetUser(user: User){
    this.user = user;
  }

  public GetUser(): User | undefined{
    return this.user;
  }

  public SetGameLocation(gameLocation: BetLocation){
    this.gamelocation = gameLocation;
  }

  public GetGameLocation(): BetLocation | null{
    if(this.gamelocation == null){
      return null;
    }

    return this.gamelocation;
  }

  public static GetInstance(): GameManager{
    if(!GameManager.INSTANCE){
        GameManager.INSTANCE = new GameManager();
    }
    return GameManager.INSTANCE;
  }
}
