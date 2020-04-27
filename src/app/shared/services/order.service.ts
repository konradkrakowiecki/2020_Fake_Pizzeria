import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ShoppingCartService } from './shopping-cart.service';
import { map } from 'rxjs/operators';

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

  getSingleOrder(id) {
    return this.dataBase.object('/orders/' + id).valueChanges();
  }

  getOrdersByUser(userId: string) {
    return this.dataBase.list('/orders', ref => ref.orderByChild('userId').equalTo(userId)).snapshotChanges().pipe(map(actions => {
      return actions.map(action => ({key: action.key, ...action.payload.val() }));
    }));
  }

  updateOrder(order) {
    this.dataBase.object(`/orders/${order.key}`).update({isDeliver: order.isDeliver, isDone: order.isDone});
  }

  deleteOrder(order) {
    this.dataBase.object(`/orders/${order.key}`).remove();
  }

}
