import { Component, OnInit } from '@angular/core';
import {NgForOf} from "@angular/common";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import GameManager from "../../Utitlity/GameManager";
import BetLocation from "../../Utitlity/BetLocation";
import Horse from "../../Utitlity/Horse";
import User from "../../Utitlity/User";
import {FormsModule} from "@angular/forms";

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

  constructor(private myHttpclient: HttpClient){
    this.horses = []
    this.betList = {}
    this.maxBetValue = 0;
  }

  ngOnInit() {
    this.betLocation = GameManager.GetInstance().gamelocation;

    let user:User = GameManager.GetInstance().user;

    if(user.money == undefined){
      console.log("UNDEFINED")
    }


    this.maxBetValue = user.money;

    this.betLocation?.horses.map(value => {this.horses.push(value);})

  }


  test(horse: Horse){

    // @ts-ignore
    let selHorse: Horse | undefined  = this.betLocation.horses.find(hor => hor == horse);

    if(selHorse != undefined){
      console.log(selHorse.name)

      this.betList = selHorse.bets;


      Object.entries(selHorse.bets).forEach(([key, value]) => {
          console.log(key + "    " + value);


      });


    }

  }

  test2(){
    console.log(GameManager.GetInstance().user);
    console.log(this.data);
  }

}
