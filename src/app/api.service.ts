import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

let API_URL=environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getData(endPoint:string){ 
   return this.http.get(API_URL+endPoint);
   }

   getDataByParamater(endPoint:string,parameter:string){
     let param1= new HttpParams().set('State',parameter);
    return this.http.get(API_URL+endPoint,{params:param1});
   }

}
