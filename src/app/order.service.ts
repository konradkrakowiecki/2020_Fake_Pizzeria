import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import {ShoppingCartService} from './shopping-cart.service';
import {map} from 'rxjs/operators';

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

  getOrders() {
    return this.dataBase.list('/orders');
  }

  getOrdersByUser(userId: string) {
    return this.dataBase.list('/orders', ref => ref.orderByChild('userId').equalTo(userId)).snapshotChanges().pipe(map(actions => {
      return actions.map(action => ({key: action.key, ...action.payload.val() }))
    }));
  }

}
