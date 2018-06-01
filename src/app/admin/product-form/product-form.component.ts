import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from './../../shared/category.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { switchMap, map, take } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { ProductService } from '../../shared/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  editMode = false;
  uid;
  product = {};
  // @ViewChild('f') product: NgForm;

  constructor(private router: Router, private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) {
  }

  ngOnInit() {
    this.categories$ = this.categoryService.getCategories().pipe(
      map(
        categories => {
          return categories.map(
            category => {
              return ({ key: category.payload.key, data: category.payload.val() });
            }
          );
        }
      )
    );
    // console.log(this.product);
    this.uid = this.route.snapshot.paramMap.get('id');
    // console.log(this.uid);
    if (this.uid) {
      this.editMode = true;
      this.productService.getProduct(this.uid).pipe(take(1)).subscribe(
        product => this.product = product
      );
    }
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

