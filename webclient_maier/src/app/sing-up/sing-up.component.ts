import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {PasswordHasher} from "../../Lib/PasswordHasher";
import User from "../../Utitlity/User";
import {Router} from "@angular/router";
import GameManager from "../../Utitlity/GameManager";

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

  constructor(private myHttpclient: HttpClient, private router:Router){}


  async OnSignUp(): Promise<void>{

    const headers:HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*' // Allow all origins, you can customize this
    });

    let hashedPassword: string = await PasswordHasher.hashPassword(this.passwordinput).then((content) => {return content});

    let obj: User = new User(this.usernameinput, 0, hashedPassword);

    let json: string = JSON.stringify(obj);

    console.log(json);

    this.myHttpclient.post<User>('http://localhost:8080/User/Create', json, {headers}).subscribe(
      (response) => {
        console.log(response);

        if(response != null){
          GameManager.GetInstance().SetUser(response);
          this.router.navigate(['/']);
        }
      }
    );



  }

}
