import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.scss']
})
export class MarketplaceComponent implements OnInit {
  shipsBuy:any = [
    {
      name:"ship1",
      model:"s111",
      stats:{
        speed:7,
        stiffness:5,
        propulsion:6,
        strength:8,
        planking:5,
        size:4
      }
    },
  ];
  shipsSell:any = [
    {
      name:"ship7",
      model:"s777",
      stats:{
        speed:7,
        stiffness:5,
        propulsion:6,
        strength:8,
        planking:5,
        size:4
      }
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }
  cancelListing(index:any){
    this.shipsSell.splice(index,1);
  }
}
