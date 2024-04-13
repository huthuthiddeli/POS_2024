import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HeaderComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  encapsulation: ViewEncapsulation.Emulated
})
export class AppComponent {

  constructor(private myHttpclient: HttpClient){}
  
  moduleName: any;

  posts: any;

  buttonClicked():void{

    console.log("LKADJÖALKSJDlJ")

    this.moduleName = "user-component";
    //console.log(this.myHttpclient.get("localhost:8080/Pferderennen/Game/ActiveUsers"));
  }
}
