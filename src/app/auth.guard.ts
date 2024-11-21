import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { RegistrationService } from './services/registration.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {

  const registrationService = inject(RegistrationService);
  const router = inject(Router);

  const expectedRole = route.data['role'];
  if (registrationService.isLogedIn() && expectedRole == registrationService.getUserRole()) {
    return true;
  } else {
    router.navigate(['/login']);
    registrationService.logedOut();
    return false;
  }
};
