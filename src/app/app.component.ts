import { AppService } from './services/app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  user:any = {};
  title = 'demo';
  constructor(private appService:AppService){}
  ngOnInit(): void {
    this.setData();
  }
  getData(){
    this.appService.getUserData().subscribe(res=>{
      this.user = res;
      this.appService.setUserData(res);
    });
  }
  setData(){
    this.appService.recheckData.subscribe(res=>{
      this.getData();
    })
  }
}
