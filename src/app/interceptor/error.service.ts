import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { RegistrationService } from '../services/registration.service';
import { Router } from '@angular/router';
import { JwtRefreshToken } from '../models/jwt-refresh-data.model';

@Injectable({
  providedIn: 'root'
})
export class ErrorService implements HttpInterceptor{

  constructor(private registrationService: RegistrationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.get('No-Auth') === 'True') {
        return next.handle(req.clone());
    }

    if (this.registrationService.getToken()) {
        req = this.addToken(req, this.registrationService.getToken());
    }

      const refreshToken: JwtRefreshToken  = {
        refresh_JWT:  this.registrationService.getRefreshToken()
      } 


    return next.handle(req).pipe(
        catchError((error: any) => {
            if (error.status === 401) {
                return this.registrationService.refresh_Token(refreshToken).pipe(
                    switchMap((res: any) => {
                        this.registrationService.setToken(res.access_JWT);
                        req = this.addToken(req, res.access_JWT);
                        return next.handle(req);
                    }),
                    catchError((error: any) => {
                        this.registrationService.logedOut();
                        return throwError(() => (error.error.errorMessage));
                    })
                );
            } else {
                return throwError(() => (error.error.errorMessage));
            }
        })
    );
}

private addToken(request: HttpRequest<any>, access_token: string | null ) {
    return request.clone(
        {
            setHeaders: {
                'Authorization': `Bearer ${access_token}`
            }
        }
    );
}
}
