import { Component } from '@angular/core';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {

  constructor(private registrationService: RegistrationService){}


  logout() {
    this.registrationService.logedOut();
    }

}
