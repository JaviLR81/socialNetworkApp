import { Injectable } from '@angular/core';
import { Observable, of, pipe } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
  }

  private _user!: User;

  get user(){
    return {...this._user};
  }


  login(userName: string, password: string): Observable<boolean>{

    if(userName == 'Javier' && password == '123456'){
      // Saving token in the local storage
      localStorage.setItem('token', '1234567890');

      return of(true);
    }

    return  of(false);
  }

  logout(){
    localStorage.clear();
  }


  verificaToken(): Observable<boolean>{
    if(localStorage.getItem('token')){
      this._user = {
        name: 'Javier',
        age: 25,
        email: 'javierlzrd@gmail.com'
      };
      return of(true);
    }

    return of(false);
  }

}
