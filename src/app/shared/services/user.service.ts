import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import * as firebase from 'firebase';
import { AppUser } from '../models/app-user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private dataBase: AngularFireDatabase) { }

  save(user: firebase.User) {
    this.dataBase.object('/users/' + user.uid).update({
      name: user.displayName,
      emial: user.email
    });
  }

  get(uid: string): AngularFireObject<AppUser>  {
    return this.dataBase.object('users/' + uid);
  }
}
