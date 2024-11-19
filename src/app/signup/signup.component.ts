import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RegistrationService } from '../services/registration.service';
import { RegistrationRequest } from '../models/registration-data.model';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{

  message: string = '';
  showToast: boolean = false;

  constructor(private registrationService: RegistrationService, private cdr: ChangeDetectorRef) { }
  
  ngOnInit(): void {}

  onSubmitSignUp(form:NgForm): void {
      const register: RegistrationRequest = {
        username: form.value.email,
        password: form.value.password,
      };
      this.registrationService.singUp(register).subscribe({
        next:  (response) => {
          this.message = response.registrationResponse;
          this.showToast = true;
          setTimeout(() => {
            this.showToast = false;  // Hide the toast after 3 seconds
          }, 3000);
        },  error: (error) => {
          this.message = error;
          this.showToast = true;
          setTimeout(() => {
            this.showToast = false;  // Hide the toast after 3 seconds
          }, 3000);
        }
    });

    form.reset();
  }

}
