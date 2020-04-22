import { Component, Input } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {
  @Input('product') product;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private shoppingCartService: ShoppingCartService) { }

  addToCart() {
    if (this.product.product) { this.shoppingCartService.addToCart(this.product.product); }
    else { this.shoppingCartService.addToCart(this.product); }
  }

  removeFromCart() {
    if (this.product.product) { this.shoppingCartService.removeFromCart(this.product.product); }
    else { this.shoppingCartService.removeFromCart(this.product); }
  }

  getQuantity() {
    if (this.product.quantity) { return this.product.quantity; }
    if (this.shoppingCart === null || this.shoppingCart === undefined || !this.shoppingCart.hasOwnProperty('items')) { return 0; }
    const item = this.shoppingCart.items[this.product.key];
    return item ? item.quantity : 0;
  }
}
