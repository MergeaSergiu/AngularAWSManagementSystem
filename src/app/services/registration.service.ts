import { HttpClient,  HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { RegistrationRequest } from "../models/registration-data.model";
import { LoginRequest } from "../models/login-data.model";

@Injectable({
    providedIn: 'root'
  })
export class RegistrationService{

  API_PATH = "http://localhost:8080/api/aws/auth";
  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });

  constructor(private httpClient: HttpClient) {}

   public singUp(registrationRequest: RegistrationRequest): Observable<any>{
    return this.httpClient.post(this.API_PATH + "/register", registrationRequest, {headers: this.requestHeader});
   }

   public logIn(loginRequest: LoginRequest): Observable<any> {
    return this.httpClient.post(this.API_PATH + "/login", loginRequest, {headers: this.requestHeader});
   }

   public setToken(token: string) {
    localStorage.setItem('access_JWT', token);
   }

   public setRefreshToken(token: string) {
    localStorage.setItem('refresh_JWT', token);
   }
   
   

}