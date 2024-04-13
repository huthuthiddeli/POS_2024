import { NgModel } from "@angular/forms";
import { Routes, RouterModule} from '@angular/router';
import { UserLoginComponent } from "./user-login.component";
import { NgModule } from "@angular/core";


//https://www.youtube.com/watch?v=3m_oKTFWIfM&ab_channel=ThumbIKR-ProgrammingExamples

const routes : Routes = [
    {path: 'Login', component: UserLoginComponent}
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}