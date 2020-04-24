import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';
import { Order } from '../models/order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  shipping = {};
  cart;
  userId: string;
  cartSubscription: Subscription;
  userSubscription: Subscription;

  constructor(private router: Router, private shoppingCartService: ShoppingCartService, private orderService: OrderService, private authService: AuthService) { }

  async ngOnInit() {
    const cart$ = await this.shoppingCartService.getCart();
    this.cartSubscription = cart$.valueChanges().subscribe(cart => {
      this.cart = Object.values(cart.items);
      this.cart.totalPrice = this.totalPrice(cart);
    });
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  async placeOrder() {
    const cart = this.cart;
    const order = new Order(this.userId, this.shipping, cart);
    const result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }

  totalPrice(cart) {
    let price = 0;
      for (let product in cart.items) {
        price += (cart.items[product].quantity * cart.items[product].product.price);
    }
    return price;
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

}
