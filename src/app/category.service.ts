import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private dataBase: AngularFireDatabase) { }

  getCategories() {
    return this.dataBase.list('/categories', ref => ref.orderByChild('size')).valueChanges();
  }
}
