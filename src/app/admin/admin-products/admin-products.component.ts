import { map } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../shared/product.service';
import { Subscription } from 'rxjs';
import { Product } from '../../shared/product.model';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  // products$;
  products: Product[] = [];
  filteredProducts: Product[];
  subscription: Subscription;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    // this.subscription = this.productService.getAllProducts().pipe(
    //   map(
    //     changes => {
    //       return changes.map(
    //         c => {
    //           return ({ key: c.payload.key, data: c.payload.val() });
    //         }
    //       );
    //     }
    //   )
    // ).subscribe(products => this.filteredProducts = this.products = products);

    this.subscription = this.productService.getAllProducts().pipe(
      map(
        changes => {
          return changes.map(
            c => {
              // return ({ key: c.payload.key, data: c.payload.val() });
              const key = c.payload.key;
              // console.log(' Key : ' + this.products);
              const data: any = c.payload.val();
              // console.log('Data : ' + data);
              const product: Product = {
                id: key,
                title: data.title,
                price: data.price,
                category: data.category,
                imageUrl: data.imageUrl
              };
              // console.log(this.products);
              this.products.push(product);
            }
          );
        }
      )
    ).subscribe();
    this.filteredProducts = this.products;
    // console.log(this.products);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filter(query: string) {
    this.filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }

}
