import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Observable, Subscription } from "rxjs";
  import { take, filter, map } from 'rxjs/operators';
import { Router } from "@angular/router";
import { ProductsService } from 'app/core/e-commerce/_services';
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { IProducts } from 'app/core/e-commerce/_models';

@Component({
  selector: 'search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {
  @Input() query = '';
  @Input() searching = false;
  @Input() error = '';
  @Input() keywords: any;
  @Output() search = new EventEmitter<string>();
  @Output() summit = new EventEmitter<any>();
  @ViewChild('boxsearch', { static: false }) boxsearch: ElementRef;
  private subscriptions: Subscription[] = [];

  onfocus: boolean = false;

  filteredKeywords: any[] = [];
  keyword: any;
  page: number = 0;

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
    private productsService: ProductsService
  ) { }

  ngOnInit() {
  }

  filterKeywords(event) {
    const searchSubscription = this.productsService.searchProduct(this.page, event.query)
      .pipe(
        filter((res: HttpResponse<IProducts[]>) => res.ok),
        map((res: HttpResponse<IProducts[]>) => res.body)
      )
      .subscribe(
        (data: any) => {
          console.log('data',data)          
          this.filteredKeywords = data;
        }
      );
    this.subscriptions.push(searchSubscription);
  }

  searchProduct(search: string) {
    if (search.trim().length === 0) {
      return;
    }
    let url = '/search/' + search;
    this.router.navigate([url]);
  }

  onClickSearch(event) {
    this.searchProduct(this.keyword.productName ? this.keyword.productName : this.keyword);
  }

  onKeySearch(event) {
    if (event.isTrusted && event.key == "Enter") {
      this.searchProduct(this.keyword.productName ? this.keyword.productName : this.keyword);
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(el => {
      if (el) el.unsubscribe();
    });
  }
}
