import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, OnDestroy, ɵConsole } from '@angular/core';
import { Observable, Subscription, Subject, of } from 'rxjs';
import { filter, map, takeUntil, debounceTime, distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ProductTagsService, ProductsService } from '@eps/services';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { IProducts, IProductTags } from '@eps/models';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbTypeaheadConfig, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import * as fromTags from 'app/ngrx/tags/reducers';
import { TagsActions } from 'app/ngrx/tags/actions';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  providers: [NgbTypeaheadConfig],
})
export class SearchBarComponent implements OnInit {
  @ViewChild('instance', { static: true }) instance: NgbTypeahead;

  // search$: Observable<IProductTags[]>;
  // loading$: Observable<boolean>;
  // error$: Observable<string>;

  searchForm: FormGroup;
  onfocus = false;

  filteredKeywords: any[] = [];
  page = 0;

  searching = false;
  searchFailed = false;

  defaultKeywords: any[] = [
    {
      keyword: 'car sticker',
    },
    {
      keyword: 'school bag',
    },
    {
      keyword: 'men bag',
    },
    {
      keyword: 'mini bag',
    },
    {
      keyword: 'tempered glass',
    },
    {
      keyword: 'winter cap',
    },
    {
      keyword: 'portable fan',
    },
    {
      keyword: 'baby doll',
    },
    {
      keyword: 'girl dress',
    },
    {
      keyword: 'wall sticker',
    },
    {
      keyword: 'plus dress',
    },
  ];

  private unsubscribeAll: Subject<any>;

  constructor(
    private router: Router,
    private productTagsService: ProductTagsService,
    private productsService: ProductsService,
    private formBuilder: FormBuilder,
    private store: Store<fromTags.State>
  ) {
    this.searchForm = this.createSearchForm();
    // this.search$ = store.pipe(select(fromTags.getSearchResults)) as Observable<IProductTags[]>;
    // this.loading$ = store.pipe(select(fromTags.getSearchLoading));
    // this.error$ = store.pipe(select(fromTags.getSearchError));
    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {}

  createSearchForm(): FormGroup {
    return this.formBuilder.group({
      keyword: [''],
    });
  }

  // search(query: string) {
  //   this.store.dispatch(TagsActions.search({ query }));
  // }

  search$ = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      switchMap(query =>
        this.productsService.getTags(query).pipe(
          takeUntil(this.unsubscribeAll),
          filter((res: HttpResponse<string[]>) => res.ok),
          map((res: HttpResponse<string[]>) => res.body.slice(0, 15)),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          })
        )
      ),
      tap(() => (this.searching = false))
    );

  onSearch(event): any {
    event.stopPropagation();
    const data = this.searchForm.getRawValue();
    if (data.keyword.trim().length === 0) {
      return;
    }
    console.log('data.keyword', data.keyword);
    // this.router.navigate(['/search/', data.keyword]);
    this.router.navigate(['/search'], { queryParams: { keyword: data.keyword } });
  }

  onHotKeyChange(value): void {
    this.searchForm.patchValue({ keyword: value });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
