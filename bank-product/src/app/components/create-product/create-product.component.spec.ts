import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { CreateProductComponent } from './create-product.component';
import { MockProductService } from '../../mocks/product-service.mock';
import { ProductServiceService } from '../../services/product/product-service.service';
import { Router } from '@angular/router';

describe('CreateProductComponent', () => {
  let component: CreateProductComponent;
  let fixture: ComponentFixture<CreateProductComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateProductComponent],
      providers: [
        { provide: ProductServiceService, useClass: MockProductService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateProductComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should invalidate ID field when empty', () => {
    const idInput = fixture.nativeElement.querySelector('#id');
    idInput.value = '';
    idInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  
    const invalidText = fixture.nativeElement.querySelector('.is-invalid-text');
    expect(invalidText.textContent).toContain('ID es requerido');
  });
  
  it('should invalidate ID field when length is less than 3', () => {
    const idInput = fixture.nativeElement.querySelector('#id');
    idInput.value = 'ab';
    idInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  
    const invalidText = fixture.nativeElement.querySelector('.is-invalid-text');
    expect(invalidText.textContent).toContain('ID debe tener entre 3 y 10 caracteres');
  });

  it('should submit the form successfully', fakeAsync(() => {
    spyOn(router, 'navigate').and.stub();
    const idInput = fixture.nativeElement.querySelector('#id');
    const nombreInput = fixture.nativeElement.querySelector('#nombre');
    const descripcionTextarea = fixture.nativeElement.querySelector('#descripcion');
    const logoInput = fixture.nativeElement.querySelector('#logo');
    const fechaLiberacionInput = fixture.nativeElement.querySelector('#fechaLiberacion');

    idInput.value = '123';
    nombreInput.value = 'Product Name';
    descripcionTextarea.value = 'Product Description';
    logoInput.value = 'logo.png';
    fechaLiberacionInput.value = '2027-07-25'; 

    idInput.dispatchEvent(new Event('input'));
    nombreInput.dispatchEvent(new Event('input'));
    descripcionTextarea.dispatchEvent(new Event('input'));
    logoInput.dispatchEvent(new Event('input'));
    fechaLiberacionInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    tick(); 
    expect(router.navigate).toHaveBeenCalledWith(['']);
  }));


  it('should reset the form when Reset button is clicked', fakeAsync(() => {
    const idInput = fixture.nativeElement.querySelector('#id');
    const nombreInput = fixture.nativeElement.querySelector('#nombre');
    const descripcionTextarea = fixture.nativeElement.querySelector('#descripcion');
    const logoInput = fixture.nativeElement.querySelector('#logo');
    const fechaLiberacionInput = fixture.nativeElement.querySelector('#fechaLiberacion');

    idInput.value = '123';
    nombreInput.value = 'Product Name';
    descripcionTextarea.value = 'Product Description';
    logoInput.value = 'logo.png';
    fechaLiberacionInput.value = '2027-07-25'; 

    
    idInput.dispatchEvent(new Event('input'));
    nombreInput.dispatchEvent(new Event('input'));
    descripcionTextarea.dispatchEvent(new Event('input'));
    logoInput.dispatchEvent(new Event('input'));
    fechaLiberacionInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();


    const resetButton = fixture.nativeElement.querySelector('.form-buttons button[type="button"]');
    resetButton.click();
    fixture.detectChanges();

    
    expect(component.product.id).toBe('');
    expect(component.product.nombre).toBe('');
    expect(component.product.descripcion).toBe('');
    expect(component.product.logo).toBe('');
    expect(component.product.fechaLiberacion).toBe('');

  }));

});
