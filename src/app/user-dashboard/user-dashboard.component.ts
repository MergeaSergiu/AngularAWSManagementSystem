import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../services/registration.service';
import { S3BucketService } from '../services/s3-bucket.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent implements OnInit {


  bucketList: string[] = [];

  constructor(private registrationService: RegistrationService, private s3BucketService: S3BucketService){}
  ngOnInit(): void {
  this.getBucketList();
}

deleteBucket(bucketName: string) {
  this.s3BucketService.deleteBucket(bucketName).subscribe({
        next: () =>{
        this.getBucketList();
    }, 
    error: () => {}
  })
}

getBucketList(){
    this.s3BucketService.getBucketList().subscribe({
      next: (response: string[]) => {
        this.bucketList = response; 
      }, 
      error : (error) => {} 
    })
  }

  

  logout() {
    this.registrationService.logedOut();
    }

    

}
