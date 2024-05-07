import { Component, OnInit } from '@angular/core';
import {NgForOf} from "@angular/common";
import GameManager from "../../Utitlity/GameManager";
import Horse from "../../Utitlity/Horse";
import {FormsModule} from "@angular/forms";
import {LoggerService} from "../logger.service";
import {MyhttpclientService} from "../myhttpclient.service";
import {Router} from "@angular/router";
import {RedirectCodes} from "../../Lib/Redirect";

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

  constructor(private logger: LoggerService, private client: MyhttpclientService, private router: Router) {
    this.horses = []
    this.betList = {}
    this.maxBetValue = 0;
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
      console.log(this.selHorse.name)
      this.betList = this.selHorse.bets;
    }

    this.logger.log("new bets:");
    this.logger.log(this.selHorse.bets);
  }

  async placeBet(selectedHorse: Horse){

    console.log(selectedHorse)
    if(selectedHorse === null || selectedHorse === undefined){
      console.log("No horse was selected!");
      return;
    }

    let betLocation = await this.client.blacePet(selectedHorse, this.maxBetValue);

    if(betLocation == null){
      this.logger.error("Couldn't receive betlocation!");
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
