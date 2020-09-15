import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { store } from '@vertical/config/owl-carousel';
import { rootAnimations } from '@vertical/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'official-stores',
  templateUrl: './official-stores.component.html',
  styleUrls: ['./official-stores.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: rootAnimations,
})
export class OfficialStoresComponent implements OnInit {
  @Input() data: any[];
  @Input() loading;
  @Input() error;
  carousel: any;
  ghosts = [];
  title = 'official stores';

  constructor(private router: Router) {
    this.carousel = store;
    this.ghosts = new Array(10);
  }

  ngOnInit(): void {}

  shopMore(): void {
    this.router.navigate(['/pages/official-stores']);
  }
}
