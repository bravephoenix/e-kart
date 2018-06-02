import { Category } from './../../shared/category.model';
import { Product } from './../../shared/product.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from './../../shared/category.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { switchMap, map, take } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { ProductService } from '../../shared/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  editMode = false;
  uid;
  product = {} as Product;
  subscription: Subscription;


  constructor(private router: Router, private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) {
  }

  ngOnInit() {
    this.subscription = this.categoryService.getCategories().pipe(
      map(
        categories => {
          return categories.map(
            c => {
              const key = c.payload.key;
              // console.log('key : ' + key);
              const data: any = c.payload.val();
              // console.log('data : ' + data.name);
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
    // console.log(this.product);
    this.uid = this.route.snapshot.paramMap.get('id');
    // console.log(this.uid);
    if (this.uid) {
      this.editMode = true;
      this.productService.getProduct(this.uid).pipe(take(1)).subscribe(
        (product: any) => {
          console.log('Product : ' + product);
          this.product = {
            id: this.uid,
            title: product.title,
            price: product.price,
            category: product.category,
            imageUrl: product.imageUrl
          };
          // console.log('this.product : ' + this.product);
        }
      );
    }
    // console.log(this.product);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSave(newProduct: NgForm) {
    if (this.editMode) {
      this.productService.update(this.uid, newProduct);
    } else {
      this.productService.create(newProduct);
    }
    // console.log(newProduct);
    this.router.navigate(['/admin/products']);
  }

  onDelete() {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    this.productService.delete(this.uid);
    this.router.navigate(['/admin/products']);
  }

}

