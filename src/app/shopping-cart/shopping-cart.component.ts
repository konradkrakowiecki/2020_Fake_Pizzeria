import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart$;
  totalCount: number;
  totalPrice: number;
  productIds: string[];

  constructor(private shoppingCartService: ShoppingCartService, private router: Router) { }

  async ngOnInit() {
    const cart$ = await this.shoppingCartService.getCart();
    cart$.valueChanges().subscribe(cart => {
      if (!cart.items) { this.clearCart(); }
      else {
        this.productIds = Object.keys(cart.items);
        this.cart$ = cart.items;
        this.totalCount = this.getCountItems(cart);
        this.totalPrice = this.getPriceItems(cart);
      }
    });
  }

  getCountItems(cart) {
    let count = 0;
    if (cart != null) {
      for (let productId in cart.items) {
        count += cart.items[productId].quantity;
      }
    }
    return count;
  }

  getPriceItems(cart) {
    let price = 0;
    if (cart != null) {
      for (let productId in cart.items) {
        price += (cart.items[productId].quantity * cart.items[productId].product.price);
      }
    }
    return price;
  }

  clearCart() {
    this.shoppingCartService.clearCart();
    this.router.navigateByUrl('/products');

  }
}
