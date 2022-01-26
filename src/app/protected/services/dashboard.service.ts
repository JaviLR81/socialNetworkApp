import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { SimilarState } from '../interfaces/similar-state.interface';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private base_JSON_PLACE_HOLDER_URL = 'https://jsonplaceholder.typicode.com/albums';
  private base_JSON_PLACE_HOLDER_ERROR_URL = 'https://jsonplaceholder.typicode.com/albums/10000';

  lastSearchFromHeader = 'Hola mundo';

  constructor(private http: HttpClient) { }

  // Another form to work with httpParams
  get httpParamsExample () {
    // const params = new Httpparams
    return new HttpParams().set( 'fields', 'name,capital,alpha2Code,flag,population' );
  }

  getSimilarStates(): Observable<SimilarState[]>{

    const url = this.base_JSON_PLACE_HOLDER_URL;

    // Fake use of http params
    const params = new HttpParams()
      .set('limit','10');

    return this.http.get<SimilarState[]>(url,{params})
        .pipe(
          map( resp => {
            return resp.splice(0,10);
          })
        );
  }

  saveState(similarState: SimilarState): Observable<SimilarState>{

    // Fake use of http headers
    const headers = new HttpHeaders()
      .set('x-token', 'Some Random header' );

    const url = this.base_JSON_PLACE_HOLDER_URL;

    return this.http.post<SimilarState>(url,similarState,{ headers })
        .pipe(
          map( resp => {
            return resp;
          })
        );
  }


}
