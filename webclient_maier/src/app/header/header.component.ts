import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import MyHttpClient from '../../Lib/MyHttpClient';


@Component({
  selector: '[app-header]:not(p)',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  encapsulation: ViewEncapsulation.Emulated
})
export class HeaderComponent {

  constructor(private router : Router){}

  client : MyHttpClient = new MyHttpClient();

  profileClicked(path : string):void{


    //this.router.navigate([`${path}`]);

    


  }


}
