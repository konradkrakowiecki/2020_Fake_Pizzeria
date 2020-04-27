import { Component, OnDestroy } from '@angular/core';
import { OrderService } from '../../../shared/services/order.service';
import { map } from 'rxjs/operators';
import { DataTableResource } from 'angular7-data-table';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnDestroy {
  orders$;
  orders;
  tableResource: DataTableResource<any>;
  items: any[] = [];
  itemCount: number;
  private subscription;

  constructor(private orderService: OrderService) {
    this.orders$ = orderService.getOrders().snapshotChanges().pipe(map(actions => {
      return actions.map(action => ({key: action.key, ...action.payload.val()}));
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

  delete(order) {
    this.orderService.deleteOrder(order);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
