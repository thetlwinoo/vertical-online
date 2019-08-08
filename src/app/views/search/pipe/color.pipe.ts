import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'color'
})
export class ColorPipe implements PipeTransform {

  transform(items: any[], filters: any[]): any {    
    if (!items) return [];
    if (filters.length <= 0) return items;

    console.log('color filter',filters)
    let filteredItems = [];
    items.forEach(item => {
      filters.forEach(filter => {
        if (item.color == filter) {
          filteredItems.push(item);
        }
      })
    })
    return filteredItems;
  }

}
