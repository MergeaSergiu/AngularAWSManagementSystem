import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DistributionData } from "../models/distribution-data.model";
import { Observable } from "rxjs";




@Injectable({
    providedIn: 'root'
  })
export class CloudFrontService{


    constructor(private httpClient: HttpClient){}

    API_PATH = "http://localhost:8080/api/aws/cloudFront";

    public getDistributions(): Observable<DistributionData[]> {
        return this.httpClient.get<DistributionData[]>(this.API_PATH + "/distributions");
    }

    public deleteDistribution(distributionIdentifier: string){
        const params = new HttpParams().set('distributionIdentifier', distributionIdentifier);
        return this.httpClient.delete(this.API_PATH + "/distributions", {params});
    }

    public updateDistributionStatus(distributionIdentifier: string, command: boolean): Observable<string>{
        const params = new HttpParams().set('distributionIdentifier', distributionIdentifier).set('command', command);
        return this.httpClient.post<string>(this.API_PATH + "/distributions", null, {params});
    }


}