/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { filter, map, takeUntil, debounceTime, distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ProductsService } from '@vertical/services';
import { HttpResponse } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbTypeaheadConfig, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  providers: [NgbTypeaheadConfig],
})
export class SearchBarComponent implements OnInit, OnDestroy {
  @ViewChild('instance', { static: true }) instance: NgbTypeahead;

  searchForm: FormGroup;
  onfocus = false;

  filteredKeywords: any[] = [];
  page = 0;

  searching = false;
  searchFailed = false;

  private unsubscribeAll: Subject<any>;

  constructor(private router: Router, private productsService: ProductsService, private formBuilder: FormBuilder) {
    this.searchForm = this.createSearchForm();
    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {}

  createSearchForm(): FormGroup {
    return this.formBuilder.group({
      keyword: [''],
    });
  }

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
