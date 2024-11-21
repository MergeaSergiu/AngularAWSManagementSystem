import { ChangeDetectorRef, Component } from '@angular/core';
import { RegistrationService } from '../services/registration.service';
import { NgForm } from '@angular/forms';
import { LoginRequest } from '../models/login-data.model';
import { LoginResponse } from '../models/login-data-response.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  message: string = '';
  showToast: boolean = false;

  constructor(private registrationService: RegistrationService, private cdr: ChangeDetectorRef, private router: Router) { }
  
  ngOnInit(): void {}

  onSubmitLogIn(form:NgForm): void {
      const logIn: LoginRequest = {
        username: form.value.email,
        password: form.value.password
      };
      this.registrationService.logIn(logIn).subscribe({
        next:  (response: LoginResponse) => {
          this.registrationService.setToken(response.access_JWT);
          this.registrationService.setRefreshToken(response.refresh_JWT);
          this.registrationService.setUserRole(response.role);
          this.router.navigate(['userDashborad']);
        },  error: (error) => {
          this.message = error;
          this.showToast = true;
          setTimeout(() => {
            this.showToast = false;  // Hide the toast after 3 seconds
          }, 3000);
            // Show the toast message
      }
    });

    form.reset();
  }


}
