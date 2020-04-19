import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private dataBase: AngularFireDatabase) { }

  create(product) {
    this.dataBase.list('/products').push(product);
  }

  update(productId, product) {
    return this.dataBase.object(`/products/${productId}`).update(product);
  }

  delete(productId) {
    return this.dataBase.object(`/products/${productId}`).remove();
  }

  getAll() {
    return this.dataBase.list('/products').snapshotChanges()
      .pipe(map(changes => changes.map(item => {
                const data = item.payload.val();
                const key = item.payload.key;
                return { key, ...data };
                })
                )
            );
  }

  get(productId) {
    return this.dataBase.object(`/products/${productId}`).valueChanges();
  }
}
