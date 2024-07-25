import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ProductServiceService } from './product-service.service';
import { provideHttpClient } from '@angular/common/http';
import { Product } from '../../interfaces/product';

describe('ProductServiceService', () => {
  let service: ProductServiceService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(ProductServiceService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve products', () => {
    const mockProducts: Product[] = [
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
  
    service.getProducts().subscribe(products => {
      expect(products).toEqual({data: mockProducts});
    });
  
    const req = httpTestingController.expectOne('http://localhost:3002/bp/products');
    expect(req.request.method).toEqual('GET');
    req.flush({ data: mockProducts });
  });

  it('should create a new product', () => {
    const newProduct: Product = {
      id: '3',
      name: 'New Product',
      description: 'Description of new product',
      logo: 'logo.png',
      date_release: new Date('2024-07-25'),
      date_revision: new Date('2025-07-24')
    };
  
    service.createProduct(newProduct).subscribe(response => {
      expect(response.message).toEqual('Product added successfully');
      expect(response.data).toEqual(newProduct);
    });
  
    const req = httpTestingController.expectOne('http://localhost:3002/bp/products');
    expect(req.request.method).toEqual('POST');
    req.flush({ message: 'Product added successfully', data: newProduct });
  });

  it('should update an existing product', () => {
    const updatedProduct: Product = {
      id: '2',
      name: 'Updated Product',
      description: 'Updated description',
      logo: 'updated-logo.png',
      date_release: new Date('2024-07-25'),
      date_revision: new Date('2025-07-24')
    };
  
    const productId = '2';
  
    service.updateProduct(updatedProduct, productId).subscribe(response => {
      expect(response.message).toEqual('Product updated successfully');
      expect(response.data).toEqual(updatedProduct);
    });
  
    const req = httpTestingController.expectOne(`http://localhost:3002/bp/products/${productId}`);
    expect(req.request.method).toEqual('PUT');
    req.flush({ message: 'Product updated successfully', data: updatedProduct });
  });

  it('should delete a product', () => {
    const productId = '1';
  
    service.delete(productId).subscribe(response => {
      expect(response.message).toEqual('Product removed successfully');
    });
  
    const req = httpTestingController.expectOne(`http://localhost:3002/bp/products/${productId}`);
    expect(req.request.method).toEqual('DELETE');
    req.flush({ message: 'Product removed successfully' });
  });

  it('should validate a product', () => {
    const productId = '1';
  
    service.validate(productId).subscribe(valid => {
      expect(valid).toBe(true);
    });
  
    const req = httpTestingController.expectOne(`http://localhost:3002/bp/products/verification/${productId}`);
    expect(req.request.method).toEqual('GET');
    req.flush(true); 
  });

});
