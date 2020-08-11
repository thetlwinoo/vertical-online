import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sidebar-content',
  templateUrl: './sidebar-content.component.html',
  styleUrls: ['./sidebar-content.component.scss'],
})
export class SidebarContentComponent implements OnInit {
  @Input() account;
  constructor() {}

  ngOnInit(): void {}
}
