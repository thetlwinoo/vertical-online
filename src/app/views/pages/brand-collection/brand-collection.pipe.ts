import { Pipe, PipeTransform } from '@angular/core';
import { IProductBrand } from '@vertical/models';

@Pipe({
  name: 'brandCollection',
})
export class BrandCollectionPipe implements PipeTransform {
  transform(value: IProductBrand[], item: string): unknown {
    if (!value || !item) {
      return [];
    }

    if (item === '#') {
      return value.filter(x => {
        const reg = new RegExp('^[^A-Za-z]');
        const match = reg.test(x.name);
        return match;
      });
    } else {
      return value.filter(x => x.name.toUpperCase().startsWith(item));
    }
  }
}
