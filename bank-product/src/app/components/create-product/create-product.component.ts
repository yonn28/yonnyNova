import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductServiceService } from '../../services/product/product-service.service';
import { catchError, takeUntil } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import { Product } from '../../interfaces/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss'
})
export class CreateProductComponent implements OnDestroy{

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

  isIdValid = false; 
  isfechaLiberacionValid = false;

  constructor(
    private productService: ProductServiceService,
    private router: Router
  ) { }


  onSubmit() {
    const product = {
        id:            this.product.id,
        name:          this.product.nombre,
        description:   this.product.descripcion,
        logo:          this.product.logo,
        date_release:  this.product.fechaLiberacion,
        date_revision:  this.product.fechaRevision
    } as unknown as Product;
    this.productService.createProduct(product).pipe(
      takeUntil(this.destroy$)
    ).subscribe(()=>{
      this.router.navigate(['']);
    });
  }

  validateId(){
    this.productService.validate(this.product.id).pipe(
      catchError(err => {
            console.log(err) 
            return of([])
      }),
      takeUntil(this.destroy$)
    ).subscribe((value)=> this.isIdValid=!value);
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
    this.product = {
      id: '',
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
