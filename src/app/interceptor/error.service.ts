import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { RegistrationService } from '../services/registration.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorService implements HttpInterceptor{

  constructor(private registrationService: RegistrationService, private router: Router) { }

  private addToken(request: HttpRequest<any>, access_token: string | null ) {
    return request.clone(
        {
            setHeaders: {
                'Authorization': `Bearer ${access_token}`
            }
        }
    );
}


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.registrationService.getToken()) {
        req = this.addToken(req, this.registrationService.getToken());
    }


    return next.handle(req).pipe(
      catchError((error: any) => {
        return throwError(() => (error.error.errorMessage));
      })
    );

  }
}
