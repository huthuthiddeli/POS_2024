import { Component, OnInit } from '@angular/core';
import {NgForOf} from "@angular/common";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import GameManager from "../../Utitlity/GameManager";
import BetLocation from "../../Utitlity/BetLocation";
import Horse from "../../Utitlity/Horse";

@Component({
  selector: 'app-betpage',
  standalone: true,
  imports: [
    NgForOf,

  ],
  templateUrl: './betpage.component.html',
  styleUrl: './betpage.component.css'
})
export class BetpageComponent {
  horses: Horse[];
  betLocation: BetLocation  | undefined;
  betList: Record<string, number>;

  constructor(private myHttpclient: HttpClient){
    this.horses = []
    this.betList = {}
  }

  ngOnInit() {
    this.betLocation = GameManager.GetInstance().GetGameLocation();


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

  protected readonly Object = Object;
}
