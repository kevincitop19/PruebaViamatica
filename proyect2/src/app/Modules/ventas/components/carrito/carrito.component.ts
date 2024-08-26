import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProductCart } from '../../interfaces/producto';
import { CartService } from '../../services/cart.service';
import { ToolbarComponent } from '../../../shared/components/toolbar/toolbar.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    ToolbarComponent],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit {

  cartItems: ProductCart[] = [];

  constructor(private _serviceCart: CartService, private router:Router) {}

  ngOnInit(): void {
    this.cartItems = this._serviceCart.getCart;
    console.log(this.cartItems)
  }

  removeFromCart(id:number){
    this._serviceCart.removeFromCart(id);
    //actualizar carrito
    this.cartItems = this._serviceCart.getCart;
  }

  pucharse(){
    if(this._serviceCart.getCart.length == 0 ){
      this.router.navigate(['/ventas']);
    }else{

      Swal.fire({
        title: '¿Comprar?',
        text: '¿Estás seguro de que deseas realizar la compra?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          this._serviceCart.Pucharse();
          
          this.router.navigate(['/ventas']);
        }
      });
      
    }
  }

}

