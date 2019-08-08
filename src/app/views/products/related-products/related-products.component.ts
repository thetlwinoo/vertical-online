import { Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { ProductService } from "app/core/e-commerce/_services";
import { HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Products, IProducts } from 'app/core/e-commerce/_models';
import { Subscription } from "rxjs/Subscription";
import { ActivatedRoute, Params, Router } from "@angular/router";
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'related-products',
  templateUrl: './related-products.component.html',
  styleUrls: ['./related-products.component.scss']
})
export class RelatedProductsComponent implements OnInit, OnDestroy {
  // @Input() product;
  // @Input() carousel;
  // @Input() searching = false;
  // @Input() error = '';
  fetchError: HttpErrorResponse = null;
  paramSubscription: Subscription;
  innerLoading: boolean = true;
  relatedProducts: IProducts[];
  id: number;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.paramSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.productService.getRelatedProducts(this.id)
          .take(1)
          .catch(error => {
            this.fetchError = error;
            this.innerLoading = false;
            return Observable.throw(error);
          })
          .subscribe(
            (data: IProducts[]) => {
              this.relatedProducts = data;
              console.log(this.relatedProducts)
              this.innerLoading = false;
            }
          )
      }
    );
  }

  ngOnDestroy() {
    if (this.paramSubscription != null) {
      this.paramSubscription.unsubscribe();
    }
  }

  public productSlideConfig: any = {
    infinite: true,
    speed: 300,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    arrows: false,
    prevArrow: '.prev',
    nextArrow: '.next',
    responsive: [{
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3
      }
    },
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3
      }
    },
    {
      breakpoint: 420,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    }
    ]
  };
}
