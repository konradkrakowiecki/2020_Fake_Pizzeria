import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../../shared/services/order.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-admin-order-details',
  templateUrl: './admin-order-details.component.html',
  styleUrls: ['./admin-order-details.component.css']
})
export class AdminOrderDetailsComponent implements OnInit {
  id;
  product$;
  cart;
  totalPrice;

  constructor(
    route: ActivatedRoute,
    private orderService: OrderService
  ) {
    this.id = route.snapshot.paramMap.get('id');
  }

  async ngOnInit() {
    this.product$ = await this.orderService.getSingleOrder(this.id).pipe(take(1));
    this.product$.subscribe(cart => {
      this.totalPrice = this.getPriceItems(cart);
      this.cart = cart;
    });
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

}
