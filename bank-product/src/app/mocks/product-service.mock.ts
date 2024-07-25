import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../interfaces/product';


@Injectable()
export class MockProductService {

  private mockProducts: Product[] = [
    {
      id: 'uno',
      name: 'testing 1',
      description: 'testing 1 creation',
      logo: 'favicon.ico',
      date_release: new Date('2024-07-25'),
      date_revision: new Date('2025-07-24')
    },
    {
      id: 'dos',
      name: 'testing 2',
      description: 'testing 2 creation',
      logo: 'favicon.ico',
      date_release: new Date('2024-07-25'),
      date_revision: new Date('2025-07-24')
    }
  ];

  constructor() { }

  getProducts(): Observable<{ data: Product[] }> {
    return of({ data: this.mockProducts });
  }

  createProduct(product: Product): Observable<{ message: string, data: Product }> {
    const createdProduct: Product = {
      id: 'once',
      name: 'testing creacion once',
      description: 'Descripcion testing creacion once',
      logo: 'favicon.ico',
      date_release: new Date('2024-07-25'),
      date_revision: new Date('2025-07-24')
    };
    return of({ message: 'Product added successfully', data: createdProduct });
  }

  updateProduct(product: Product, id: string): Observable<{ message: string, data: Partial<Omit<Product, 'id'>> }> {
    const updatedProduct: Partial<Omit<Product, 'id'>> = {
      name: 'Nombre editado',
      description: 'Descripcion producto',
      logo: 'assets-1.png',
      date_release: new Date('2025-01-01'),
      date_revision: new Date('2025-01-01')
    };
    return of({ message: 'Product updated successfully', data: updatedProduct });
  }

  delete(id: string): Observable<{ message: string }> {
    return of({ message: 'Product removed successfully' });
  }

  validate(id: string): Observable<boolean> {
    return of(true);
  }
}
