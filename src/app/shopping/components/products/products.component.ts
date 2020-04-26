import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { Subscription } from 'rxjs';
import { Product } from '../../../shared/models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: any[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart: any;
  subscription: Subscription;

  constructor(route: ActivatedRoute, productService: ProductService, private shoppingCartService: ShoppingCartService) {
    productService.getAll().pipe(
      switchMap(products => {
        this.products = products;
        return route.queryParamMap;
      }))
      .subscribe(params => {
        this.category = params.get('category');
        this.filteredProducts = (this.category) ?
          this.products.filter(product => product.category.key === this.category) :
          this.products;
      });
  }

  async ngOnInit() {
    this.subscription = (await this.shoppingCartService.getCartOnly()).snapshotChanges().subscribe(cart => {
      this.cart = cart.payload.val();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
