import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { EditProductComponent } from './edit-product.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MockProductService } from '../../mocks/product-service.mock';
import { ProductServiceService } from '../../services/product/product-service.service';
import { FormsModule } from '@angular/forms';
import { MockActivatedRoute } from '../../mocks/activate-route.mock';

describe('EditProductComponent', () => {
  let component: EditProductComponent;
  let fixture: ComponentFixture<EditProductComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditProductComponent, FormsModule],
      providers: [ 
        { provide: ProductServiceService, useClass: MockProductService },
        {
          provide: ActivatedRoute,
          useClass: MockActivatedRoute
        }
      ]
    })
    .compileComponents();
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(EditProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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

    expect(component.product.nombre).toBe('');
    expect(component.product.descripcion).toBe('');
    expect(component.product.logo).toBe('');
    expect(component.product.fechaLiberacion).toBe('');

  }));
});
