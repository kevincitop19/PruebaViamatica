import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProductCart } from '../../interfaces/producto';
import { CartService } from '../../services/cart.service';
import { ToolbarComponent } from '../../../shared/components/toolbar/toolbar.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-facturas',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    ToolbarComponent,
    MatCardModule
  ],
  templateUrl: './facturas.component.html',
  styleUrl: './facturas.component.css'
})
export class FacturasComponent implements OnInit {

  cartItems: ProductCart[] = [];

  constructor(private _serviceCart: CartService, private router:Router) {}

  ngOnInit(): void {
    this.cartItems = this._serviceCart.getCart;
    console.log(this.cartItems)
    
  }
  
}
