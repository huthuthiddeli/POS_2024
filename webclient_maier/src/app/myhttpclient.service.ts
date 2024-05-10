import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import Horse from "../Utitlity/Horse";
import GameManager from "../Utitlity/GameManager";
import {LoggerService} from "./logger.service";
import BetLocation from "../Utitlity/BetLocation";
import {PasswordHasherService} from "./password-hasher.service";
import User from "../Utitlity/User";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {rejects} from "node:assert";
import {resolve} from "node:path";
import {B} from "@angular/cdk/keycodes";

@Injectable({
  providedIn: 'root'
})
export class MyhttpclientService {

  constructor(private client: HttpClient,
              private logger: LoggerService,
              private hasherService: PasswordHasherService,
              private router: Router) { }




  async blacePet(h:Horse, betValue: number): Promise<BetLocation | null>{

    const headers:HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*' // Allow all origins, you can customize this
    });

    if(!GameManager.GetInstance().user || GameManager.GetInstance().user === undefined){
      this.logger.error("User not found");
      return null;
    }

    let better: string = GameManager.GetInstance().user.username;

    if(betValue === undefined){
      console.log("undefined")
      return null;
    }

    console.log("Better:", better);
    let horseName: string = h.name;

    let json: string = JSON.stringify({betValue, better, horseName})

    try{
      const betLocation: BetLocation | undefined = await this.client.post<BetLocation>('http://localhost:8080/Pferderennen/Game/Bet', json, {headers}).toPromise();

      if(!betLocation){
        this.logger.error("Could not find betLocation");
        return null;
      }

      let actualBetLocation: BetLocation = new BetLocation(
        betLocation.location,
        betLocation.horses,
        betLocation.trackLength,
        betLocation.gameFinished,
        betLocation.winner,
        betLocation.gameStarted
      );

      GameManager.GetInstance().gamelocation = actualBetLocation;

      return actualBetLocation;

    }catch (error){
      console.log("Error logging on:", error);
      return null;
    }
  }

  async iterate(): Promise<BetLocation | null>{

    const headers:HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*' // Allow all origins, you can customize this
    });

    try{
      const betLocation: BetLocation | undefined = await this.client.get<BetLocation>('http://localhost:8080/Pferderennen/Game/iterate', {headers}).toPromise();

      if(!betLocation){
        console.error("Betlocation null!");
        return null;
      }

      let actualObject: BetLocation = new BetLocation(
        betLocation.location,
        betLocation.horses,
        betLocation.trackLength,
        betLocation.gameFinished,
        betLocation.winner,
        betLocation.gameStarted
      );

      GameManager.GetInstance().gamelocation = actualObject;

      return actualObject;


    }catch (error){
      console.error('Loggin error:',error);
      return null;
    }
  }

  async sign_up(username: string, password: string): Promise<User | null>{

    let hashedPassword: string = await this.hasherService.hashPassword(password);

    const headers:HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*' // Allow all origins, you can customize this
    });

    let obj: User = new User("", username, 0, hashedPassword);

    let json: string = JSON.stringify(obj);

    console.log(json);

    try{
      const user: User | undefined = await this.client.post<User>('http://localhost:8080/User/Create', json, {headers}).toPromise();

      if(!user){
        this.logger.error("User not found");
        return null;
      }

      let _username: string = user['_username'];
      let _hashedPassword: string = user['_passwordHashed'];
      let _money: number = user['_money'];

      let actualObj: User = new User("", _username, _money, _hashedPassword);

      GameManager.GetInstance().user = actualObj;

      return actualObj;


    }catch (error){
      console.log("Error logging on:", error);
      return null;
    }
  }

  async login(_username: string, password: string): Promise<User | null> {
    const _passwordHashed: string = await this.hasherService.hashPassword(password);
    const _money: number = 0;
    const jsonObj = JSON.stringify({ _username, _money, _passwordHashed });

    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*' // Allow all origins, you can customize this
    });

    try {
      const response = await this.client.post<User>('http://localhost:8080/User/Login', jsonObj, { headers }).toPromise();

      console.log(response);

      if (!response) {
        this.logger.error("undefined!");
        return null;
      }

      let _id: string = response['id'];
      let _username: string = response['username'];
      let _hashedPassword: string = response['passwordHashed'];
      let _money: number = response['money'];

      let actualuser: User = new User(_id, _username, _money, _hashedPassword);

      GameManager.GetInstance().user = actualuser;

      return actualuser;

    } catch (error) {
      console.error('Error logging in:', error);
      return null;
    }
  }

  async init(): Promise<BetLocation | null>{

    const headers:HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*' // Allow all origins, you can customize this
    });

    let json: string = JSON.stringify(GameManager.GetInstance().user);

    try{
      const betLocation: BetLocation|undefined = await this.client.post<BetLocation>('http://localhost:8080/Pferderennen/Game/innit', json, {headers}).toPromise();

      if(!betLocation){
        this.logger.error("Error receiving betlocation!");
        return null;
      }

      let actualObject: BetLocation = new BetLocation(
        betLocation.location,
        betLocation.horses,
        betLocation.trackLength,
        betLocation.gameFinished,
        betLocation.winner,
        betLocation.gameStarted
      );

      GameManager.GetInstance().gamelocation = actualObject;

      return actualObject;

    }catch (error){
      console.error('Error loggin in:', error);
      return null;
    }
  }
}
