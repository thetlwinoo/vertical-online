import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, OnDestroy, ɵConsole } from '@angular/core';
import { Observable, Subscription, Subject, of } from "rxjs";
import { filter, map, takeUntil, debounceTime, distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';
import { Router } from "@angular/router";
import { ProductTagsService } from '@eps/services';
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
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
  providers: [NgbTypeaheadConfig]
})
export class SearchBarComponent implements OnInit {
  @ViewChild('instance', { static: true }) instance: NgbTypeahead;
  private _unsubscribeAll: Subject<any>;
  private subscriptions: Subscription[] = [];

  // search$: Observable<IProductTags[]>;
  // loading$: Observable<boolean>;
  // error$: Observable<string>;

  searchForm: FormGroup;
  onfocus: boolean = false;

  filteredKeywords: any[] = [];
  page: number = 0;

  searching = false;
  searchFailed = false;

  defaultKeywords: any[] = [
    {
      'keyword': 'car sticker'
    },
    {
      'keyword': 'school bag'
    },
    {
      'keyword': 'men bag'
    },
    {
      'keyword': 'mini bag'
    },
    {
      'keyword': 'tempered glass'
    },
    {
      'keyword': 'winter cap'
    },
    {
      'keyword': 'portable fan'
    },
    {
      'keyword': 'baby doll'
    },
    {
      'keyword': 'girl dress'
    },
    {
      'keyword': 'wall sticker'
    },
    {
      'keyword': 'plus dress'
    }
  ];

  constructor(
    private router: Router,
    private productTagsService: ProductTagsService,
    private formBuilder: FormBuilder,
    private store: Store<fromTags.State>,
  ) {
    this.searchForm = this.createSearchForm();
    // this.search$ = store.pipe(select(fromTags.getSearchResults)) as Observable<IProductTags[]>;
    // this.loading$ = store.pipe(select(fromTags.getSearchLoading));
    // this.error$ = store.pipe(select(fromTags.getSearchError));
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
  }

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
      tap(() => this.searching = true),
      switchMap(query =>
        this.productTagsService.query({
          'tagName.contains': query
        }).pipe(
          takeUntil(this._unsubscribeAll),
          filter((res: HttpResponse<IProductTags[]>) => res.ok),
          map((res: HttpResponse<IProductTags[]>) => res.body.slice(0, 15)),
          map(tags => [...new Set(tags.map(item => item.tagName))]),
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    )

  onSearch(event) {
    event.stopPropagation();
    const data = this.searchForm.getRawValue();
    if (data.keyword.trim().length === 0) {
      return;
    }
    this.router.navigate(['/search/', data.keyword]);
  }

  onHotKeyChange(value) {
    this.searchForm.patchValue({ keyword: value });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(el => {
      if (el) el.unsubscribe();
    });

    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
