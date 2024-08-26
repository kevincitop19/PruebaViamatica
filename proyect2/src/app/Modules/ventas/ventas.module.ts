import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from '../shared/components/toolbar/toolbar.component';
import { ProductsComponent } from './components/products/products.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToolbarComponent,
    ProductsComponent
  ]
})
export class VentasModule { }
