import { Router } from '@angular/router';
import { CategoryService } from './../../shared/category.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { switchMap, map } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { ProductService } from '../../shared/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  @ViewChild('f') product: NgForm;

  constructor(private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService) {
  }

  ngOnInit() {
    this.categories$ = this.categoryService.getCategories();
    console.log(this.product);
  }

  onSave(newProduct: NgForm) {
    this.productService.create(newProduct);
    this.router.navigate(['/admin/products']);
  }

}
