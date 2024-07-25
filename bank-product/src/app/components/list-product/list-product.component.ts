import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../../services/product/product-service.service';
import { Product } from '../../interfaces/product';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { catchError, of, Subject, switchMap, takeUntil } from 'rxjs';
import { PaginationPipe } from '../../pipes/pagination/pagination.pipe';
import { SearchPipe } from '../../pipes/search/search.pipe';

@Component({
  selector: 'app-list-product',
  standalone: true,
  imports: [CommonModule, RouterLink, PaginationPipe, SearchPipe],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.scss'
})
export class ListProductComponent implements OnInit {
  
  products: Product[] = [] as Product[];
  productIdToDelete: string | null = null;
  isModalOpen = false;
  currentPage = 1;
  pageSize = 5; 
  pageSizeOptions = [5, 10, 20];
  searchTerm: string = '';
  
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private productService: ProductServiceService
  ){
   
  }
  ngOnInit(): void {
    this.getProducts();
  }

  openModal(productId: string) {
    this.productIdToDelete = productId;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.productIdToDelete = null;
  }

  eliminarProducto() {
    if (this.productIdToDelete !== null) {
      this.productService.delete(this.productIdToDelete).pipe(
        catchError(err => {
              console.log(err) 
              return of([])
        }),
        switchMap(() => this.productService.getProducts()),
        takeUntil(this.destroy$)
      ).subscribe((res:{data:Product[]}) =>{
        this.products = res.data
      })
      this.closeModal();
    }
  }

  getProducts(){
    this.productService.getProducts().subscribe(
      (res:{data:Product[]}) => {
        this.products = res.data;
      },
    );
  }

  onSearchChange(event: string) {
    this.searchTerm = event.toLowerCase();
  }

  changePageSize(newSize: any) {
    this.pageSize = newSize;
    this.currentPage = 1; 
  }

  nextPage() {
    this.currentPage++;
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(); 
    this.destroy$.complete(); 
  }

}
