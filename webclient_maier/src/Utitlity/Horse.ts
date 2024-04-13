


export default class Horse{

    private name: string;
    private speed: number;
    private bets: {};
    private runDistance = 0;



    public constructor(name: string, speed: number, bets: {}, runDistance: number){
        this.name = name;
        this.speed = speed;
        this.bets = bets;
        this.runDistance = runDistance;
    }


    public getName():string{
        return this.name;
    }

    public getSpeed():number{
        return this.speed;
    }

    public getBets(): {}{
        return this.bets;
    }

    public getRunDistance():number{
        return this.runDistance;
    }

    //TODO: MAKE IT A HASHSET/DICTIONARY
    public addBet(betterName: string, value:number){
        this.bets = {betterName, value};
    }
}