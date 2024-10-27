import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './pages/ecommerce/cart/cart.component';
import { OrderComponent } from './pages/ecommerce/order/order.component';

const routes: Routes = [
  {
    path: 'ecommerce/cart',
    component: CartComponent
  },
  {
    path: "",
    redirectTo: "ecommerce/cart", pathMatch: 'full'
  },
  {
    path: 'ecommerce/order/:id',
    component: OrderComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
