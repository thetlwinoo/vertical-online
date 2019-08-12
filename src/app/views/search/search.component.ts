import { Component, HostListener, OnInit } from '@angular/core';
import { ProductService } from "@root/services";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/catch';
import { ProductDisplay } from "app/ngrx/cart/cart.reducer";
import { Observable } from "rxjs/Observable";
import { ColorFilter } from '@root/models';
import { TreeNode, SelectItem } from 'primeng/api';
import { RootSidebarService } from '@root/components/sidebar/sidebar.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  querySubscribe: Subscription;
  // page: number = 0;
  keyword: string;
  canFetch: boolean = false;

  public categories: any[] = [];
  public categoriesTree: any;
  public colors: any[] = [];
  public price: any;
  public rangePrice: any = [0,0];

  products: any[] = [];
  public filteredItems: any[] = [];

  public colorFilters: ColorFilter[] = [];
  public categoriesFilters: any[] = [];
  public priceFilters: any[] = [];

  public dataViewOptions = {
    loading: true,
    layout: 'grid'
  };

  sortOptions: SelectItem[];
  sortKey: string;
  sortField: string;
  sortOrder: number;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private rootSidebarService: RootSidebarService
  ) { }

  ngOnInit() {
    console.log('search init')
    this.querySubscribe = this.route.params.subscribe((params: Params) => {
      this.keyword = params['keyword'];
      this.productService.searchProductAll(this.keyword)
        .take(1)
        .catch(error => {
          this.canFetch = false;
          return Observable.throw(error);
        })
        .subscribe(data => {
          console.log('search result', data)
          this.products = data;
          this.filteredItems = data;
          // this.page++;
          this.getFilters(data);

          if (data.length != 0) {
            this.canFetch = true;
          }
        });
    });

    this.sortOptions = [
      { label: 'Price', value: 'unitPrice' },
      { label: 'Top Sales', value: 'sellCount' },
      { label: 'Name', value: 'productName' }
    ];
  }

  public getFilters(products) {
    var uniqueColors = [];
    var itemColor = Array();

    var uniqueCategories = [];
    // var itemCategory = Array();
    const categoryMap = new Map();

    var minPrice: number = 0;
    var maxPrice: number = 0;

    products.map((product, index) => {

      if (index == 0) {
        minPrice = product.unitPrice;
        maxPrice = product.unitPrice;
      }

      if (product.color) {
        const index = uniqueColors.indexOf(product.color);
        if (index === -1) uniqueColors.push(product.color);
      }


      if (product.productSubCategory) {
        // const index = uniqueCategories.indexOf(product.productSubCategory);
        // if (index === -1) uniqueCategories.push(product.productSubCategory);

        if (!categoryMap.has(product.productSubCategory.id)) {
          categoryMap.set(product.productSubCategory.id, true);
          uniqueCategories.push(product.productSubCategory);
        }
      }

      
      if (product.unitPrice) {
        if (product.unitPrice < minPrice) minPrice = product.unitPrice;
        if (product.unitPrice > maxPrice) maxPrice = product.unitPrice;
      }
    });

    //color
    for (var i = 0; i < uniqueColors.length; i++) {
      itemColor.push({ color: uniqueColors[i] })
    }
    this.colors = itemColor;

    console.log('colors', this.colors);

    //category
    // for (var i = 0; i < uniqueCategories.length; i++) {
    //   itemCategory.push({ category: uniqueCategories[i] })
    // }
    // this.categories = itemCategory;

    console.log('categories', uniqueCategories);
    this.generateCategoriesTree(uniqueCategories);

    this.price = {
      'minPrice': minPrice,
      'maxPrice': maxPrice
    };

    this.rangePrice = [minPrice, maxPrice];
    console.log('price', this.price);
  }

  onSortChange(event) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    }
    else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  private generateCategoriesTree(subCategories) {
    const categories = [];
    const map = new Map();

    for (const item of subCategories) {
      const category = item.productCategory;
      if (!map.has(category.id)) {
        map.set(category.id, true);    // set any value to Map
        categories.push({
          id: category.id,
          label: category.productCategoryName,
          data: category.productCategoryName,
          type: "collapsable",
          expandedIcon: "fa fa-folder-open",
          children: []
        });
      }
    }

    for (const category of categories) {
      subCategories.map(item => {
        if (category.id == item.productCategory.id) {
          category.children.push({
            id: item.id,
            label: item.productSubCategoryName,
            data: item.productSubCategoryName,
            icon: "fa fa-file-word-o",
            type: "item",
            status: "A"
          })
        }
      })
    }

    console.log('category', categories)
    this.categoriesTree = categories;
  }

  updateCategories(categories: any[]) {
    const _filter = Array();
    categories.map((item, index) => {
      if (item.type == "item") {
        _filter.push(item.label);
      }
    });
    this.categoriesFilters = _filter;

    console.log('filter', this.categoriesFilters)
  }

  public updateColorFilters(colors: ColorFilter[]) {
    this.colorFilters = colors;
  }

  public updatePriceFilters(price: any) {
    const temp: any[] = [];
    this.filteredItems.filter((item: any) => {
      if (item.unitPrice >= price[0] && item.unitPricef <= price[1]) {
        temp.push(item);
      }
    });

    this.products = temp;
  }

  updateCondition(condition: any[]) {
    console.log(condition);
  }

  toggleSidebar(name): void
    {
        this.rootSidebarService.getSidebar(name).toggleOpen();
    }
  // @HostListener('window:scroll', ['$event'])
  // onScroll($event: Event): void {
  //   if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
  //     console.log(this.canFetch);
  //     if (this.canFetch) {
  //       this.productService.searchProduct(this.page, this.keyword)
  //         .take(1)
  //         .catch(error => {
  //           this.canFetch = false;
  //           return Observable.throw(error);
  //         })
  //         .subscribe(data => {
  //           this.products.push(...data);
  //           this.page++;
  //           if (data.length == 0) {
  //             this.canFetch = false;
  //           }
  //         });
  //     }
  //   }
  // }
}
