import { Injectable } from '@angular/core';
import { ProductCart } from '../interfaces/producto';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart : ProductCart[] = [];
  cartItems: ProductCart[] = [];
  constructor() { }

  public get getCart(){
    
    return this.cart
  }
  removeFromCart(id:number){
    this.cart.splice(id,1);
  }

  Pucharse(){

  }
}
