import { ViewEncapsulation, Component, EventEmitter, OnInit, Output, OnDestroy, Input, OnChanges } from '@angular/core';
import { rootAnimations } from '@eps/animations';
import { Subject, Observable } from 'rxjs';
import { map, takeUntil, zip } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { FetchActions } from 'app/ngrx/tags/actions';
import { Store, select } from '@ngrx/store';
import * as fromTags from 'app/ngrx/tags/reducers';

@Component({
  selector: 'product-brand',
  templateUrl: './product-brand.component.html',
  styleUrls: ['./product-brand.component.scss'],
  animations: rootAnimations,
  encapsulation: ViewEncapsulation.None,
})
export class ProductBrandComponent implements OnInit, OnChanges, OnDestroy {
  @Input() brands;
  @Output() selectedBrands: EventEmitter<any> = new EventEmitter<any>();
  // colors$: Observable<string[]>;
  title = 'Related Brand';

  private unsubscribeAll: Subject<any> = new Subject();

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {}

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
