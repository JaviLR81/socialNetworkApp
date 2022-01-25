import { Injectable } from '@angular/core';
import { Observable, of, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
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
      return of(true);
    }

    return of(false);
  }

}
