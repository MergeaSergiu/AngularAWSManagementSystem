import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RegistrationService } from '../services/registration.service';
import { S3BucketService } from '../services/s3-bucket.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent implements OnInit {


  bucketList: string[] = [];
  message: string = '';

  constructor(private cdr: ChangeDetectorRef, private s3BucketService: S3BucketService){}
  ngOnInit(): void {
  this.getBucketList();
}

deleteBucket(bucketName: string) {
  this.s3BucketService.deleteBucket(bucketName).subscribe({
        next: () =>{
          this.message = "The bucket is deleting. It may take a few moments";
          setTimeout(() => {
            this.message = '';
            this.cdr.detectChanges();
        }, 3000);
        this.getBucketList();
    }, 
    error: (error) => {
      this.message = error;
      setTimeout(() => {
        this.message = '';
        this.cdr.detectChanges();
    }, 3000);
    }
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

  



    

}
