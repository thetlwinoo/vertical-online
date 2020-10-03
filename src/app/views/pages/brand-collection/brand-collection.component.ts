import { Component, OnInit, HostListener } from '@angular/core';
import { IProductBrand } from '@vertical/models';
import { ProductBrandService } from '@vertical/services';
import { filter, map, takeUntil } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { SERVER_API_URL } from '@vertical/constants';
import { Subject, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromWebSitemap from 'app/ngrx/web-sitemap/reducers';
import { BrandCollectionPageActions } from 'app/ngrx/web-sitemap/actions';

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

  brandCollection$: Observable<any>;
  brandCollection: any;
  slides: any;
  error$: Observable<string>;

  private unsubscribe$: Subject<any> = new Subject();

  constructor(private productBrandService: ProductBrandService, private store: Store<fromWebSitemap.State>) {
    this.brandIndex = [];
    for (let i = 65; i <= 90; i++) {
      this.brandIndex.push(i);
    }
    this.brandIndex.push(35);

    this.brandCollection$ = store.pipe(select(fromWebSitemap.getBrandCollectionPage));
    this.error$ = store.pipe(takeUntil(this.unsubscribe$), select(fromWebSitemap.getBrandCollectionPageError));
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
      .query({
        'activeFlag.equals': true,
      })
      .pipe(
        filter((res: HttpResponse<IProductBrand[]>) => res.ok),
        map((res: HttpResponse<IProductBrand[]>) => res.body.filter(x => x.shortLabel !== 'no_brand'))
      )
      .subscribe(brands => (this.productBrands = brands));

    this.store.dispatch(BrandCollectionPageActions.fetchBrandCollectionPage());

    this.brandCollection$.pipe(takeUntil(this.unsubscribe$)).subscribe(payload => {
      this.brandCollection = payload;

      if (payload && payload.contents) {
        this.slides = payload.contents.find(x => x.webImageTypeHandle === 'sub-banner-wide');
      }
    });
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
