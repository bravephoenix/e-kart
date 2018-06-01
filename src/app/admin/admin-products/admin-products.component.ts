import { map } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../shared/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  // products$;
  products: any[];
  filteredProducts: any[];
  subscription: Subscription;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.subscription = this.productService.getAllProducts().pipe(
      map(
        changes => {
          return changes.map(
            c => {
              return ({ key: c.payload.key, data: c.payload.val() });
            }
          );
        }
      )
    ).subscribe(products => this.filteredProducts = this.products = products);

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filter(query: string) {
    this.filteredProducts = (query) ?
      this.products.filter(p => p.data.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }

}
