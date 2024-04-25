import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserLoginComponent } from './user-login/user-login.component';
import { HorseBodyComponent } from './horse-body/horse-body.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, RouterLinkActive,
    HeaderComponent, HttpClientModule, UserLoginComponent, HorseBodyComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AppComponent {

  constructor(private myHttpclient: HttpClient, private router: Router) {

  }


}
