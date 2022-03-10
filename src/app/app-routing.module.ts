import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketplaceComponent } from './marketplace/marketplace.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'marketplace',
    component:MarketplaceComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
