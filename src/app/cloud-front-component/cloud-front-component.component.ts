import { Component, OnInit } from '@angular/core';
import { CloudFrontService } from '../services/cloud-front.service';
import { DistributionData } from '../models/distribution-data.model';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-cloud-front-component',
  templateUrl: './cloud-front-component.component.html',
  styleUrl: './cloud-front-component.component.css'
})
export class CloudFrontComponentComponent implements OnInit{

  cloudFrontDistributions: DistributionData[] = [];
  constructor(private cloudFrontService: CloudFrontService, private registrationService: RegistrationService) {}

  ngOnInit(): void {
    this.getDistributionList();
  }

  getDistributionList(){
    this.cloudFrontService.getDistributions().subscribe({
      next: (response: DistributionData[]) => {
        this.cloudFrontDistributions = response; 
      }, 
      error : (error) => {} 
    })
  }

  
  logout() {
    this.registrationService.logedOut();
    }


}
