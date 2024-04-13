import { Observable } from 'rxjs';
import User from '../Utitlity/User';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { InjectorInstance } from './Injector';

export default class MyHttpClient{

    async GetAllUsers(): Promise<User[] | null>{
        
        //let localCollection: any = HttpClient.get('localhost:8080/Pferderennen/Game/GetActiveUsers');
        

    
        return null;
    }








}