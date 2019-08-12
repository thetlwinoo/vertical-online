import { Pipe, PipeTransform } from '@angular/core';
import { Addresses } from '@root/models';

@Pipe({
  name: 'defaultAddress'
})
export class DefaultAddressPipe implements PipeTransform {

  transform(addresses: Addresses[], args?: any): any {
    if (addresses == null) return null;

    return addresses.filter(t => t.defaultInd == true);
  }

}
