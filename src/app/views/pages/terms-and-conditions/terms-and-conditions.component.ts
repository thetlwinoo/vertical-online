import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { rootAnimations } from '@eps/animations';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: rootAnimations,
})
export class TermsAndConditionsComponent implements OnInit {
  pageTitle: string = null;
  private unsubscribe$: Subject<any> = new Subject();

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
      this.pageTitle = data.pageTitle;
    });
  }
}
