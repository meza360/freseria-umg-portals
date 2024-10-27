import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './app-material.module';
import { SharedModule } from './shared.module';
import { CartComponent } from './pages/ecommerce/cart/cart.component';
import { APP_BASE_HREF, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { LoadingDialogComponent } from './components/shared/loading-dialog/loading-dialog.component';
import { ProductImageComponent } from './components/shared/product-image/product-image.component';

@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    LoadingDialogComponent,
    ProductImageComponent
  ],
  imports: [
    AppRoutingModule,
    MaterialModule,
    SharedModule
  ],
  providers: [
    provideAnimationsAsync(),
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: APP_BASE_HREF, useValue: '/' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
