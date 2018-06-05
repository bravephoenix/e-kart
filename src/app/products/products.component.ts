import { CategoryService } from './../shared/category.service';
import { ProductService } from './../shared/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Product } from '../shared/product.model';
import { Category } from '../shared/category.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: Category[] = [];
  selCategory;
  prodSubscription: Subscription;
  catSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService) { }

  ngOnInit() {
    this.prodSubscription = this.productService.getAllProducts().pipe(
      switchMap(
        changes => {
          changes.map(
            c => {
              const key = c.payload.key;
              const data: any = c.payload.val();
              const product: Product = {
                id: key,
                title: data.title,
                price: data.price,
                category: data.category,
                imageUrl: data.imageUrl
              };
              this.products.push(product);
            }
          );
          return this.route.queryParamMap;
        }
      )
    ).subscribe(
        params => {
          this.selCategory = params.get('category');

          this.filteredProducts = (this.selCategory) ?
            this.products.filter(p => p.category === this.selCategory) :
            this.products;
        }
      );

    this.catSubscription = this.categoryService.getCategories().pipe(
      map(
        categories => {
          return categories.map(
            c => {
              const key = c.payload.key;
              const data: any = c.payload.val();
              const category: Category = {
                id: key,
                name: data.name
              };
              this.categories.push(category);
            }
          );
        }
      )
    ).subscribe();
  }

  ngOnDestroy() {
    this.prodSubscription.unsubscribe();
    this.catSubscription.unsubscribe();
  }

}
