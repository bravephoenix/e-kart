import { map } from 'rxjs/operators';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
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
  // products$;
  products: Product[] = [];
  filteredProducts: Product[];
  subscription: Subscription;

  // isLoading: boolean;

  displayedColumns = ['title', 'price', 'category', 'edit'];
  dataSource; // = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    // this.dataSource.paginator = this.paginator;
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
    ).subscribe(c => {
      this.dataSource = new MatTableDataSource(this.products);
      this.dataSource.sortingDataAccessor = (data, sortHeaderId) => data[sortHeaderId].toLocaleLowerCase();
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      // this.filteredProducts = this.dataSource;
      // this.isLoading = true;
    });
    // console.log(this.products);
    // this.filteredProducts = this.products;

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filter(query: string) {
    // this.filteredProducts = (query) ?
    //   this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
    //   this.products;
    query = query.trim(); // Remove whitespace
    query = query.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = query;
  }

}
