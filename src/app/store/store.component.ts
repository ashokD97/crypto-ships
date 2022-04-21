import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
 
  modalRef?: BsModalRef;

  shipsBuy: any = [
    {
      name: "ship1",
      model: "s111",
      stats: {
        speed: 7,
        stiffness: 5,
        propulsion: 6,
        strength: 8,
        planking: 5,
        size: 4
      }
    },
  ];
 
  shipStats: any = {
    1: {
      speed: this.getRandomInt(20, 30),
      maneuvering: this.getRandomInt(30, 40),
      efficiency: this.getRandomInt(20, 25),
      rum: 4,
      level: 1,
      exp: 0
    },
    2: {
      speed: this.getRandomInt(21, 32),
      maneuvering: this.getRandomInt(27, 36),
      efficiency: this.getRandomInt(24, 30),
      rum: 4,
      level: 1,
      exp: 0
    },
    3: {
      speed: this.getRandomInt(22, 34),
      maneuvering: this.getRandomInt(24, 32),
      efficiency: this.getRandomInt(28, 36),
      rum: 5,
      level: 1,
      exp: 0
    },
    4: {
      speed: this.getRandomInt(23, 36),
      maneuvering: this.getRandomInt(22, 29),
      efficiency: this.getRandomInt(35, 43),
      rum: 6,
      level: 1,
      exp: 0
    }
  };
  newShip: any = {};
  constructor(private modalService: BsModalService, private appService: AppService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  
  buyShip(modal: any) {
    if (this.appService.userData() && this.appService.userData().coins > 500) {
      const num = this.getRandomInt(1, 4);
      this.newShip = {
        "name": "",
        "model": "s001",
        "rarity": this.getRarityName()[num],
        "img": this.getShipImg()[num],
        "stats": this.shipStats[num]
      };

      this.openModal(modal);
    }

  }
  getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }
  getRarityName():any{
    return {
      1:"Boat",
      2:"Ship",
      3:"Warship",
      4:"Legendary Warship"
    }
  }
  getShipImg():any{
    return {
      1:"pship0",
      2:"pship1",
      3:"pship2",
      4:"pship3"
    }
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      backdrop: 'static',
      keyboard: false
    });
  }
  saveNewShip(){
    this.appService.addShip(this.newShip).subscribe(res=>{
      this.redirect();
    },err=>{
      this.redirect();
    });
  }
  redirect(){
    this.toastr.success("Ship added to your Collection","Congrats");
    this.modalRef?.hide();
    this.appService.invokeRecheck.next(true);
  }
}
