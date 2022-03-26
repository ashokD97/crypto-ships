import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {URLS} from '../constants/url.constant';
@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http:HttpClient) { }

  getUserData(){
    return this.http.get(this.URL(URLS.getData))
  }
  getUserShips(){
    return this.http.get(this.URL(URLS.getShips))
  }
  getRewards(){
    return this.http.get(this.URL(URLS.getRewards))
  }
  private URL(u:string){
     return environment.baseUrl + u;
  }
}
