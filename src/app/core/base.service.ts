import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export abstract class BaseService {

  protected SetHeaderJson() {

    let token = localStorage.getItem("token");
    let header = {
      "Authorization": "",
      "Content-Type": "application/json",
    };
    if(token){
      header.Authorization = `UDSLongToken ${token}`;
    }
    return {
      headers: new HttpHeaders(header)
    };
  }

  protected handleError(response: Response | any) {
    let customError: string[] = [];

    if (response instanceof HttpErrorResponse) {
      if (response.statusText === "Unknown Error") {
        customError.push("Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.");
        response.error.errors = customError;
      }
    }
    return throwError(response);
  }
}

