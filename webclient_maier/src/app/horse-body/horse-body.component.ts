import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {Component, ViewEncapsulation, OnInit, ViewChild} from '@angular/core';
import GameManager from "../../Utitlity/GameManager";
import {Router, RouterLink} from "@angular/router";
import {RedirectCodes} from "../../Lib/Redirect";
import {MatDrawer, MatDrawerContainer, MatSidenavContainer} from "@angular/material/sidenav";
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {FormsModule} from "@angular/forms";
import Horse from "../../Utitlity/Horse";
import {MatProgressBar} from "@angular/material/progress-bar";

@Component({
  selector: '[app-horse-body]',
  standalone: true,
  imports: [CommonModule,
    HttpClientModule,
    RouterLink,
    MatSidenavContainer,
    MatDrawerContainer,
    MatDrawer,
    MatNavList,
    MatListItem,
    MatButton,
    MatIcon, FormsModule, MatProgressBar,
  ],
  templateUrl: './horse-body.component.html',
  styleUrl: './horse-body.component.css',
  encapsulation: ViewEncapsulation.ShadowDom
})
export class HorseBodyComponent {
  protected horseOneValue: number = 0;

  constructor(private router: Router){}

  ngOnInit(): void{
    //Redirect to Login page if not logged in and Gamelocation is null
    if(GameManager.GetInstance().user == undefined && GameManager.GetInstance().gamelocation == undefined){
      this.router.navigate(['login'], {queryParams: {"redirectcode": RedirectCodes["Login failed"]}});
    }

    if(GameManager.GetInstance().gamelocation == undefined){
      return;
    }

    for(let i: number = 0; i < GameManager.GetInstance().gamelocation!.horses.length; i++){
      switch(i){
        case 0:
          this.horseOneValue = GameManager.GetInstance().gamelocation.horses[i].runDistance / GameManager.GetInstance().gamelocation.trackLength * 100;
          console.log(this.horseOneValue)
      }
    }
  }




  protected readonly GameManager = GameManager;
}
