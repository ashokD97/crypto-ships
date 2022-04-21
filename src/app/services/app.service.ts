import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import {URLS} from '../constants/url.constant';
@Injectable({
  providedIn: 'root'
})
export class AppService {
  private _userData: any;
  invokeRecheck = new BehaviorSubject(true);
  recheckData = (this.invokeRecheck).asObservable();
  constructor(private http:HttpClient) { }

  userData(): any {
      return this._userData;
  }

  setUserData(data: any) {
      this._userData = data;
  }
  getUserData(){
    return this.http.get(this.URL(URLS.getData))
  }
  getUserShips(){
    return this.http.get(this.URL(URLS.getShips))
  }
  getRewards(){
    return this.http.get(this.URL(URLS.getRewards))
  }
  addShip(data:any){
    return this.http.post(this.URL(URLS.addShip),data);
  }
  addRewards(data:any){
    return this.http.post(this.URL(URLS.addRewards),data);
  }
  claimRewards(data:any){
    return this.http.post(this.URL(URLS.claimRewards),data);
  }
  addRum(data:any){
    return this.http.post(this.URL(URLS.addRum),data);
  }
  getUserListings(){
    return this.http.get(this.URL(URLS.userListings))
  }
  cancelListing(data:any){
    return this.http.post(this.URL(URLS.cancelListing),data);
  }
  sellShip(data:any){
    return this.http.post(this.URL(URLS.sellShip),data);
  }
  getShipPrice(){
    return this.http.get(this.URL(URLS.getShipPrice))
  }
  private URL(u:string){
     return environment.baseUrl + u;
  }
}
