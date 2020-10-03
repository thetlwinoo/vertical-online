import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'webImages' })
export class WebImagesPipe implements PipeTransform {
  transform(value: any[], item: string): unknown {
    if (!value || !item) {
      return null;
    }

    return value.find(x => x.webImageTypeHandle === item)?.children || [];
  }
}
