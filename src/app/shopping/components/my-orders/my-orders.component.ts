import { Component } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { OrderService } from '../../../shared/services/order.service';
import { switchMap } from 'rxjs/operators';
import { DataTableResource } from 'angular7-data-table';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  private orders$;
  private subscription: any;
  private orders: any;
  private tableResource: DataTableResource<any>;
  private items: any[] = [];
  private itemCount: number;

  constructor(private authService: AuthService, private orderService: OrderService) {
    this.orders$ = authService.user$.pipe(switchMap(user => {
      return orderService.getOrdersByUser(user.uid);
    }));

    this.subscription = this.orders$.subscribe( orders => {
      this.orders = orders;
      this.initializeTable(Object.values(this.orders));
    });
  }

  private initializeTable(orders: any[]) {
    this.tableResource = new DataTableResource(orders);
    this.tableResource.query({offset: 0} ).then(items => this.items = items);
    this.tableResource.count().then(count => this.itemCount = count);
  }

  reloadItems(params) {
    if (!this.tableResource) { return; }
    this.tableResource.query(params).then(items => this.items = items);
  }

  update(order) {
    this.orderService.updateOrder(order);
  }

}
