import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { shuffle } from "lodash";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  positionColor:any = {
    1:'bg-danger',
    2:'bg-warning',
    3:'bg-primary',
    4:'bg-success',
    5:'bg-info',
  };
  positionName:any ={
    1:'1 st',
    2:'2 nd',
    3:'3 rd',
    4:'4 th',
    5:'5 th'
  };
  position:any = "";
  ships: any = [
    {
      name: "ship1",
      model: "s111"
    }, {
      name: "ship2",
      model: "s222"
    }, {
      name: "ship3",
      model: "s333"
    }
  ];
  racers: any = [
    {id:1, drift: 1, power: 2, speed: 3 },
    {id:2, drift: 2, power: 2, speed: 3 },
    {id:3, drift: 4, power: 2, speed: 3 },
    {id:4, drift: 1, power: 3, speed: 3 },
    {id:5, drift: 3, power: 2, speed: 1 }
  ]
  progress: number = 0;
  modalRef?: BsModalRef;
  constructor(private modalService: BsModalService) { }


  ngOnInit(): void {
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      backdrop: 'static',
      keyboard: false
    });
    this.updateProgress();
  }
  updateProgress() {
    let x = setInterval(() => {
      this.racers = shuffle(this.racers);
      this.racers.forEach((element:any,index:number) => {
        if(element.id == 1){
          this.position = this.positionName[index+1];
        }
      });
      this.progress += 20;
      if (this.progress >= 100) {
        clearInterval(x);
      }
    }, 1000);
  }
  

  transform(index: number) {
    return `translateY(${(index + 1) * 100}%)`;
  }

  trackBy(index:any, x:any) {
    return x;
  }
}
