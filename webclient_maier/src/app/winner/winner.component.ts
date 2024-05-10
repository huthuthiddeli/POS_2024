import { Component, OnInit } from '@angular/core';
import GameManager from "../../Utitlity/GameManager";
import {RedirectCodes} from "../../Utitlity/Redirect";
import {Router} from "@angular/router";
import {MyhttpclientService} from "../myhttpclient.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-winner',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './winner.component.html',
  styleUrl: './winner.component.css'
})
export class WinnerComponent {

  public constructor(private router: Router){
  }


  async ngOnInit(): Promise<void>{
    if(GameManager.GetInstance().user == undefined && GameManager.GetInstance().gamelocation == undefined && GameManager.GetInstance().gamelocation.gameFinished){
      await this.router.navigate(['login'], {queryParams: {"redirectcode": RedirectCodes["Login failed"]}});
      return;
    }

    if(GameManager.GetInstance().gamelocation.winner !== undefined){
      let winner = await GameManager.GetInstance().gamelocation.GetWinner();


      Object.entries(winner).forEach(([key, value]) => {
        console.log("ITEMS: " + key + "  " + value);
      })
    }else{
      console.log("No bets have been placed this game!");
    }
  }




    protected readonly GameManager = GameManager;
  protected readonly Object = Object;
}
