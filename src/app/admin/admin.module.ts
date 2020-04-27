import { NgModule } from '@angular/core';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { SharedModule } from '../shared/shared.module';
import { DataTableModule } from 'angular7-data-table';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from '../shared/services/auth-guard.service';
import { AdminOrderDetailsComponent } from './components/admin-orders/admin-order-details/admin-order-details.component';
import {MatIconModule} from '@angular/material';

@NgModule({
  declarations: [
    AdminOrderDetailsComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent
  ],
  imports: [
    SharedModule,
    DataTableModule,
    RouterModule.forChild([
      {path: 'admin/products/new', component: ProductFormComponent, canActivate: [AuthGuardService, AdminAuthGuardService]},
      {path: 'admin/products/:id', component: ProductFormComponent, canActivate: [AuthGuardService, AdminAuthGuardService]},
      {path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuardService, AdminAuthGuardService]},
      {path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuardService, AdminAuthGuardService]},
      {path: 'admin/orders/:id', component: AdminOrderDetailsComponent, canActivate: [AuthGuardService, AdminAuthGuardService]}
    ]),
    MatIconModule
  ],
  providers: [
    AdminAuthGuardService
  ]
})
export class AdminModule { }
