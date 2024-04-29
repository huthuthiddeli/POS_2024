import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import Horse from "../Utitlity/Horse";
import GameManager from "../Utitlity/GameManager";
import {LoggerService} from "./logger.service";
import BetLocation from "../Utitlity/BetLocation";
import {response} from "express";
import {RequestParameter} from "@angular/cli/src/analytics/analytics-parameters";

@Injectable({
  providedIn: 'root'
})
export class MyhttpclientService {

  constructor(private client: HttpClient, private logger: LoggerService) { }




  blacePet(h:Horse, betValue: number): void{

    const headers:HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*' // Allow all origins, you can customize this
    });


    if(!GameManager.GetInstance().user){
      this.logger.error("User not found");
      return;
    }

    let better: string = GameManager.GetInstance().user.username;
    let horseName: string = h.name;

    let json: string = JSON.stringify({betValue, better, horseName})


    this.client.post<BetLocation>('http://localhost:8080/Pferderennen/Game/Bet', json, {headers})
     .subscribe( async (responeBetlocation) =>
        {

          if(!responeBetlocation){
            this.logger.error("An Error has occured!");
          }

          this.logger.log(responeBetlocation.horses);

          let actualBetLocation: BetLocation = new BetLocation(
              responeBetlocation.location,
              responeBetlocation.horses,
              responeBetlocation.trackLength,
              responeBetlocation.gameFinished,
              responeBetlocation.winner,
              responeBetlocation.gameStarted
            );

          GameManager.GetInstance().gamelocation = actualBetLocation;
          console.log("Bet has placed bet!");
        }
    );




  }



}
