import { Routes } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';
import {SingUpComponent} from "./sing-up/sing-up.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {HorseBodyComponent} from "./horse-body/horse-body.component";
import {BetpageComponent} from "./betpage/betpage.component";
import {WinnerComponent} from "./winner/winner.component";




export const routes: Routes = [
  {path: '', component: HorseBodyComponent},
  {path: 'login', component: UserLoginComponent},
  {path: 'sign-up', component: SingUpComponent},
  {path: 'betpage', component: BetpageComponent},
  {path: 'winner', component: WinnerComponent},
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'},
];
