import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
  })
export class S3BucketService{

    constructor(private httpClient: HttpClient){}

    API_PATH = "http://localhost:8080/api/aws/s3";

    public getBucketList(): Observable<string[]> {
        return this.httpClient.get<string[]>(this.API_PATH + "/buckets");
    }

    public deleteBucket(bucket: string){
      const params = new HttpParams().set('bucketName', bucket);
      return this.httpClient.delete(this.API_PATH + "/buckets", { params });
    }
    

}