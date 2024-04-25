import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import GameManager from "../../Utitlity/GameManager";
import {Router, RouterLink} from "@angular/router";
import {RedirectCodes} from "../../Lib/Redirect";

@Component({
  selector: '[app-horse-body]',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink],
  templateUrl: './horse-body.component.html',
  styleUrl: './horse-body.component.css',
  encapsulation: ViewEncapsulation.ShadowDom
})
export class HorseBodyComponent {

  constructor(private router: Router){}

  ngOnInit(): void{
    console.log("User state in Gamemanager: " + GameManager.GetInstance().GetUser());

    //Redirect to Login page if not logged in and Gamelocation is null
    if(GameManager.GetInstance().GetUser() == undefined && GameManager.GetInstance().GetGameLocation() == undefined){
      this.router.navigate(['login'], {queryParams: {"redirectcode": RedirectCodes["Login failed"]}});
    }
  }

  SideBarPressed(): void {





  }

}
