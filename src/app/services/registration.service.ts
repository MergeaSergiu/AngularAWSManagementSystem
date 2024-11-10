import { HttpClient,  HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RegistrationRequest } from "../models/registration-data.model";
import { LoginRequest } from "../models/login-data.model";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
  })
export class RegistrationService{

  API_PATH = "http://localhost:8080/api/aws/auth";
  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });

  constructor(private httpClient: HttpClient, private router: Router) {}

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

   public setUserRole(role: string){
    localStorage.setItem('role', role); 
   }

   public getUserRole(): string | null {
    return localStorage.getItem('role'); 
   }

   public getToken(): string | null{
    return localStorage.getItem('access_JWT');
   }

   public isLogedIn(){
      return !!localStorage.getItem('access_JWT') &&  !!localStorage.getItem('refresh_JWT')  && !!localStorage.getItem('role');
   }

   public logedOut(){
      localStorage.removeItem('access_JWT');
      localStorage.removeItem('refresh_JWT');
      localStorage.removeItem('role');
      this.router.navigate(['login']);
   }
   
   

}