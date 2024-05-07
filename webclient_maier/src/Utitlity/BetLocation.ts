import User from "./User";
import Horse from './Horse';

export default class BetLocation{

  private _location: string;
  private _horses: Horse[];
  private _trackLength:number;
  private _gameFinished: boolean;
  private _winner: Horse;
  private _gameStarted: boolean;

    constructor(location: string, horses:Horse[], trackLength:number, gameFinished: boolean, winner:Horse, gameStarted:boolean){
        this._trackLength = trackLength;
        this._location = location;
        this._horses = horses;
        this._gameFinished = gameStarted;
        this._winner = winner;
        this._gameStarted = gameStarted;
    }

    public async GetWinner(): Promise<Record<string, number>>{
      let winners : Record<string, number> = {};

      this._horses.forEach((winningHorse: Horse) => {
          Object.entries(winningHorse.bets).forEach(([key, value]) => {

              // Check if the bettor's horse won
              let betWon: boolean = this._winner == winningHorse;

              // Calculate the result based on the bet
              let result: number = betWon ? value : -value;

              // Update the bet result for the bettor
              if (key in winners)
              {
                winners[key] += result;
              }
              else
              {
                console.log(result);
                winners[key] = result;
              }
            }
          );
        }
      );


      return winners;
    }



    public get location():string{
      return this._location;
    }

    public set location(location: string){
      this._location = location;
    }

    public get horses(): Horse[] {
      return this._horses;
    }

    public set horses(horses:Horse[]){
      this._horses = horses;
    }

    public get trackLength(){
      return this._trackLength;
    }

    public set trackLength(trackLength:number){
      this._trackLength = trackLength;
    }

    public get gameFinished(){
      return this._gameFinished;
    }

    public set gameFinished(gameFinished:boolean){
      this._gameFinished = gameFinished;
    }

    public get winner(){
      return this._winner
    }

    public set winner(winner:Horse){
      this._winner = winner;
    }

    public get gameStarted(){
      return this._gameStarted;
    }

    public set gameStarted(gameStarted:boolean){
      this._gameStarted = gameStarted;
    }

    public toString(): void{
      console.log("location: " + this.location + " horsesize: " + this.horses.length + " gamefinsihed: " + this.gameFinished + " gameStarted: " + this.gameStarted + " winner: " + this.winner);
}

}
