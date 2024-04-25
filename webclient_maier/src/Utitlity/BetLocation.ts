import User from "./User";
import Horse from './Horse';

export default class BetLocation{

    private user: User;
    private trackLength: number;
    private trackName: string;
    private horses : Horse[];

    constructor(user: User, trackLength: number, trackName: string, horses: Horse[]){
        this.user = user;
        this.trackLength = trackLength;
        this.trackName = trackName;
        this.horses = horses;
    }


    public getUser():User{
        return this.user;
    }

    public getTrackLength():number{
        return this.trackLength;
    }

    public getTrackName():string{
        return this.trackName;
    }

    public getHorses(): Horse[]{
        return this.horses;
    }

}
