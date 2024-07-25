import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pagination',
  standalone: true
})
export class PaginationPipe implements PipeTransform {

  transform(items: any[], currentPage: number = 1, pageSize: number = 5): any[] {
    if (!items || items.length === 0) {
      return [];
    }
    const startIndex = (currentPage - 1) * pageSize;
    return items.slice(startIndex, startIndex + pageSize );
  }
  
}
