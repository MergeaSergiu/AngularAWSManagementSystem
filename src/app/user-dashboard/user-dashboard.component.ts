import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RegistrationService } from '../services/registration.service';
import { S3BucketService } from '../services/s3-bucket.service';
import { CloudFrontService } from '../services/cloud-front.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent implements OnInit {

  isDragging: boolean = false;

  bucketList: string[] = [];
  message: string = '';
  showToast: boolean = false;

  constructor(private s3BucketService: S3BucketService, private cloudFrontService: CloudFrontService) { }
  ngOnInit(): void {
    this.getBucketList();
  }

  deleteBucket(bucketName: string) {
    this.s3BucketService.deleteBucket(bucketName).subscribe({
      next: (response) => {
        this.message = response.message;
        this.showToast = true;
        setTimeout(() => {
          this.showToast = false;  // Hide the toast after 3 seconds
        }, 3000);
        this.getBucketList();
      },
      error: (error) => {
        this.message = error;
        this.showToast = true;
        setTimeout(() => {
          this.showToast = false;  // Hide the toast after 3 seconds
        }, 3000);
      }
    })
  }

  getBucketList() {
    this.s3BucketService.getBucketList().subscribe({
      next: (response: string[]) => {
        this.bucketList = response;
      },
      error: () => { }
    })
  }

  createBucket(bucketName: string) {
    this.s3BucketService.createBucket(bucketName).subscribe({
      next: (response) => {
        this.message = response.message;
        this.showToast = true;

        setTimeout(() => {
          this.showToast = false;  // Hide the toast after 3 seconds
        }, 3000);
        this.getBucketList();
      },
      error: (error) => {
        this.message = error;
        this.showToast = true;
        setTimeout(() => {
          this.showToast = false;  // Hide the toast after 3 seconds
        }, 3000);
      }
    })
  }

  onFileSelected(event: Event, bucketName: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.uploadApplication(file, bucketName);
    }
  }

  onDragLeave(event: DragEvent): void {
    this.isDragging = false;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onFileDropped(event: DragEvent, bucketName: string) {
    event.preventDefault();
    this.isDragging = false;
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      this.uploadApplication(file, bucketName);
    }
  }

  uploadApplication(file: File, bucketName: string): void {
    if (file.type !== 'application/zip' && !file.name.endsWith('.zip')) {
      this.message = "Only .zip files are allowed";
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
      }, 3000);
      return;
    }
    this.message = "The process will take several minutes.";
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 4000);
    this.cloudFrontService.uploadDirectory(file, bucketName).subscribe({
      next: (response) => {
        this.message = response;
        this.showToast = true;
        setTimeout(() => {
          this.showToast = false;
        }, 3000);
      }, error: (error) => {
        this.message = error;
        setTimeout(() => {
          this.showToast = false;
        }, 3000);
      }
    })

  }
}
