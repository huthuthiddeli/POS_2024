import { Component, OnInit } from '@angular/core';
import {NgForOf} from "@angular/common";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import GameManager from "../../Utitlity/GameManager";
import BetLocation from "../../Utitlity/BetLocation";
import Horse from "../../Utitlity/Horse";
import User from "../../Utitlity/User";
import {FormsModule} from "@angular/forms";
import {LoggerService} from "../logger.service";
import {MyhttpclientService} from "../myhttpclient.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-betpage',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,

  ],
  templateUrl: './betpage.component.html',
  styleUrl: './betpage.component.css'
})
export class BetpageComponent {
  horses: Horse[];
  betLocation: BetLocation  | undefined;
  betList: Record<string, number>;
  protected readonly Object = Object;
  maxBetValue: number;
  protected data: any;
  protected selHorse: Horse;


  constructor(private myHttpclient: HttpClient, private logger: LoggerService, private myHttpClient2: MyhttpclientService, private router: Router) {
    this.horses = []
    this.betList = {}
    this.maxBetValue = 0;
    this.selHorse = new Horse("", 0, this.betList);
  }

  ngOnInit() {
    this.betLocation = GameManager.GetInstance().gamelocation;

    if(GameManager.GetInstance().user == undefined){

      console.log("user undefined");
      return;
    }else{
      console.log(GameManager.GetInstance().user.printDetails());
    }

    let user:User = GameManager.GetInstance().user;

    if(user.money == undefined){
      return;
    }


    this.maxBetValue = user.money;

    this.betLocation?.horses.map(value => {this.horses.push(value);})

  }


  test(horse: Horse){

    // @ts-ignore
    this.selHorse = this.betLocation.horses.find(hor => hor == horse);

    this.logger.log("new bets:");
    this.logger.log(this.selHorse.bets);

    if(this.selHorse != undefined){
      console.log(this.selHorse.name)

      this.betList = this.selHorse.bets;

      /*
      Object.entries(this.selHorse.bets).forEach(([key, value]) => {
          console.log(key + "    " + value);
      });
      */

    }

  }

  test2(selectedHorse: Horse){
    if(selectedHorse.name == undefined){
      console.log("No horse was selected!");
      return;
    }

    this.myHttpClient2.blacePet(selectedHorse, this.maxBetValue);

    this.test(selectedHorse);

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/betpage']);
    });

  }

}
