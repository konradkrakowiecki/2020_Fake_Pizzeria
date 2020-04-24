import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import {ShoppingCartService} from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private dataBase: AngularFireDatabase, private shoppingCartService: ShoppingCartService) { }

  async placeOrder(order) {
    const result = await this.dataBase.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }
}
