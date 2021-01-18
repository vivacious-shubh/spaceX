import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class ApiService {

  private spaceXdata = 'https://api.spaceXdata.com/v3/launches?limit=100';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient) { }

  /** GET spaceX data from the server */
  getSpaceXdata(year, launch, land): Observable<any> {
    let url = this.spaceXdata;
    if(year) {
        url = url + `&launch_year=${year}`;
    }
    if(launch) {
        url = url + `&launch_success=${launch.toLowerCase()}`;
    }
    if(land) {
        url = url + `&land_success=${land.toLowerCase()}`;
    }
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError<any>('spaceXdata', []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}