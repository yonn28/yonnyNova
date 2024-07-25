import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductServiceService } from '../../services/product/product-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of, Subject, takeUntil } from 'rxjs';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent implements OnInit, OnDestroy {
  product = {
    id: '',
    nombre: '',
    descripcion: '',
    logo: '',
    fechaLiberacion: '',
    fechaRevision: ''
  };

  private destroy$ = new Subject<void>();

  currentDate = new Date().toISOString().split('T')[0];

  isfechaLiberacionValid = false;

  constructor(
    private productService: ProductServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(){
    const productId = this.route.snapshot.paramMap.get('id') ?? '';
    this.product.id = productId;
  }

  onSubmit() {
    const product = {
        name:          this.product.nombre,
        description:   this.product.descripcion,
        logo:          this.product.logo,
        date_release:  this.product.fechaLiberacion,
        date_revision:  this.product.fechaRevision
    } as unknown as Product;
    this.productService.updateProduct(product,this.product.id).pipe(
      catchError(err => {
            console.log(err) 
            return of([])
      }),
      takeUntil(this.destroy$)
    ).subscribe(()=>{
      this.router.navigate(['']);
    });
  }


  validateFechaLiberacion(){
    this.isfechaLiberacionValid = this.product.fechaLiberacion >= this.currentDate;
    if(this.isfechaLiberacionValid) this.setFechaRevision();
  }

  setFechaRevision() {
    const fechaLiberacionDate = new Date(this.product.fechaLiberacion);
    const fechaRevisionDate = new Date(fechaLiberacionDate.getFullYear() + 1, fechaLiberacionDate.getMonth(), fechaLiberacionDate.getDate());
    this.product.fechaRevision = fechaRevisionDate.toISOString().split('T')[0];
  }

  resetForm() {
    const productId = this.route.snapshot.paramMap.get('id') ?? '';
    this.product = {
      id: productId,
      nombre: '',
      descripcion: '',
      logo: '',
      fechaLiberacion: '',
      fechaRevision: ''
    };
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
