import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CloudFrontService } from '../services/cloud-front.service';
import { DistributionData } from '../models/distribution-data.model';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-cloud-front-component',
  templateUrl: './cloud-front-component.component.html',
  styleUrl: './cloud-front-component.component.css'
})
export class CloudFrontComponentComponent implements OnInit{

  message: string = '';
  cloudFrontDistributions: DistributionData[] = [];
  constructor(private cloudFrontService: CloudFrontService, private cdr: ChangeDetectorRef, private registrationService: RegistrationService) {}

  ngOnInit(): void {
    this.getDistributionList();
  }

  getDistributionList(){
    this.cloudFrontService.getDistributions().subscribe({
      next: (response: DistributionData[]) => {
        this.cloudFrontDistributions = response; 
      }, 
      error : () => {} 
    })
  }

  deleteDistribution(identifier: string) {
    this.cloudFrontService.deleteDistribution(identifier).subscribe({
      next: () => {
        this.message = "Disitribution is deleting. It will take a few minutes";
        this.getDistributionList();
        setTimeout(() => {
          this.message = '';
          this.cdr.detectChanges();
      }, 3000);
      },
      error: () => {}
    })
  }

  toggleDistribution(identifier: string, command: boolean) {
      this.cloudFrontService.updateDistributionStatus(identifier, command).subscribe({
        next : () => {
          this.message = "The Application is updating its status. It may take a few minutes."
          setTimeout(() => {
            this.message = '';
            this.cdr.detectChanges();
        }, 3000);
          this.getDistributionList();
        }, error: (error) => {
          this.message = error;
          setTimeout(() => {
            this.message = '';
            this.cdr.detectChanges();
        }, 3000);
        }
      });
  }

  
  logout() {
    this.registrationService.logedOut();
    }


}
