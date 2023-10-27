import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable, catchError, map, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService extends BaseService {

  constructor(private http: HttpClient) { 
    super()
  }

  get<T>(url: string): Observable<any> {
    return this.http
      .get<T>(url)
      .pipe(
        take(1)
      )
      .pipe(
        catchError((error) => {
          if (error.status == 401) {
            //this.router.navigate(['/login']);
          }
          return this.handleError(error);
        })
      );
  }

  post(url: string, data: any): Observable<any> {
    return this.http
      .post<any>(url, data)
      .pipe(
        take(1)
      )
      .pipe(
        catchError((error) => {
          if (error.status == 401) {
            //this.router.navigate(['/login']);
          }
          return this.handleError(error);
        })
      );
  }

  put(url: string, data: any): Observable<any> {
    return this.http
      .put<any>(url, data)
      .pipe(
        take(1)
      )
      .pipe(
        catchError((error) => {
          if (error.status == 401) {
            //this.router.navigate(['/login']);
          }
          return this.handleError(error);
        })
      );
  }

  delete(url: string): Observable<any> {
    return this.http
      .delete<any>(url)
      .pipe(
        take(1)
      )
      .pipe(
        catchError((error) => {
          if (error.status == 401) {
            //this.router.navigate(['/login']);
          }
          return this.handleError(error);
        })
      );
  }
}
