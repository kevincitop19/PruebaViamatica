import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ProductCart } from '../../interfaces/producto';
import { CartService } from '../../services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    MatCardModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

 

  @Input() productName!: string;
  @Input() productDescription!: string;
  @Input() productPrice!: number;

  constructor(public _serviceCart : CartService){
    
  }
  addToCart(){
    const product = {
      productName: this.productName,
      description: this.productDescription,
      price: this.productPrice
    };
    Swal.fire({
      title: '¿Agregar al carrito?',
      text: '¿Estás seguro de que deseas añadir este producto al carrito?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this._serviceCart.getCart.push(product);
      }
    });
  }
    
}

