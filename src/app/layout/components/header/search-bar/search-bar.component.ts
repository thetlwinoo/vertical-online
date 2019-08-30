import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, OnDestroy, ɵConsole } from '@angular/core';
import { Observable, Subscription, Subject, of } from "rxjs";
import { filter, map, takeUntil, debounceTime, distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';
import { Router } from "@angular/router";
import { ProductsService } from '@root/services';
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { IProducts } from '@root/models';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbTypeaheadConfig, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';

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
    private productsService: ProductsService,
    private formBuilder: FormBuilder,
    // config: NgbTypeaheadConfig
  ) {
    this.searchForm = this.createSearchForm();
    // config.showHint = false;
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
  }

  createSearchForm(): FormGroup {
    return this.formBuilder.group({
      keyword: [''],
    });
  }

  search$ = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(query =>
        this.productsService.search({
          size: 10,
          'productName.contains': query
        }).pipe(
          takeUntil(this._unsubscribeAll),
          filter((res: HttpResponse<IProducts[]>) => res.ok),
          map((res: HttpResponse<IProducts[]>) => res.body.map(product => product.productName)),
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
    console.log('data.keyword', data.keyword)
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
