import { Component, OnInit, Input } from '@angular/core';
import { CloudinaryModel, Orders } from 'app/core/e-commerce/_models';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'review-details',
  templateUrl: './review-details.component.html',
  styleUrls: ['./review-details.component.scss']
})
export class ReviewDetailsComponent implements OnInit { 
  @Input() orders;
  constructor() { }

  ngOnInit() {
  }

  getRatingDescription(id: number) {
    switch (id) {
      case 1: {
        return "Extremely Bad";
        break;
      }
      case 2: {
        return "Dissatisfied";
        break;
      }
      case 3: {
        return "Fair";
        break;
      }
      case 4: {
        return "Satisfied";
        break;
      }
      case 5: {
        return "Delighted";
        break;
      }
      default: {
        return "";
        break;
      }
    }
  }
  getSellerRatingDescription(id: number) {
    switch (id) {
      case 1: {
        return "Negative";
        break;
      }
      case 2: {
        return "Neutral";
        break;
      }
      case 3: {
        return "Positive";
        break;
      }
      default: {
        return "";
        break;
      }
    }
  }
}
