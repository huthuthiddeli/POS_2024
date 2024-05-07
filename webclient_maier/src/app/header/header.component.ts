import {Component, ViewEncapsulation} from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import User from '../../Utitlity/User';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {FormsModule} from "@angular/forms";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import GameManager from "../../Utitlity/GameManager";
import {MatButton} from "@angular/material/button";
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from "@angular/material/sidenav";
import {MatIcon} from "@angular/material/icon";
import {MatListItem, MatNavList} from "@angular/material/list";
import {BetpageComponent} from "../betpage/betpage.component";
import {MyhttpclientService} from "../myhttpclient.service";
import {LoggerService} from "../logger.service";
import BetLocation from "../../Utitlity/BetLocation";
import Horse from "../../Utitlity/Horse";

@Component({
  selector: '[app-header]:not(p)',
  standalone: true,
    imports: [HttpClientModule,
      CommonModule,
      RouterOutlet,
      RouterLink,
      RouterLinkActive,
      FormsModule,
      MatMenu,
      MatMenuTrigger,
      MatMenuItem,
      MatButton,
      MatDrawer,
      MatDrawerContainer,
      MatIcon,
      MatListItem,
      MatNavList,
      MatDrawerContent,
      BetpageComponent
    ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  encapsulation: ViewEncapsulation.ShadowDom
})

export class HeaderComponent {
  protected title: string;


  constructor(private myHttpclient: HttpClient,
              private client: MyhttpclientService,
              private logger: LoggerService,
              private router: Router) {
    this.title = "Pferderennen";
  }

  fetchActiveUsers(): Observable<User> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*' // Allow all origins, you can customize this
    });
    return this.myHttpclient.get<User>('http://localhost:8080/Pferderennen/Game/ActiveUsers', { headers });
  }

  async iterate(): Promise<void>{
    const betLocation: BetLocation|null = await this.client.iterate();

    if(betLocation == null){
      console.error("Betlocation couldn't have been found!");
      return;
    }

    let lastWinner: Horse | undefined = undefined;

    for(let i = 0; i < betLocation.horses.length; i++){

      if(betLocation.horses[i].runDistance >= betLocation.trackLength){
        if(lastWinner !== undefined){
          if(betLocation.horses[i].runDistance > (lastWinner as Horse).runDistance){
            lastWinner = betLocation.horses[i];
          }
        }else{
          lastWinner = betLocation.horses[i];
        }

      }
    }

    if(lastWinner !== undefined){
      alert("Winner has been selected: " + lastWinner.name);
      GameManager.GetInstance().gamelocation.winner = lastWinner;
      await this.router.navigate(['/winner']);
      lastWinner = undefined;

      return;
    }

    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/']);
    });
    this.logger.log("reloaded!");
  }
}
