 import { Injectable } from '@angular/core';
 import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
 import { take } from 'rxjs/operators';
 import { Product } from './models/product';
 import {ShoppingCart} from './models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private dataBase: AngularFireDatabase) { }

  private create() {
    return this.dataBase.list('shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart(): Promise<AngularFireObject<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();
    return this.dataBase.object(`/shopping-carts/${cartId}`);
  }

  async getCartOnly(): Promise<AngularFireObject<ShoppingCart>> {
    const cartId = await localStorage.getItem('cartId');
    return this.dataBase.object(`/shopping-carts/${cartId}`);
  }

  private getItem(cartId: string, productId: string) {
    return this.dataBase.object(`/shopping-carts/${cartId}/items/${productId}`);
  }

  private async getOrCreateCartId() {
    const cardId = localStorage.getItem('cartId');
    if (cardId) { return cardId; }
    const result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  async addToCart(product: Product) {
    const cartId = await this.getOrCreateCartId();
    const item$ = this.getItem(cartId, product.key);

    item$.snapshotChanges().pipe(take(1)).subscribe(item => {
      const itemInCart: any = item.payload.val();
      if (itemInCart === null) {
        item$.set({ product, quantity: 1});
      } else {
        item$.update({product, quantity: (itemInCart.quantity) + 1});
      }
    });
  }

  async removeFromCart(product: Product) {
    const cartId = await this.getOrCreateCartId();
    const item$ = this.getItem(cartId, product.key);
    item$.snapshotChanges().pipe(take(1)).subscribe(item => {
      const itemInCart: any = item.payload.val();
      item$.update({product, quantity: (itemInCart.quantity) - 1});
    });
  }

}
