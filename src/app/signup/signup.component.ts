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

  constructor(private registrationService: RegistrationService, private cdr: ChangeDetectorRef) { }
  
  ngOnInit(): void {}

  onSubmitSignUp(form:NgForm): void {
      const register: RegistrationRequest = {
        username: form.value.email,
        password: form.value.password,
        phoneNumber: form.value.phoneNumber
      };
      this.registrationService.singUp(register).subscribe({
        next:  (response) => {
          this.message = response.registrationResponse;
          setTimeout(() => {
            this.message = '';
            this.cdr.detectChanges();
        }, 3000);
        },  error: (error) => {
          this.message = error;
          setTimeout(() => {
            this.message = '';
            this.cdr.detectChanges();
        }, 3000);
        }
    });

    form.reset();
  }

}
