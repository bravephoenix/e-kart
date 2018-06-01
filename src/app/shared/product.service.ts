import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase) {
  }

  create(product) {
    return this.db.list('/products').push(product);
  }

  update(uid: string, product) {
    return this.db.object('/products/' + uid).update(product);
  }

  getAllProducts() {
    return this.db.list('/products').snapshotChanges();
  }

  getProduct(uid: string) {
    return this.db.object('/products/' + uid).valueChanges();
  }

  delete(uid: string) {
    return this.db.object('/products/' + uid).remove();
  }
}
