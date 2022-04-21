import { AppService } from './../services/app.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { shuffle } from "lodash";
import { ToastrService } from 'ngx-toastr';
import { Rewards } from '../constants/rewards.constant';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  positionColor: any = {
    1: 'bg-danger',
    2: 'bg-warning',
    3: 'bg-primary',
    4: 'bg-success',
    5: 'bg-info',
  };
  positionName: any = {
    1: '1 st',
    2: '2 nd',
    3: '3 rd',
    4: '4 th',
    5: '5 th'
  };
  position: any = "";
  sellShipPrice: any = 0;
  rewards: any = {};
  racingShip: any = {};
  sellSelectShip: any = {};
  selectedShip = {
    name: "",
    img: ""
  };
  ships: any = [];
  racers: any = [

    { id: 2, efficiency: 20, maneuvering: 29, speed: 22 },
    { id: 3, efficiency: 24, maneuvering: 28, speed: 23 },
    { id: 4, efficiency: 21, maneuvering: 25, speed: 21 },
    { id: 5, efficiency: 22, maneuvering: 26, speed: 20 }
  ]
  progress: number = 0;
  modalRef?: BsModalRef;
  constructor(private modalService: BsModalService, private appService: AppService, private toastr: ToastrService) { }


  ngOnInit(): void {
    this.getShips();

  }
  getShips() {
    this.appService.getUserShips().subscribe(res => {
      this.ships = res;
    })
  }
  getRewards() {
    this.appService.getRewards().subscribe(res => {
      this.rewards = res;
    })
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      backdrop: 'static',
      keyboard: false
    });
    // this.updateProgress();
  }
  rewardsShow(modal: any, shp: any) {
    this.getRewards();
    this.selectedShip.img = shp.img;
    this.selectedShip.name = shp.name;
    this.openModal(modal);
  }
  updateProgress(shp: any) {
    this.racingShip = shp;

    this.racers.unshift({ id: 1, efficiency: this.racingShip.stats.efficiency, maneuvering: this.racingShip.stats.maneuvering, speed: this.racingShip.stats.speed });
    let x = setInterval(() => {
      this.racers = shuffle(this.racers);
      this.racers.forEach((element: any, index: number) => {
        if (element.id == 1) {
          this.position = this.positionName[index + 1];
        }
      });
      this.progress += 20;
      if (this.progress >= 100) {
        this.racers= this.racers.sort((b:any,a:any)=>{
          return (a.efficiency+a.maneuvering+a.speed) - (b.efficiency+b.maneuvering+b.speed);
        })
        clearInterval(x);
        this.addRewards();
      }
    }, 1000);
  }

  addRewards() {
    let x = Rewards[this.position];
    let rewardObj = {
      name: this.racingShip.name,
      value: {
        "time": Date.now(),
        "position": this.position,
        "coins": x,
        "exp": 250
      }
    };
    this.appService.addRewards(rewardObj).subscribe(res => {
      this.getShips();
      this.toastr.success('Race added to rewards', 'Congrats!');
    });
  }
  transform(index: number) {
    return `translateY(${(index + 1) * 100}%)`;
  }

  trackBy(index: any, x: any) {
    return x;
  }
  reset() {
    this.progress = 0;
    this.racers = [
      { id: 2, efficiency: 20, maneuvering: 29, speed: 22 },
      { id: 3, efficiency: 24, maneuvering: 28, speed: 23 },
      { id: 4, efficiency: 21, maneuvering: 25, speed: 21 },
      { id: 5, efficiency: 22, maneuvering: 26, speed: 20 }
    ];
  }
  claimRewards() {
    let reqObj = { name: this.selectedShip.name };
    this.appService.claimRewards(reqObj).subscribe(res => {
      this.appService.invokeRecheck.next(true);
      this.getRewards();
      this.modalRef?.hide();
      this.toastr.success('Coins added to account', 'Congrats!');
    });

  }
  refillRum(name: any) {
    this.appService.addRum({ name }).subscribe(res => {
      this.getShips();
      this.appService.invokeRecheck.next(true);
      this.toastr.success('Rum has been refilled', 'Congrats!');

    });
  }
  sellSelect(ship: any) {
    this.sellSelectShip = ship;
  }
  sellShip() {
    let reqObj = {
      ship: this.sellSelectShip,
      price: this.sellShipPrice
    };
    this.appService.sellShip(reqObj).subscribe(res => {
      this.getShips();
      this.appService.invokeRecheck.next(true);
      this.modalRef?.hide();
      this.toastr.info('Ship has been added to marketplace', 'Note!');
    });
  }
}
