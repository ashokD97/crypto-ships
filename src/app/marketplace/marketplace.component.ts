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
      model:"s111"
    },{
      name:"ship2",
      model:"s222"
    },{
      name:"ship3",
      model:"s333"
    },
    {
      name:"ship4",
      model:"s444"
    },{
      name:"ship5",
      model:"s555"
    },{
      name:"ship6",
      model:"s666"
    }
  ];
  shipsSell:any = [
    {
      name:"ship7",
      model:"s777"
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }
  cancelListing(index:any){
    this.shipsSell.splice(index,1);
  }
}
