import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MyhttpclientService } from "../myhttpclient.service";
import GameManager from "../../Utitlity/GameManager";
import User from "../../Utitlity/User";
import BetLocation from "../../Utitlity/BetLocation";

@Component({
  selector: '[app-user-login]:not(p)',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css',
  encapsulation: ViewEncapsulation.ShadowDom
})


export class UserLoginComponent {
  protected username: string = '';
  protected password: string = '';
  protected textBoxMessage: string = '';

  constructor(private myHttpclient: MyhttpclientService,
              private router: Router,
              private activeRoute: ActivatedRoute) {}


    ngOnInit(){
      this.activeRoute.queryParams.subscribe((params) => {
        let code = params['redirectcode']

        switch(code){
          case "-2":
            this.textBoxMessage = "No user Account found. Log in!";
            break;
        }
      })
    }

  async OnLoginClick(): Promise<void> {
    let curPassword = "testpassword";
    let curUsername: string = "test";


    let user: User|null;

    if(this.username !== '' && this.password !== ''){
      user = await this.myHttpclient.login(this.username, this.password);
    }else{
      user = await this.myHttpclient.login(curUsername, curPassword);
    }

    if(user == null){
      console.error("User couldn't been resolved!");
      return;
    }


    let gameState: BetLocation|null = await this.myHttpclient.init();

    if(gameState == null){
      console.error("BetLocation couldn't been resolved!");
      return;
    }

    console.log(GameManager.GetInstance().user.printDetails());
    await this.router.navigate(["/"]);
  }

}
