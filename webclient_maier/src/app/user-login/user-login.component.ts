import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MyhttpclientService } from "../myhttpclient.service";
import GameManager from "../../Utitlity/GameManager";
import {LoggerService} from "../logger.service";
import {delay} from "rxjs";
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
              private activeRoute: ActivatedRoute,
              private logger: LoggerService,) {}


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


    /*
    this.myHttpclient.log_in(curUsername, curPassword).then((async (successfull: boolean): Promise<boolean> => {

        delay(1000);

        if(!successfull){
          this.logger.error("Could not log in!");
        }



        this.myHttpclient.init().then(async (successfull: boolean): Promise<boolean> => {

          if(!successfull){
            this.logger.error("could not init()!");
            return false;
          }

          await this.router.navigate(['/']);


          return true;
        })

        return true;
      })
    );
     */


    let user: User|null = await this.myHttpclient.login(curUsername, curPassword);

    if(user == null){
      this.logger.error("User couldn't been resolved!");
      return;
    }


    let gameState: BetLocation|null = await this.myHttpclient.init();

    if(gameState == null){
      this.logger.error("BetLocation couldn't been resolved!");
      return;
    }


    await this.router.navigate(["/"]);
  }

}
