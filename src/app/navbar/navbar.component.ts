import { Component } from '@angular/core';
import { RegistrationService } from '../services/registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private registrationService: RegistrationService, private router: Router) { }

  logout() {
    this.registrationService.logedOut();
  }

  goToAppsDeployment() {
    this.router.navigate(['/distributions']);
  }
  goToBucketsDashboard() {
    this.router.navigate(['/userDashborad']);
  }
  goHome() {
    this.router.navigate([''])
  }



}
