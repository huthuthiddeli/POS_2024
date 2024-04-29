import { CommonModule } from '@angular/common';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {Component, ViewEncapsulation} from '@angular/core';
import {FormsModule} from "@angular/forms";
import User from "../../Utitlity/User";
import {PasswordHasher} from "../../Lib/PasswordHasher";
import {ActivatedRoute, Router} from "@angular/router";
import GameManager from "../../Utitlity/GameManager";
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

  constructor(private myHttpclient: HttpClient, private router: Router, private activeRoute: ActivatedRoute) {}


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

      const headers:HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' // Allow all origins, you can customize this
      });

      let passwordHashed: string = "";
      //PasswordHasher.hashPassword(this.password).then((content) => passwordHashed = content);

      //let obj : User = new User(this.username, 0, passwordHashed);
      let password = await PasswordHasher.hashPassword("testpassword").then((localPassword) => {return localPassword});

      let obj: User = new User("test", 0, password);

      let json: string = JSON.stringify(obj);

      this.myHttpclient.post<User>('http://localhost:8080/User/Login', json, {headers}).subscribe(
        async(response: User) => {

          if(response == undefined){
            console.log("Didn't receive User object!")
            return;
          }

          let actualUser: User = new User(response['_username'], response['_money'], response['_passwordHashed']);

          GameManager.GetInstance().user = actualUser;

          console.log(GameManager.GetInstance().user.printDetails());

          json = JSON.stringify(GameManager.GetInstance().user);

          this.myHttpclient.post<BetLocation>('http://localhost:8080/Pferderennen/Game/innit', json, {headers}).subscribe(
            async (responeBetlocation: BetLocation) => {

              let actualObject: BetLocation = new BetLocation(
                responeBetlocation.location,
                responeBetlocation.horses,
                responeBetlocation.trackLength,
                responeBetlocation.gameFinished,
                responeBetlocation.winner,
                responeBetlocation.gameStarted
              );

              GameManager.GetInstance().gamelocation = actualObject;
              await this.router.navigate(['/'])
            }
          )
        }
      );



    }
}
