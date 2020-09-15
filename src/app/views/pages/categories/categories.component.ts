import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { banner2 } from '@vertical/config/owl-carousel';
import { FetchActions } from 'app/ngrx/products/actions';
import { SERVER_API_URL } from '@vertical/constants';
import { Subject, Observable } from 'rxjs';
import { IProductCategory } from '@vertical/models';
import { Store, select } from '@ngrx/store';
import * as fromProducts from 'app/ngrx/products/reducers';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, map } from 'rxjs/operators';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { rootAnimations } from '@vertical/animations';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  animations: rootAnimations,
})
export class CategoriesComponent implements OnInit, OnDestroy {
  public blobUrl = SERVER_API_URL + 'services/cloudblob/api/images-extend/';

  categoriesTree$: Observable<IProductCategory[]>;
  categoriesTreeLoading$: Observable<boolean>;
  carousel: any;
  selectedCategory: any;
  selectedIndex: any;
  categoryId: number;
  childIds: number[] = [];

  options: OwlOptions = {
    loop: true,
    nav: false,
    lazyLoad: true,
    autoplay: false,
    dots: false,
    autoplayTimeout: 5000,
    items: 6,
    responsive: {
      0: {
        items: 3,
      },
      576: {
        items: 4,
      },
      768: {
        items: 5,
      },
      992: {
        items: 6,
      },
    },
  };

  private unsubscribe$: Subject<any> = new Subject();

  constructor(private store: Store<fromProducts.State>, protected activatedRoute: ActivatedRoute) {
    this.carousel = banner2;
    this.categoriesTree$ = store.pipe(select(fromProducts.getFetchCategoriesTree));
    this.categoriesTreeLoading$ = store.pipe(select(fromProducts.getFetchCategoriesTreeLoading));

    this.activatedRoute.params.pipe(takeUntil(this.unsubscribe$)).subscribe(params => {
      this.categoryId = +params.id;
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    const navHeight = document.getElementById('category-nav').clientHeight;
    const firstEl = document.getElementById(this.childIds[0].toString());

    for (const i of this.childIds) {
      const el = document.getElementById(i.toString());
      if (window.pageYOffset >= el.offsetTop - (navHeight + 16)) {
        this.selectedIndex = i;
      } else if (window.pageYOffset < firstEl.offsetTop - (navHeight + 16)) {
        this.selectedIndex = -1;
      }
    }
  }

  ngOnInit(): void {
    this.store.dispatch(FetchActions.fetchCategoriesTree());

    this.categoriesTree$.pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
      const category = data.filter(x => x.id === this.categoryId)[0];
      this.selectedCategory = category;

      this.childIds = [];

      if (this.selectedCategory?.children) {
        this.selectedCategory.children.map(item => this.childIds.push(item.id));
      }

      console.log(this.selectedCategory);
    });
  }

  scroll(el: string): void {
    const element = document.getElementById(el);
    const navHeight = document.getElementById('category-nav').clientHeight;

    if (element) {
      element.scrollIntoView(true);
      window.scrollBy({
        behavior: 'smooth',
        top: -navHeight,
      });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
