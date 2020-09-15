import { Component, OnInit, HostListener } from '@angular/core';
import { IProductBrand } from '@vertical/models';
import { ProductBrandService } from '@vertical/services';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { SERVER_API_URL } from '@vertical/constants';

@Component({
  selector: 'app-brand-collection',
  templateUrl: './brand-collection.component.html',
  styleUrls: ['./brand-collection.component.scss'],
})
export class BrandCollectionComponent implements OnInit {
  public blobUrl = SERVER_API_URL + 'services/cloudblob/api/images-extend/';
  brandIndex: any[] = [];
  selectedIndex: any;
  productBrands: IProductBrand[];

  constructor(private productBrandService: ProductBrandService) {
    this.brandIndex = [];
    for (let i = 65; i <= 90; i++) {
      this.brandIndex.push(i);
    }
    this.brandIndex.push(35);
  }

  // @HostListener('window:scroll', ['$event'])
  // onScroll(): void {
  //   const navHeight = document.getElementById('brand-nav').clientHeight;

  //   for (const i of this.brandIndex) {
  //     const el = document.getElementById(i.toString());
  //     console.log(window.pageYOffset, el.offsetTop + 231);
  //     if (window.pageYOffset >= el.offsetTop + 231) {
  //       this.selectedIndex = i;
  //     }
  //   }
  // }

  ngOnInit(): void {
    this.productBrandService
      .query()
      .pipe(
        filter((res: HttpResponse<IProductBrand[]>) => res.ok),
        map((res: HttpResponse<IProductBrand[]>) => res.body.filter(x => x.shortLabel !== 'no_brand'))
      )
      .subscribe(brands => (this.productBrands = brands));
  }

  htmlDecode(code): string {
    // eslint-disable-next-line id-blacklist
    return String.fromCharCode(code);
  }

  scroll(index: number): void {
    // const element = document.querySelector('#' + el);
    const element = document.getElementById(index.toString());
    const navHeight = document.getElementById('brand-nav').clientHeight;

    if (element) {
      element.scrollIntoView(true);
      window.scrollBy({
        behavior: 'smooth',
        top: -navHeight,
      });
    }
  }
}
