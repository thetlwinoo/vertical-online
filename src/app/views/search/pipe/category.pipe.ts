import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(items: any[], filters: string[]): any {
    if (!items) return [];
    if (filters.length <= 0) return items;

    let filteredItems = [];
    items.forEach(item => {
      filters.forEach(filter => {
        if (item.productSubCategory.productSubCategoryName == filter) {
          filteredItems.push(item);
        }
      })
    })
    return filteredItems;
  }

}
