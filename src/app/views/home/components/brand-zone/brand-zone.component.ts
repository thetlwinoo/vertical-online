import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { rootAnimations } from '@eps/animations';

@Component({
  selector: 'brand-zone',
  templateUrl: './brand-zone.component.html',
  styleUrls: ['./brand-zone.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: rootAnimations,
})
export class BrandZoneComponent implements OnInit {
  brands = [
    {
      title: 'Icon Notebook',
      icon: 'icon-notebook.png',
    },
    {
      title: 'Mi',
      icon: 'mi.png',
    },
    {
      title: 'Rangoon Tech',
      icon: 'rangoon-tech.png',
    },
    {
      title: 'Serangoon',
      icon: 'serangoon.png',
    },
    {
      title: 'Latyartaw',
      icon: 'latyartaw.png',
    },
    {
      title: 'Brand6',
      icon: 'your-brand.png',
    },
    {
      title: 'Brand7',
      icon: 'your-brand.png',
    },
    {
      title: 'Brand8',
      icon: 'your-brand.png',
    },
    {
      title: 'Brand9',
      icon: 'your-brand.png',
    },
    {
      title: 'Brand10',
      icon: 'your-brand.png',
    },
    {
      title: 'Brand11',
      icon: 'your-brand.png',
    },
    {
      title: 'Brand12',
      icon: 'your-brand.png',
    },
    {
      title: 'Brand13',
      icon: 'your-brand.png',
    },
    {
      title: 'Brand14',
      icon: 'your-brand.png',
    },
    {
      title: 'Brand15',
      icon: 'your-brand.png',
    },
    {
      title: 'Brand16',
      icon: 'your-brand.png',
    },
    {
      title: 'Brand17',
      icon: 'your-brand.png',
    },
    {
      title: 'Brand18',
      icon: 'your-brand.png',
    },
    {
      title: 'Brand19',
      icon: 'your-brand.png',
    },
    {
      title: 'Brand20',
      icon: 'your-brand.png',
    },
  ];
  title = 'featured brand';
  constructor() {}

  ngOnInit() {}
}
