import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private dataBase: AngularFireDatabase) { }

  getAll() {
    return this.dataBase.list('/categories', ref => ref.orderByChild('size')).snapshotChanges()
      .pipe(map(changes => changes.map(item => {
          const data = item.payload.val();
          const key = item.payload.key;
          return { key, ...data };
      })));
  }
}
