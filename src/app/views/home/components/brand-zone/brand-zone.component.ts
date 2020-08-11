import { Component, OnInit, ViewEncapsulation, Input, OnChanges } from '@angular/core';
import { rootAnimations } from '@eps/animations';
import { SERVER_API_URL } from '@eps/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'brand-zone',
  templateUrl: './brand-zone.component.html',
  styleUrls: ['./brand-zone.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: rootAnimations,
})
export class BrandZoneComponent implements OnInit, OnChanges {
  @Input() data: any[];

  public blobUrl = SERVER_API_URL + 'services/cloudblob/api/images-extend/';
  noBrandList: any[] = [];
  gridStyle = {
    width: '25%',
    textAlign: 'center',
  };
  // noBrand = {
  //   title: 'Brand8',
  //   icon: 'your-brand.png',
  // };
  currentTabIndex;
  currentTab;
  title = 'featured brand';
  constructor(private router: Router) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.data) {
      const length = this.data.length;
      this.noBrandList = new Array(20 - length);
    }
  }

  // selectedTabIndexChanged(index): void {
  //   this.currentTabIndex = index;
  // }

  selectedTabChanged(event, index): void {
    this.currentTab = event;
    this.currentTabIndex = index;
  }

  seeAll(): void {}

  onTabClick(event): void {
    console.log('click', event);
    this.router.navigate(['/search'], { queryParams: { brandId: event.id } });
  }
}
