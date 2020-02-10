import { Component, OnInit } from '@angular/core';
import { rootAnimations } from '@eps/animations';

@Component({
  selector: 'brand-zone',
  templateUrl: './brand-zone.component.html',
  styleUrls: ['./brand-zone.component.scss'],
  animations: rootAnimations
})
export class BrandZoneComponent implements OnInit {
  brands = [
    {
      'title': 'Brand1',
      'icon': 'br1'
    },
    {
      'title': 'Brand2',
      'icon': 'br2'
    },
    {
      'title': 'Brand3',
      'icon': 'br3'
    },
    {
      'title': 'Brand4',
      'icon': 'br4'
    },
    {
      'title': 'Brand5',
      'icon': 'br5'
    },
    {
      'title': 'Brand6',
      'icon': 'br6'
    },
    {
      'title': 'Brand7',
      'icon': 'br7'
    },
    {
      'title': 'Brand8',
      'icon': 'br8'
    },
    {
      'title': 'Brand9',
      'icon': 'br9'
    },
    {
      'title': 'Brand10',
      'icon': 'br10'
    },
    {
      'title': 'Brand11',
      'icon': 'br11'
    },
    {
      'title': 'Brand12',
      'icon': 'br12'
    },
    {
      'title': 'Brand13',
      'icon': 'br13'
    },
    {
      'title': 'Brand14',
      'icon': 'br14'
    },
    {
      'title': 'Brand15',
      'icon': 'br15'
    },
    {
      'title': 'Brand16',
      'icon': 'br16'
    },
    {
      'title': 'Brand17',
      'icon': 'br17'
    },
    {
      'title': 'Brand18',
      'icon': 'br18'
    },
    {
      'title': 'Brand19',
      'icon': 'br19'
    },
    {
      'title': 'Brand20',
      'icon': 'br20'
    },
  ];
  constructor() { }

  ngOnInit() {
  }

}
