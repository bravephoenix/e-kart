import { map } from 'rxjs/operators';
import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, AfterContentInit } from '@angular/core';
import { ProductService } from '../../shared/product.service';
import { Subscription } from 'rxjs';
import { Product } from '../../shared/product.model';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})

export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  subscription: Subscription;
  isLoadingResults = true;

  displayedColumns = ['title', 'price', 'category', 'edit'];
  dataSource: any = [];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.isLoadingResults = true;
    this.subscription = this.productService.getAllProducts().pipe(
      map(
        changes => {
          return changes.map(
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
        }
      )
    ).subscribe(c => {
      this.dataSource = new MatTableDataSource(this.products);
      this.dataSource.sortingDataAccessor = (data, sortHeaderId) => data[sortHeaderId].toLocaleLowerCase();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filter(query: string) {
    query = query.trim();
    query = query.toLowerCase();
    this.dataSource.filter = query;
  }

}
