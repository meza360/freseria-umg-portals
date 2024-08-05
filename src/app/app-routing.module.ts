import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './pages/ecommerce/cart/cart.component';

const routes: Routes = [
  {
    path: 'ecommerce/cart',
    component: CartComponent
  }
  /* {
    //path: "",
    //redirectTo: "/", pathMatch: 'full'
  } */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
