import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CloudFrontService } from '../services/cloud-front.service';
import { DistributionData } from '../models/distribution-data.model';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-cloud-front-component',
  templateUrl: './cloud-front-component.component.html',
  styleUrl: './cloud-front-component.component.css'
})
export class CloudFrontComponentComponent implements OnInit {

  message: string = '';
  cloudFrontDistributions: DistributionData[] = [];
  showToast: boolean = false;
  constructor(private cloudFrontService: CloudFrontService, private cdr: ChangeDetectorRef, private registrationService: RegistrationService) { }

  ngOnInit(): void {
    this.getDistributionList();
  }

  getDistributionList() {
    this.cloudFrontService.getDistributions().subscribe({
      next: (response: DistributionData[]) => {
        this.cloudFrontDistributions = response;
      },
      error: () => { }
    })
  }

  deleteDistribution(identifier: string) {

    this.message = "Disitribution is deleting. It will take a few minutes";
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;  // Hide the toast after 3 seconds
    }, 3000);

    this.cloudFrontService.deleteDistribution(identifier).subscribe({
      next: () => {
        this.getDistributionList();
      },
      error: (error) => {
        this.message = error;
        this.showToast = true;
        this.getDistributionList();
        setTimeout(() => {
          this.showToast = false;  // Hide the toast after 3 seconds
        }, 3000);
      }
    })
  }

  toggleDistribution(identifier: string, command: boolean) {
    this.cloudFrontService.updateDistributionStatus(identifier, command).subscribe({
      next: (response) => {
        this.message = response;
        this.showToast = true;
        this.getDistributionList();
        setTimeout(() => {
          this.showToast = false;  // Hide the toast after 3 seconds
        }, 3000);

      }, error: (error) => {
        this.message = error;
        this.showToast = true;
        setTimeout(() => {
          this.showToast = false;  // Hide the toast after 3 seconds
        }, 3000);
      }
    });
  }


  logout() {
    this.registrationService.logedOut();
  }


}
