import { Component, OnInit } from '@angular/core';
import { category } from '@root/config/owl-carousel';
import { rootAnimations } from '@root/animations';

@Component({
  selector: 'product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss'],
  animations: rootAnimations
})
export class ProductCategoryComponent implements OnInit {
  carousel: any;
  bundles: any[] = [];
  categories = [
    {
      "id": "c01",
      "label": "Women's Clothing",
      "data": "Women's Clothing",
      "expandedIcon": "fa fa-folder-open",
      "type": "collapsable",
      "theme": {
        "icon": "cag1"
      },
      "children": [
        {
          "id": "c01001",
          "label": "Dresses",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item",
          "status": "A"
        },
        {
          "id": "c01002",
          "label": "Sweaters",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c01003",
          "label": "Bottoms",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c01004",
          "label": "Intimates",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c01005",
          "label": "Suits & Sets",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c01006",
          "label": "Blouses & Shirts",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c01007",
          "label": "Jackets & Coats",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c01008",
          "label": "Rompers",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c01009",
          "label": "Jumpsuits",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c01010",
          "label": "Socks & Hosiery",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c01011",
          "label": "Hoodies & Sweatshirts",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c01012",
          "label": "Accessories",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c01013",
          "label": "Tops & Tees",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c01014",
          "label": "Bodysuits",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c01015",
          "label": "Sleep & Lounge",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
      ]
    },
    {
      "id": "c02",
      "label": "Men's Clothing",
      "data": "Men's Clothing",
      "expandedIcon": "fa fa-folder-open", "type": "collapsable",
      "theme": {
        "icon": "cag2"
      },
      "children": [
        {
          "id": "c02001",
          "label": "Hoodies & Sweatshirts",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c02002",
          "label": "Pants",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c02003",
          "label": "Underwear",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c02004",
          "label": "Suits & Blazers",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c02005",
          "label": "Socks",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c02006",
          "label": "Tops & Tees",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c02007",
          "label": "Shirts",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c02008",
          "label": "Accessories",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c02009",
          "label": "Sleep & Lounge",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c02010",
          "label": "Men's Sets",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c02011",
          "label": "Jackets & Coats",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c02012",
          "label": "Jeans",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c02013",
          "label": "Sweaters",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c02014",
          "label": "Casual Shorts",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c02015",
          "label": "Board Shorts",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
      ]
    },
    {
      "id": "c03",
      "label": "Telecommunications",
      "data": "Telecommunications",
      "expandedIcon": "fa fa-folder-open", "type": "collapsable",
      "theme": {
        "icon": "cag3"
      },
      "children": [
        {
          "id": "c03001",
          "label": "Mobile Phones",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c03002",
          "label": "Mobile Phone Accessories",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c03003",
          "label": "Phone Bags & Cases",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c03004",
          "label": "Mobile Phone Parts",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c03005",
          "label": "Power Bank",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c03006",
          "label": "Communication Equipments",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        }
      ]
    },
    {
      "id": "c04",
      "label": "Computer & Office",
      "data": "Computer & Office",
      "expandedIcon": "fa fa-folder-open", "type": "collapsable",
      "theme": {
        "icon": "cag4"
      },
      "children": [
        {
          "id": "c04001",
          "label": "Office Electronics",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c04002",
          "label": "Tablet Accessories",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c04003",
          "label": "Networking",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c04004",
          "label": "Mini PC",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c04005",
          "label": "Industrial Computer & Accessories",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c04006",
          "label": "Laptops",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c04007",
          "label": "Office Software",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c04008",
          "label": "Tablets",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c04009",
          "label": "Computer Peripherals",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c04010",
          "label": "Memory Cards & SSD",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c04011",
          "label": "Demo Board & Accessories",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c04012",
          "label": "DIY Gaming PC",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c04013",
          "label": "Laptop Accessories",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c04014",
          "label": "Computer Components",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c04015",
          "label": "External Storage",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c04016",
          "label": "Cables & Connectors",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c04017",
          "label": "Desktops & Servers",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c04018",
          "label": "Computer Cleaners",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c04019",
          "label": "Gaming Laptops",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
      ]
    },
    {
      "id": "c05",
      "label": "Consumer Electronics",
      "data": "Consumer Electronics",
      "expandedIcon": "fa fa-folder-open", "type": "collapsable",
      "theme": {
        "icon": "cag5"
      },
      "children": [
        {
          "id": "c05001",
          "label": "Camera & Photo",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c05002",
          "label": "Smart Electronics",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c05003",
          "label": "Video Games",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c05004",
          "label": "VR/AR Devices",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c05005",
          "label": "Home Electronic Accessories",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c05006",
          "label": "HIFI Devices",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c05007",
          "label": "Portable Audio & Video",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c05008",
          "label": "Accessories & Parts",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c05009",
          "label": "Earphones & Headphones",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c05010",
          "label": "Sports & Action Video Cameras",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c05011",
          "label": "Speakers",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c05012",
          "label": "Live Equipment",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c05013",
          "label": "Home Audio & Video",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c05014",
          "label": "Electronic Cigarettes",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c05015",
          "label": "Wearable Devices",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c05016",
          "label": "360° Video Cameras & Accessories",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c05017",
          "label": "Robot",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c05018",
          "label": "Power Source",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        }
      ]
    },
    {
      "id": "c06",
      "label": "Jewelry & Accessories",
      "data": "Jewelry & Accessories",
      "expandedIcon": "fa fa-folder-open", "type": "collapsable",
      "theme": {
        "icon": "cag6"
      },
      "children": [
        {
          "id": "c06001",
          "label": "Fine Jewelry",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c06002",
          "label": "Rings",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c06003",
          "label": "Beads & Jewelry Making",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c06004",
          "label": "Necklaces & Pendants",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c06005",
          "label": "Bracelets & Bangles",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c06006",
          "label": "Wedding & Engagement Jewelry",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c06007",
          "label": "Earrings",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c06008",
          "label": "Jewelry Sets & More",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        }
      ]
    },
    {
      "id": "c07",
      "label": "Home & Garden",
      "data": "Home & Garden",
      "expandedIcon": "fa fa-folder-open", "type": "collapsable",
      "theme": {
        "icon": "cag7"
      },
      "children": [
        {
          "id": "c07001",
          "label": "Kitchen,Dining & Bar",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c07002",
          "label": "Arts,Crafts & Sewing",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c07003",
          "label": "Bathroom Products",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c07004",
          "label": "Garden Supplies",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c07005",
          "label": "Home Decor",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c07006",
          "label": "Festive & Party Supplies",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c07007",
          "label": "Household Cleaning",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c07008",
          "label": "Household Merchandises",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c07009",
          "label": "Home Textile",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c07010",
          "label": "Home Storage & Organization",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c07011",
          "label": "Pet Products",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        }
      ]
    },
    {
      "id": "c08",
      "label": "Luggage & Bags",
      "data": "Luggage & Bags",
      "expandedIcon": "fa fa-folder-open", "type": "collapsable",
      "theme": {
        "icon": "cag8"
      },
      "children": [
        {
          "id": "c08001",
          "label": "Women's Bags",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c08002",
          "label": "Wallets",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c08003",
          "label": "Functional Bags",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c08004",
          "label": "Men's Bags",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c08005",
          "label": "Kids & Baby's Bags",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c08006",
          "label": "Coin Purses & Holders",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c08007",
          "label": "Backpacks",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c08008",
          "label": "Luggage & Travel Bags",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c08009",
          "label": "Bag Parts & Accessories",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        }
      ]
    },
    {
      "id": "c09",
      "label": "Shoes",
      "data": "Shoes",
      "expandedIcon": "fa fa-folder-open", "type": "collapsable",
      "theme": {
        "icon": "cag9"
      },
      "children": [
        {
          "id": "c09001",
          "label": "Women's Shoes",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c09002",
          "label": "Men's Shoes",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c09003",
          "label": "Men's Vulcanize Shoes",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c09004",
          "label": "Shoe Accessories",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c09005",
          "label": "Women's Flats",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c09006",
          "label": "Men's Casual Shoes",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c09007",
          "label": "Women's Boots",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c09008",
          "label": "Women's Pumps",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c09009",
          "label": "Women's Vulcanize Shoes",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c09010",
          "label": "Men's Boots",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        }
      ]
    },
    {
      "id": "c10",
      "label": "Mother & Kids",
      "data": "Mother & Kids",
      "expandedIcon": "fa fa-folder-open", "type": "collapsable",
      "theme": {
        "icon": "cag10"
      },
      "children": [
        {
          "id": "c10001",
          "label": "Girls' Baby Clothing",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c10002",
          "label": "Boys' Clothing",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c10003",
          "label": "Baby Care",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c10004",
          "label": "Baby Bedding",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c10005",
          "label": "Toilet Training",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c10006",
          "label": "Baby Furniture",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c10007",
          "label": "Boys' Baby Clothing",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c10008",
          "label": "Baby Shoes",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c10009",
          "label": "Activity & Gear",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c10010",
          "label": "Feeding",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c10011",
          "label": "Pregnancy & Maternity",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c10012",
          "label": "Girls' Clothing",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c10013",
          "label": "Children's Shoes",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c10014",
          "label": "Safety Equipment",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c10015",
          "label": "Matching Family Outfits",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c10016",
          "label": "Baby Souvenirs",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        }
      ]
    },
    {
      "id": "c11",
      "label": "Sports & Entertainment",
      "data": "Sports & Entertainment",
      "expandedIcon": "fa fa-folder-open", "type": "collapsable",
      "theme": {
        "icon": "cag11"
      },
      "children": [
        {
          "id": "c11001",
          "label": "Sports Clothing",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c11002",
          "label": "Fishing",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c11003",
          "label": "Musical Instruments",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c11004",
          "label": "Water Sports",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c11005",
          "label": "Golf",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c11006",
          "label": "Skiing & Snowboarding",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c11007",
          "label": "Horse Racing",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c11008",
          "label": "Other Sports & Entertainment",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c11009",
          "label": "Sneakers",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c11010",
          "label": "Camping & Hiking",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c11011",
          "label": "Hunting",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c11012",
          "label": "Team Sports",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c11013",
          "label": "Running",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c11014",
          "label": "Sports Accessories",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c11015",
          "label": "Bowling",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c11016",
          "label": "Sports Bags",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c11017",
          "label": "Cycling",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c11018",
          "label": "Swimming",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c11019",
          "label": "Fitness & Body Building",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c11020",
          "label": "Racquet Sports",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c11021",
          "label": "Shooting",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c11022",
          "label": "Roller Skates, Skateboards & Scooters",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c11023",
          "label": "Entertainment",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        }
      ]
    },
    {
      "id": "c12",
      "label": "Beauty & Health",
      "data": "Beauty & Health",
      "expandedIcon": "fa fa-folder-open", "type": "collapsable",
      "theme": {
        "icon": "cag12"
      },
      "children": [
        {
          "id": "c12001",
          "label": "Nails Art & Tools",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c12002",
          "label": "Skin Care",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c12003",
          "label": "Sex Products",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c12004",
          "label": "Bath & Shower",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c12005",
          "label": "Sanitary Paper",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c12006",
          "label": "Makeup",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c12007",
          "label": "Hair Care & Styling",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c12008",
          "label": "Beauty Essentials",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c12009",
          "label": "Fragrances & Deodorants",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c12010",
          "label": "Tools & Accessories",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c12011",
          "label": "Health Care",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c12012",
          "label": "Shaving & Hair Removal",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c12013",
          "label": "Tattoo & Body Art",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c12014",
          "label": "Oral Hygiene",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c12015",
          "label": "Men's Grooming",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
      ]
    },
    {
      "id": "c13",
      "label": "Watches",
      "data": "Watches",
      "expandedIcon": "fa fa-folder-open", "type": "collapsable",
      "theme": {
        "icon": "cag13"
      },
      "children": [
        {
          "id": "c13001",
          "label": "Men's Watches",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c13002",
          "label": "Children's Watches",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c13003",
          "label": "Women's Bracelet Watches",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c13004",
          "label": "Women's Watches",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c13005",
          "label": "Pocket & Fob Watches",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c13006",
          "label": "Lover's Watches",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c13007",
          "label": "Watch Accessories",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        }
      ]
    },
    {
      "id": "c14",
      "label": "Toys & Hobbies",
      "data": "Toys & Hobbies",
      "expandedIcon": "fa fa-folder-open", "type": "collapsable",
      "theme": {
        "icon": "cag14"
      },
      "children": [
        {
          "id": "c14001",
          "label": "Dolls & Stuffed Toys",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c14002",
          "label": "Learning & Education",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c14003",
          "label": "Model Building",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c14004",
          "label": "Electronic Toys",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c14005",
          "label": "Stress Relief Toy",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c14006",
          "label": "Hobby & Collectibles",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c14007",
          "label": "Stuffed Animals & Plush",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c14008",
          "label": "Pools & Water Fun",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c14009",
          "label": "Remote Control Toys",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c14010",
          "label": "Outdoor Fun & Sports",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c14011",
          "label": "Diecasts & Toy Vehicles",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c14012",
          "label": "Puzzles & Games",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c14013",
          "label": "Building & Construction Toys",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c14014",
          "label": "High Tech Toys",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c14015",
          "label": "Popular Toys",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c14016",
          "label": "Classic Toys",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c14017",
          "label": "Action & Toy Figures",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c14018",
          "label": "Baby & Toddler Toys",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c14019",
          "label": "Novelty & Gag Toys",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c14020",
          "label": "Kid's Party",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c14021",
          "label": "Arts & Crafts, DIY toys",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c14022",
          "label": "Pretend Play",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
      ]
    },
    {
      "id": "c15",
      "label": "Weddings & Events",
      "data": "Weddings & Events",
      "expandedIcon": "fa fa-folder-open", "type": "collapsable",
      "theme": {
        "icon": "cag15"
      },
      "children": [
        {
          "id": "c15001",
          "label": "Wedding Dresses",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c15002",
          "label": "Wedding Party Dress",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c15003",
          "label": "Cocktail Dresses",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c15004",
          "label": "Mother of the Bride Dresses",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c15005",
          "label": "Evening Dresses",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c15006",
          "label": "Wedding Accessories",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c15007",
          "label": "Homecoming Dresses",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c15008",
          "label": "Quinceanera Dresses",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c15009",
          "label": "Prom Dresses",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c15010",
          "label": "Celebrity-Inspired Dresses",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c15011",
          "label": "Bridesmaid Dresses",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c15012",
          "label": "Dresses under $80",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        }
      ]
    },
    {
      "id": "c16",
      "label": "Novelty & Special Use",
      "data": "Novelty",
      "expandedIcon": "fa fa-folder-open", "type": "collapsable",
      "theme": {
        "icon": "cag16"
      },
      "children": [
        {
          "id": "c16001",
          "label": "Costumes & Accessories",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c16002",
          "label": "Traditional & Cultural Wear",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c16003",
          "label": "Exotic Apparel",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c16004",
          "label": "Work Wear & Uniforms",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c16005",
          "label": "Stage & Dance Wear",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        }
      ]
    },
    {
      "id": "c17",
      "label": "Automobiles & Motorcycles",
      "data": "Automobiles & Motorcycles",
      "expandedIcon": "fa fa-folder-open", "type": "collapsable",
      "theme": {
        "icon": "cag17"
      },
      "children": [
        {
          "id": "c17001",
          "label": "Car Lights",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c17002",
          "label": "Interior Accessories",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c17003",
          "label": "Exterior Accessories",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c17004",
          "label": "Travel & Roadway Product",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c17005",
          "label": "Auto Replacement Parts",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c17006",
          "label": "Car Repair Tools",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c17007",
          "label": "Car Wash & Maintenance",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c17008",
          "label": "Car Electronics",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c17009",
          "label": "Motorcycle Accessories & Parts",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c17010",
          "label": "ATV,RV,Boat & Other Vehicle",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        }
      ]
    },
    {
      "id": "c18",
      "label": "Lights & Lighting",
      "data": "Lights & Lighting",
      "expandedIcon": "fa fa-folder-open", "type": "collapsable",
      "theme": {
        "icon": "cag18"
      },
      "children": [
        {
          "id": "c18001",
          "label": "Lamps & Shades",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c18002",
          "label": "LED Lighting",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c18003",
          "label": "Portable Lighting",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c18004",
          "label": "Book Lights",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c18005",
          "label": "Holiday Lighting",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c18006",
          "label": "Special Engineering Lighting",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c18006",
          "label": "Ceiling Lights & Fans",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c18007",
          "label": "Outdoor Lighting",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c18008",
          "label": "Commercial Lighting",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c18009",
          "label": "Professional Lighting",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c18010",
          "label": "Lighting Accessories",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c18011",
          "label": "Vanity Lights",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c18012",
          "label": "Light Bulbs",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c18013",
          "label": "LED Lamps",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c18014",
          "label": "Night Lights",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c18015",
          "label": "Novelty Lighting",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c18016",
          "label": "Under Cabinet Lights",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        }
      ]
    },
    {
      "id": "c19",
      "label": "Furniture",
      "data": "Furniture",
      "expandedIcon": "fa fa-folder-open", "type": "collapsable",
      "theme": {
        "icon": "cag19"
      },
      "children": [
        {
          "id": "c19001",
          "label": "Home Furniture",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c19002",
          "label": "Outdoor Furniture",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c19003",
          "label": "Bar Furniture",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c19004",
          "label": "Furniture Parts",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c19005",
          "label": "Office Furniture",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c19006",
          "label": "Commercial Furniture",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c19007",
          "label": "Furniture Accessories",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c19008",
          "label": "Children Furniture",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c19009",
          "label": "Café Furniture",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c19010",
          "label": "Furniture Hardware",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        }
      ]
    },
    {
      "id": "c20",
      "label": "Electronic Components",
      "data": "Electronic Components",
      "expandedIcon": "fa fa-folder-open", "type": "collapsable",
      "theme": {
        "icon": "cag20"
      },
      "children": [
        {
          "id": "c20001",
          "label": "Active Components",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c20002",
          "label": "Electronic Data Systems",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c20003",
          "label": "Electronics Stocks",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c20004",
          "label": "Passive Components",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c20005",
          "label": "EL Products",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c20006",
          "label": "Electronic Signs",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c20007",
          "label": "Optoelectronic Displays",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c20008",
          "label": "Electronic Accessories & Supplies",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c20009",
          "label": "Electronics Production Machinery",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c20010",
          "label": "Other Electronic Components",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        }
      ]
    },
    {
      "id": "c21",
      "label": "Office & School Supplies",
      "data": "Office & School",
      "expandedIcon": "fa fa-folder-open", "type": "collapsable",
      "theme": {
        "icon": "cag1"
      },
      "children": [
        {
          "id": "c21001",
          "label": "Adhesives & Tapes",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c21002",
          "label": "Cutting Supplies",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c21003",
          "label": "Labels, Indexes & Stamps",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c21004",
          "label": "Office Binding Supplies",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c21005",
          "label": "Pens, Pencils & Writing Supplies",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c21006",
          "label": "Books",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c21007",
          "label": "Desk Accessories & Organizer",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c21008",
          "label": "Mail & Shipping Supplies",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c21009",
          "label": "Painting Supplies",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c21010",
          "label": "Presentation Boards",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c21011",
          "label": "Calendars, Planners & Cards",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c21012",
          "label": "Filing Products",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c21013",
          "label": "Notebooks & Writing Pads",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c21014",
          "label": "Paper",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c21015",
          "label": "School & Educational Supplies",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        }
      ]
    },
    {
      "id": "c22",
      "label": "Home Appliances",
      "data": "Home Appliances",
      "expandedIcon": "fa fa-folder-open", "type": "collapsable",
      "theme": {
        "icon": "cag2"
      },
      "children": [
        {
          "id": "c22001",
          "label": "Kitchen Appliances",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c22002",
          "label": "Major Appliances",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c22003",
          "label": "Household Appliances",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c22004",
          "label": "Commercial Appliances",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c22005",
          "label": "Personal Care Appliances",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c22006",
          "label": "Home Appliance Parts",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        }
      ]
    },
    {
      "id": "c23",
      "label": "Home Improvement",
      "data": "Home Improvement",
      "expandedIcon": "fa fa-folder-open", "type": "collapsable",
      "theme": {
        "icon": "cag3"
      },
      "children": [
        {
          "id": "c23001",
          "label": "Lights & Lighting",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c23002",
          "label": "Kitchen Fixtures",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c23003",
          "label": "Building Supplies",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c23004",
          "label": "Family Intelligence System",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c23005",
          "label": "Home Appliances",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c23006",
          "label": "Hardware",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c23007",
          "label": "Painting Supplies & Wall Treatments",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c23008",
          "label": "Bathroom Fixtures",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c23009",
          "label": "Electrical Equipments & Supplies",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c23010",
          "label": "Plumbing",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        }
      ]
    },
    {
      "id": "c24",
      "label": "Security & Protection",
      "data": "Security & Protection",
      "expandedIcon": "fa fa-folder-open", "type": "collapsable",
      "theme": {
        "icon": "cag4"
      },
      "children": [
        {
          "id": "c24001",
          "label": "Video Surveillance",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c24002",
          "label": "Workplace Safety Supplies",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c24003",
          "label": "Smart Card System",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c24004",
          "label": "Emergency Kits",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c24005",
          "label": "Lightning Protection",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c24006",
          "label": "Security Alarm",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c24007",
          "label": "Door Intercom",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c24008",
          "label": "Building Automation",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c24009",
          "label": "Roadway Safety",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c24010",
          "label": "Transmission & Cables",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c24011",
          "label": "Access Control",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c24012",
          "label": "Self Defense Supplies",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c24013",
          "label": "Fire Protection",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c24014",
          "label": "Safes",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        }
      ]
    },
    {
      "id": "c25",
      "label": "Tools",
      "data": "Tools",
      "expandedIcon": "fa fa-folder-open", "type": "collapsable",
      "theme": {
        "icon": "cag5"
      },
      "children": [
        {
          "id": "c25001",
          "label": "Measurement & Analysis Instruments",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c25002",
          "label": "Power Tools",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c25003",
          "label": "Welding Equipment",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c25004",
          "label": "Garden Tools",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c25005",
          "label": "Abrasive Tools",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c25006",
          "label": "Riveter Guns",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c25007",
          "label": "Machine Tools & Accessories",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c25008",
          "label": "Hand & Power Tool Accessories",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c25009",
          "label": "Woodworking Machinery & Parts",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c25010",
          "label": "Tool Sets",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c25011",
          "label": "Construction Tools",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c25012",
          "label": "Lifting Tools & Accessories",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c25013",
          "label": "Hand Tools",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c25014",
          "label": "Welding & Soldering Supplies",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c25015",
          "label": "Tool Organizers",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c25016",
          "label": "Abrasives",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c25017",
          "label": "Tool Parts",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
      ]
    },
    {
      "id": "c26",
      "label": "Hair Extensions & Wigs",
      "data": "Hair Extensions & Wigs",
      "expandedIcon": "fa fa-folder-open", "type": "collapsable",
      "theme": {
        "icon": "cag6"
      },
      "children": [
        {
          "id": "c26001",
          "label": "Human Hair Weaves",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c26002",
          "label": "Salon Hair Supply Chain",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c26003",
          "label": "Synthetic Extensions",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c26004",
          "label": "Lace Wigs",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c26005",
          "label": "Synthetic Wigs",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c26006",
          "label": "Hair Pieces",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c26007",
          "label": "Wedding",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c26008",
          "label": "Hair Extensions",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c26009",
          "label": "Hair Braids",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        },
        {
          "id": "c26010",
          "label": "Tools & Accessories",
          "data": "",
          "icon": "fa fa-file-word-o", "type": "item", "status": "A"
        }
      ]
    }
  ]

  constructor() {
    this.carousel = category;
  }


  ngOnInit() {
    while (this.categories.length) this.bundles.push(this.categories.splice(0, 2));
  }
}
