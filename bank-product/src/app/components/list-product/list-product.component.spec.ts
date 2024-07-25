import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductComponent } from './list-product.component';
import { ProductServiceService } from '../../services/product/product-service.service';
import { MockProductService } from '../../mocks/product-service.mock';
import { PaginationPipe } from '../../pipes/pagination/pagination.pipe';
import { SearchPipe } from '../../pipes/search/search.pipe';
import { ActivatedRoute, provideRouter, Router } from '@angular/router';
import { MockActivatedRoute } from '../../mocks/activate-route.mock';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('ListProductComponent', () => {
  let component: ListProductComponent;
  let fixture: ComponentFixture<ListProductComponent>;
  let productService: ProductServiceService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListProductComponent, PaginationPipe, SearchPipe],
      providers: [ 
        { provide: ProductServiceService, useClass: MockProductService },
        {
          provide: ActivatedRoute,
          useClass: MockActivatedRoute
        },
        provideRouter([]),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListProductComponent);
    productService = TestBed.inject(ProductServiceService);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update searchTerm on input change', () => {
    const searchInput = fixture.debugElement.query(By.css('.search')).nativeElement;
    const testSearchTerm = 'test search';
    searchInput.value = testSearchTerm;
    searchInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.searchTerm).toEqual(testSearchTerm.toLowerCase());
  });

  it('should change page size on page size selector change', () => {
    const pageSizeSelector = fixture.debugElement.query(By.css('select')).nativeElement;
    const newSize = '10'; 

    pageSizeSelector.value = newSize;
    pageSizeSelector.dispatchEvent(new Event('change'));

    expect(String(component.pageSize)).toEqual(newSize);
  });

  it('should navigate to edit page when Edit button is clicked', () => {
    fixture.debugElement.nativeElement.querySelector('#dropdown-checkbox-uno').click();
    const editButton = fixture.debugElement.nativeElement.querySelector('.custom-dropdown > ul > li:nth-child(1)');
    editButton.click();
    fixture.detectChanges();
  });

  it('should show modal for delete', () => {
    let productServiceSpy = spyOn(productService, 'delete').and.returnValue(of({ message: 'Product removed successfully' }));
    fixture.debugElement.nativeElement.querySelector('#dropdown-checkbox-uno').click();
    const deleteButton = fixture.debugElement.nativeElement.querySelector('.custom-dropdown > ul > li:nth-child(2)');
    deleteButton.click();
    fixture.detectChanges();
    let confirm = fixture.debugElement.nativeElement.querySelector(".modal.active > div > button.btn.btn-danger")
    confirm.click();
    fixture.detectChanges();
    expect(productServiceSpy).toHaveBeenCalled()
  });

  it('should go to next page when "Next Page" button is clicked', () => {
    component.currentPage = 1;
    const nextPageButton = fixture.debugElement.nativeElement.querySelector('.pagination-btns button.btn-primary:nth-child(2)');
    nextPageButton.click();
    expect(component.currentPage).toBe(2);
  });

  it('should go to previous page when "Previous Page" button is clicked', () => {
    component.currentPage = 2;
    const prevPageButton = fixture.debugElement.nativeElement.querySelector('.pagination-btns button.btn-primary:nth-child(1)');
    prevPageButton.click();
    expect(component.currentPage).toBe(1);
  });

  
});


