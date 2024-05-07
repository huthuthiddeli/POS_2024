import { Component, OnInit } from '@angular/core';
import GameManager from "../../Utitlity/GameManager";
import {RedirectCodes} from "../../Lib/Redirect";
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

  public constructor(private router: Router, private client: MyhttpclientService){
  }


  async onNgInit(): Promise<void>{
    if(GameManager.GetInstance().user == undefined && GameManager.GetInstance().gamelocation == undefined){
      await this.router.navigate(['login'], {queryParams: {"redirectcode": RedirectCodes["Login failed"]}});
      return;
    }
  }




    protected readonly GameManager = GameManager;
  protected readonly Object = Object;
}
