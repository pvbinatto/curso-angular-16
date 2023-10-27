import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { Product } from './product.model';
import { environment } from 'src/environments/environment';
import { ApiService } from '../core/api.service';
import { UtilService } from '../core/util.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private apiService: ApiService, private util: UtilService) {}

  getAll(): Observable<Product[]> {
    return this.apiService.get(environment.api + 'products?_limit=10');
  }

  create(product: Product): Observable<Product> {
    return this.getBySku(product.sku).pipe(
      switchMap((res) => {
        if (res.length > 0) {
          this.util.toastrError('Já existe um produto com esse SKU');
          return new Observable();
        } else {
          return this.apiService.post(environment.api + 'products', product);
        }
      })
    );
  }

  update(product: Product): Observable<Product> {
    return this.apiService.put(
      environment.api + 'products/' + product.id,
      product
    );
  }

  delete(id: string): Observable<Product> {
    return this.apiService.delete(environment.api + 'products/' + id);
  }

  getById(id: string): Observable<Product> {
    return this.apiService.get(environment.api + 'products/?id=' + id);
  }

  getBySku(sku: string): Observable<Product[]> {
    return this.apiService.get(environment.api + 'products/?sku=' + sku);
  }
}
