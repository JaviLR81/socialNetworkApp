import { HttpClient, HttpParams } from '@angular/common/http';
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

  constructor(private http: HttpClient) { }

  getSimilarStates(): Observable<SimilarState[]>{

    const url = this.base_JSON_PLACE_HOLDER_URL;
    // const url = this.base_JSON_PLACE_HOLDER_ERROR_URL;

    return this.http.get<SimilarState[]>(url)
        .pipe(
          map( resp => {
            return resp.splice(0,10);
          }),
          // catchError( err => {
          //   return of(err);
          // })
        );
  }


}
