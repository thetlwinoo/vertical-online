import { Pipe, PipeTransform } from '@angular/core';
import { AddressTypes } from 'app/core/e-commerce/_models';

@Pipe({
  name: 'addressTypePipe'
})
export class AddressTypePipe implements PipeTransform {

  transform(addressTypes: AddressTypes[], args?: any): any {
    if (addressTypes == null) return null;

    return addressTypes.filter(t => {
        return t.addressTypeName.includes("Home") || t.addressTypeName.includes("Office");
    });
  }

}
