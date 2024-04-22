import { Routes } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';
import {SingUpComponent} from "./sing-up/sing-up.component";




export const routes: Routes = [
    {path: 'login', component: UserLoginComponent},
  {path: 'sign-up', component: SingUpComponent}
];
