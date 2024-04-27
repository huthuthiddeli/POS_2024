import {Component, ViewEncapsulation} from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import User from '../../Utitlity/User';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {FormsModule} from "@angular/forms";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import GameManager from "../../Utitlity/GameManager";
import {MatButton} from "@angular/material/button";
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from "@angular/material/sidenav";
import {MatIcon} from "@angular/material/icon";
import {MatListItem, MatNavList} from "@angular/material/list";
import {BetpageComponent} from "../betpage/betpage.component";

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

  constructor(private myHttpclient: HttpClient){}

  fetchActiveUsers(): Observable<User> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*' // Allow all origins, you can customize this
    });
    return this.myHttpclient.get<User>('http://localhost:8080/Pferderennen/Game/ActiveUsers', { headers });
  }

  profileClicked():void{
      this.fetchActiveUsers().subscribe(
        (users: User) => {
          alert('Active users: ' + JSON.stringify(users));
        },
        (error: any) => {
          console.error('Error fetching active users:', error);
          alert('Error fetching active users. Please try again later.');
        }
      );
      console.log(GameManager.GetInstance().GetUser());
    }
}
