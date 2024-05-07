import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {MyhttpclientService} from "../myhttpclient.service";
import GameManager from "../../Utitlity/GameManager";
import User from "../../Utitlity/User";

@Component({
  selector: 'app-sing-up',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './sing-up.component.html',
  styleUrl: './sing-up.component.css'
})
export class SingUpComponent {
  protected usernameinput: string = '';
  protected passwordinput: string = '';

  constructor(private myHttpclient: MyhttpclientService, private router:Router){}



  async OnSignUp(): Promise<void> {


    const user: User|null = await this.myHttpclient.sign_up(this.usernameinput, this.passwordinput);



    if(GameManager.GetInstance().user !== undefined){
      await this.myHttpclient.init();
    }

    if(GameManager.GetInstance().gamelocation !== undefined){
      this.router.navigate(['/'])
    }

  }
}
