import { Component, OnInit } from '@angular/core';
import {NgForOf} from "@angular/common";
import GameManager from "../../Utitlity/GameManager";
import Horse from "../../Utitlity/Horse";
import {FormsModule} from "@angular/forms";
import {MyhttpclientService} from "../myhttpclient.service";
import {Router} from "@angular/router";
import {RedirectCodes} from "../../Utitlity/Redirect";

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
  betList: Record<string, number>;
  protected readonly Object = Object;
  maxBetValue: number;
  protected data: any;
  protected selHorse: Horse;
  protected submitStatus = false;
  protected newValue: number;

  constructor(private client: MyhttpclientService, private router: Router) {
    this.horses = []
    this.betList = {}
    this.maxBetValue = 0;
    this.newValue = 0;
    this.selHorse = new Horse("", 0, this.betList);
  }

  ngOnInit() {

    if(GameManager.GetInstance().user == undefined && GameManager.GetInstance().gamelocation == undefined){
      this.router.navigate(['login'], {queryParams: {"redirectcode": RedirectCodes["Login failed"]}});
    }

    if(GameManager.GetInstance().gamelocation.gameStarted){
      this.submitStatus = true;
    }

    this.maxBetValue = GameManager.GetInstance().user.money;

    this.horses = GameManager.GetInstance().gamelocation.horses;
  }


  async findHorse(horse: Horse){

    // @ts-ignore
    this.selHorse = GameManager.GetInstance().gamelocation.horses.find(hor => hor.name == horse.name);

    if(this.selHorse != undefined){
      this.betList = this.selHorse.bets;
    }

    console.log("new bets:");
    console.log(this.selHorse.bets);
  }

  async placeBet(selectedHorse: Horse){

    console.log(selectedHorse)
    if(selectedHorse === null || selectedHorse === undefined){
      console.log("No horse was selected!");
      return;
    }

    if(this.newValue == 0){
      return;
    }


    let betLocation = await this.client.blacePet(selectedHorse, this.newValue);

    if(betLocation == null){
      console.error("Couldn't receive betlocation!");
      return;
    }

    await this.findHorse(selectedHorse);

    this.horses = [];
    GameManager.GetInstance().gamelocation.horses.map(horse => {this.horses.push(horse);})

    alert('Bet has been placed on: ' + selectedHorse.name);

    await this.router.navigate(['/'])
  }

  protected readonly GameManager = GameManager;
}
