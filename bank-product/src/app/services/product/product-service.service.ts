import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(
    private http: HttpClient
  ) { }

  getProducts():Observable<{data: Product[]}>{
    return this.http.get<{data: Product[]}>('http://localhost:3002/bp/products');
  }

  createProduct(product: Product){
    return this.http.post<{message: String,data: Product}>('http://localhost:3002/bp/products',product);
  }

  updateProduct(product: Product, id:string){
    return this.http.put<{message: String,data: Product}>(`http://localhost:3002/bp/products/${id}`,product);
  }

  delete(id:string):Observable<{message:string}>{
    return this.http.delete<{message:string}>(`http://localhost:3002/bp/products/${id}`)
  }

  validate(id: string):Observable<boolean>{
    return this.http.get<boolean>(`http://localhost:3002/bp/products/verification/${id}`)
  }

}
