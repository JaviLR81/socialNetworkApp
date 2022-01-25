import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
  }


  login(userName: string, password: string): Observable<boolean>{

    if(userName == 'Javier' && password == '123456'){
      return of(true);
    }

    return  of(false);
  }

}
