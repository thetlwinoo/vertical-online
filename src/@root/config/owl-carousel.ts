export const banner = {
    options: {
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        autoplay: true,
        autoplayTimeout: 5000,
        nav: false,
        loop: true,
        dots: true,
        stopOnHover: true,
        item: 1,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    },
    slides: [
        {
            style: { "background-image": "url('assets/devita/img/slider/slider-3.jpg')" },
            image: 'assets/devita/img/slider/slider-3.jpg',
            description: '<h5 class="animated">Exclusive Offer -20% Off This Week</h5><h2 class="animated">Top Bestselling <br>Apple Watch Edition</h2><h3 class="animated"><span>Starting at </span> $120.99</h3><div class="slider-btn slider-btn-2 mt-70"><a class="animated" href="product-details.html">shopping Now</a></div>'
        },
        {
            transition: 'zoomInRight',
            style: { "background-image": "url('assets/devita/img/slider/slider-4.jpg')" },
            image: 'assets/devita/img/slider/slider-4.jpg',
            description: '<h5 class="animated">Exclusive Offer -20% Off This Week</h5><h2 class="animated">Work Desk 2018 <br>Microsoft Surface Studio</h2><h3 class="animated"><span>Starting at </span> $619.00</h3><div class="slider-btn slider-btn-2" mt-70><a class="animated" href="product-details.html">shopping Now</a></div>',
        },
        {
            transition: 'bounceInLeft',
            style: { "background-image": "url('assets/devita/img/slider/slider-5.jpg')" },
            image: 'assets/devita/img/slider/slider-5.jpg',
            description: '<h5 class="animated">Exclusive Offer -10% Off This Week</h5><h2 class="animated">AKG Headphone <br>White Bluetooth 2018</h2><h3 class="animated"><span>Starting at </span> $149.99</h3><div class="slider-btn slider-btn-2 mt-70"><a class="animated" href="product-details.html">shopping Now</a></div>',
        }
    ]
}

export const banner2 = {
    options: {
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        autoplay: true,
        autoplayTimeout: 5000,
        nav: false,
        loop: true,
        dots: true,
        stopOnHover: true,
        item: 1,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    },
    slides: [
        {
            style: { "background-image": "url('assets/images/home/slider-banner/banner/banner01.jpg')" },
            image: 'assets/images/home/slider-banner/banner/banner01.jpg',
            description: '<h5 class="animated">Exclusive Offer -20% Off This Week</h5><h2 class="animated">Top Bestselling <br>Apple Watch Edition</h2><h3 class="animated"><span>Starting at </span> $120.99</h3><div class="slider-btn slider-btn-2 mt-70"><a class="animated" href="product-details.html">shopping Now</a></div>'
        },
        {
            style: { "background-image": "url('assets/images/home/slider-banner/banner/banner02.jpg')" },
            image: 'assets/images/home/slider-banner/banner/banner01.jpg',
            description: '<h5 class="animated">Exclusive Offer -20% Off This Week</h5><h2 class="animated">Top Bestselling <br>Apple Watch Edition</h2><h3 class="animated"><span>Starting at </span> $120.99</h3><div class="slider-btn slider-btn-2 mt-70"><a class="animated" href="product-details.html">shopping Now</a></div>'
        },
        {
            style: { "background-image": "url('assets/images/home/slider-banner/banner/banner03.jpg')" },
            image: 'assets/images/home/slider-banner/banner/banner01.jpg',
            description: '<h5 class="animated">Exclusive Offer -20% Off This Week</h5><h2 class="animated">Top Bestselling <br>Apple Watch Edition</h2><h3 class="animated"><span>Starting at </span> $120.99</h3><div class="slider-btn slider-btn-2 mt-70"><a class="animated" href="product-details.html">shopping Now</a></div>'
        },
        {
            style: { "background-image": "url('assets/images/home/slider-banner/banner/banner04.jpg')" },
            image: 'assets/images/home/slider-banner/banner/banner01.jpg',
            description: '<h5 class="animated">Exclusive Offer -20% Off This Week</h5><h2 class="animated">Top Bestselling <br>Apple Watch Edition</h2><h3 class="animated"><span>Starting at </span> $120.99</h3><div class="slider-btn slider-btn-2 mt-70"><a class="animated" href="product-details.html">shopping Now</a></div>'
        },
        {
            style: { "background-image": "url('assets/images/home/slider-banner/banner/banner01.jpg')" },
            image: 'assets/images/home/slider-banner/banner/banner01.jpg',
            description: '<h5 class="animated">Exclusive Offer -20% Off This Week</h5><h2 class="animated">Top Bestselling <br>Apple Watch Edition</h2><h3 class="animated"><span>Starting at </span> $120.99</h3><div class="slider-btn slider-btn-2 mt-70"><a class="animated" href="product-details.html">shopping Now</a></div>'
        },
        {
            style: { "background-image": "url('assets/images/home/slider-banner/banner/banner02.jpg')" },
            image: 'assets/images/home/slider-banner/banner/banner01.jpg',
            description: '<h5 class="animated">Exclusive Offer -20% Off This Week</h5><h2 class="animated">Top Bestselling <br>Apple Watch Edition</h2><h3 class="animated"><span>Starting at </span> $120.99</h3><div class="slider-btn slider-btn-2 mt-70"><a class="animated" href="product-details.html">shopping Now</a></div>'
        }
    ]
}

export const collection = {
    options: {
        item: 9,
        responsiveClass: true,
        responsive: {
            0: {
                items: 3,
                loop: true
            },
            768: {
                items: 3,
                loop: true
            },
            1000: {
                items: 9,
                loop: false
            }
        }
    }
}

export const category = {
    options: {
        loop: true,
        nav: false,
        autoplay: false,
        autoplayTimeout: 5000,
        responsiveClass: true,
        autoWidth: false,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        dots: false,
        item: 10,
        responsive: {
            0: {
                items: 3,
                nav: false
            },
            576: {
                items: 3,
                nav: false
            },
            768: {
                items: 3
            },
            992: {
                items: 10
            }
        }
    }
}

export const popular = {
    options: {
        loop: true,
        nav: false,
        autoplay: false,
        autoplayTimeout: 5000,
        autoWidth: true,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        item: 6,
        responsive: {
            0: {
                items: 2,
                nav: false
            },
            480: {
                items: 3,
                nav: false
            },
            768: {
                items: 3
            },
            992: {
                items: 5
            },
            1200: {
                items: 6
            }
        }
    }
}

export const bannerCategory = {
    options: {
        loop: true,
        nav: false,
        autoplay: false,
        autoplayTimeout: 5000,
        responsiveClass: true,
        autoWidth: true,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        item: 8,
        responsive: {
            0: {
                items: 2,
                nav: false
            },
            480: {
                items: 3,
                nav: false
            },
            768: {
                items: 3
            },
            992: {
                items: 5
            },
            1200: {
                items: 8
            }
        }
    }
}

export const deal = {
    options: {
        loop: true,
        nav: false,
        lazyLoad : true,
        autoplay: false,
        dots: false,
        autoplayTimeout: 5000,
        item: 6,        
        responsive: {
            0: {
                items: 2,
                nav: false
            },
            576: {
                items: 2,
                nav: false
            },
            768: {
                items: 3
            },
            992: {
                items: 6
            }
        }
    }
}

export const related = {
    options: {
        loop: true,
        nav: true,
        autoplay: false,
        autoplayTimeout: 5000,
        navText: ['<i class="ion-ios-arrow-back"></i>', '<i class="ion-ios-arrow-forward"></i>'],
        item: 1,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    }
}

export const best_selling = {
    options: {
        loop: true,
        nav: false,
        autoplay: false,
        autoplayTimeout: 5000,
        item: 3,
        margin: 20,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 2
            },
            1100: {
                items: 2
            },
            1200: {
                items: 3
            }
        }
    }
}

export const headphone = {
    options: {
        loop: true,
        nav: true,
        autoplay: false,
        autoplayTimeout: 5000,
        navText: ['<i class="ion-ios-arrow-back"></i>', '<i class="ion-ios-arrow-forward"></i>'],
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        item: 6,
        navContainer: '.product-slider-nav',
        responsive: {
            0: {
                items: 2
            },
            480: {
                items: 2
            },
            768: {
                items: 3
            },
            992: {
                items: 4
            },
            1200: {
                items: 6
            }
        }
    }
}

export const brand = {
    options: {
        loop: true,
        nav: false,
        autoplay: false,
        autoplayTimeout: 5000,
        item: 6,
        margin: 100,
        responsive: {
            0: {
                items: 2,
            },
            480: {
                items: 2,
                margin: 30,
            },
            768: {
                items: 4,
                margin: 30,
            },
            992: {
                items: 4,
                margin: 100,
            },
            1200: {
                items: 6
            }
        }
    },
    slides: [
        {
            image: 'assets/devita/img/brand-logo/brand-logo-1.png'
        },
        {
            image: 'assets/devita/img/brand-logo/brand-logo-2.png'
        },
        {
            image: 'assets/devita/img/brand-logo/brand-logo-3.png'
        },
        {
            image: 'assets/devita/img/brand-logo/brand-logo-4.png'
        },
        {
            image: 'assets/devita/img/brand-logo/brand-logo-5.png'
        },
        {
            image: 'assets/devita/img/brand-logo/brand-logo-2.png'
        }
    ]
}

export const slick = {
    options: {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<span class="cr-navigation cr-navigation-prev"><i class="fa fa-angle-left"></i></span>',
        nextArrow: '<span class="cr-navigation cr-navigation-next"><i class="fa fa-angle-right"></i></span>',
    },
    slides: [
        { img: 'assets/devita/img/product/featured-img-1.jpg' },
        { img: 'assets/devita/img/product/featured-img-2.jpg' },
        { img: 'assets/devita/img/product/featured-img-3.jpg' }
    ]
}

export const gallery = {
    options: {
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        centerPadding: '60px',
        prevArrow: '<span class="product-dec-icon product-dec-prev"><i class="fa fa-angle-left"></i></span>',
        nextArrow: '<span class="product-dec-icon product-dec-next"><i class="fa fa-angle-right"></i></span>',
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 479,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        }
        ]
    },
    slides: [
        {
            image: {
                zoom: 'assets/devita/img/product-details/product-detalis-bl1.jpg',
                large: 'assets/devita/img/product-details/product-detalis-l1.jpg',
                small: 'assets/devita/img/product-details/product-detalis-s1.jpg',
            }
        },
        {
            image: {
                zoom: 'assets/devita/img/product-details/product-detalis-bl2.jpg',
                large: 'assets/devita/img/product-details/product-detalis-l2.jpg',
                small: 'assets/devita/img/product-details/product-detalis-s2.jpg',
            }
        },
        {
            image: {
                zoom: 'assets/devita/img/product-details/product-detalis-bl3.jpg',
                large: 'assets/devita/img/product-details/product-detalis-l3.jpg',
                small: 'assets/devita/img/product-details/product-detalis-s3.jpg',
            }
        },
        {
            image: {
                zoom: 'assets/devita/img/product-details/product-detalis-bl4.jpg',
                large: 'assets/devita/img/product-details/product-detalis-l4.jpg',
                small: 'assets/devita/img/product-details/product-detalis-s4.jpg',
            }
        },
        {
            image: {
                zoom: 'assets/devita/img/product-details/product-detalis-bl5.jpg',
                large: 'assets/devita/img/product-details/product-detalis-l5.jpg',
                small: 'assets/devita/img/product-details/product-detalis-s5.jpg',
            }
        },
    ]
}