import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HorseBodyComponent } from './horse-body/horse-body.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {provideHttpClient} from "@angular/common/http";


export const routeArray: Routes = [
  {path: 'header-component', component: HeaderComponent},
  {path: 'horse-body', component: HorseBodyComponent},

]


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), provideHttpClient()]
};
