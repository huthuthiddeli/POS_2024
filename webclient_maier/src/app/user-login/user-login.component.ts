import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: '[app-user-login]:not(p)',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css',
  encapsulation: ViewEncapsulation.ShadowDom
})


export class UserLoginComponent {
    username: any;
    password: any;

    constructor() {}

    login(){
      console.log("helo")
    }


    OnLoginClick(): void{
      console.log(this.username)
      console.log(this.password)
    }
}
