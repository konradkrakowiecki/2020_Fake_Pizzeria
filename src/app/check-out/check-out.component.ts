import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  cart;
  subscription: Subscription;

  constructor(private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    const cart$ = await this.shoppingCartService.getCart();
    this.subscription = cart$.valueChanges().subscribe(cart => {
      this.cart = Object.values(cart.items);
      this.cart.totalPrice = this.totalPrice(cart);
    });
  }

  totalPrice(cart) {
    let price = 0;
      for (let product in cart.items) {
        price += (cart.items[product].quantity * cart.items[product].product.price);
    }
    return price;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
