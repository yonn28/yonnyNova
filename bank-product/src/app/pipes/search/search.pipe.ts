import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(products: any[] | unknown, searchTerm: string): any[] {
    if (!(products instanceof Array)) {
      return [];
    }

    if (products && !searchTerm) {
      return products;
    }

    searchTerm = searchTerm.toLowerCase();

    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) 
    );
  }

}
