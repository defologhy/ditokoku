
import { useState, useEffect, useCallback } from 'react'
import Head from 'next/head';
import Header from '../components/header';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import Link from 'next/link'

function ProductDetail(props) {

    const router = useRouter()
    let cookiesData = (props.cookies_data ? JSON.parse(props.cookies_data) : props);
    cookiesData = (props.status_code === 200 ? Object.assign(cookiesData, { status_code: 200 }) : props)

    const handleBackToHome = async () => {
        router.push('/')
    }

    return (
        <div>
            <Head>
                <title>Ditokoku.id</title>
                <link rel="shortcut icon" href="/images/ditokoku2.png" />
            </Head>

            {/* header fix menu start */}
            <Header props={cookiesData} />
            {/* header fix menu end */}

            {/* breadcumb menu */}
            <section class="breadscrumb-section pt-0">
                <div class="container-fluid-lg">
                    <div class="row">
                        <div class="col-12">
                            <div class="breadscrumb-contain">
                                <h2>Nama Produk</h2>
                                <nav>
                                    <ol class="breadcrumb mb-0">
                                        <li class="breadcrumb-item">
                                            <Link href="#" onClick={handleBackToHome}>
                                                <i class="fa-solid fa-house"></i>
                                            </Link>
                                        </li>

                                        <li class="breadcrumb-item active">Nama Produk</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* breadcumb menu end */}

            {/* produk detail start */}
            <section class="product-section">
                <div class="container-fluid-lg">
                    <div class="row">
                        <div class="col-xxl-12 col-xl-12 col-lg-12 wow fadeInUp" style={{ visibility: 'visible', animationName: 'fadeInUp' }}>
                            <div class="row g-4">
                                <div class="col-xl-6 wow fadeInUp" style={{ visibility: 'visible', animationName: 'fadeInUp' }}>
                                    <div class="product-left-box">
                                        <div class="row g-2">
                                            <div class="col-xxl-12 col-lg-12 col-md-12 order-xxl-2 order-lg-1 order-md-2">
                                                <div class="product-main-2 no-arrow slick-initialized slick-slider">
                                                    <div class="slick-list draggable">
                                                        <div class="slick-track" style={{ opacity: '1', width: '2292px' }}>

                                                            <div class="slider-image" style={{ "width": "500px", "position": "relative", "left": "0px", "top": "0px", "zIndex": "999", "opacity": "1" }}>
                                                                <img src="/images/product/category/1.jpg" id="img-1" data-zoom-image="/images/product/category/1.jpg" class="img-fluid image_zoom_cls-0 blur-up lazyloaded" alt="" />
                                                            </div>

                                                        </div>

                                                    </div>
                                                </div>
                                            </div>

                                            {/* <div class="col-xxl-2 col-lg-12 col-md-2 order-xxl-1 order-lg-2 order-md-1">
                                                <div class="left-slider-image-2 left-slider no-arrow slick-top slick-initialized slick-slider"><button class="slick-prev slick-arrow" aria-label="Previous" type="button" style={{ "display": "inline-block" }}>Previous</button>
                                                    <div class="slick-list draggable"><div class="slick-track" style={{ "opacity": "1", "width": "1536px", "transform": "translate3d(-384px, 0px, 0px)" }}><div class="slick-slide slick-cloned" style={{ width: '96px' }} data-slick-index="-4" id="" aria-hidden="true" tabindex="-1">
                                                        <div class="sidebar-image">
                                                            <img src="/images/product/category/3.jpg" class="img-fluid blur-up lazyloaded" alt="" />
                                                        </div>
                                                    </div><div class="slick-slide slick-cloned" style={{ width: '96px' }} data-slick-index="-3" id="" aria-hidden="true" tabindex="-1">
                                                            <div class="sidebar-image">
                                                                <img src="/images/product/category/4.jpg" class="img-fluid blur-up lazyloaded" alt="" />
                                                            </div>
                                                        </div><div class="slick-slide slick-cloned" style={{ width: '96px' }} data-slick-index="-2" id="" aria-hidden="true" tabindex="-1">
                                                            <div class="sidebar-image">
                                                                <img src="/images/product/category/5.jpg" class="img-fluid blur-up lazyloaded" alt="" />
                                                            </div>
                                                        </div><div class="slick-slide slick-cloned" style={{ width: '96px' }} data-slick-index="-1" id="" aria-hidden="true" tabindex="-1">
                                                            <div class="sidebar-image">
                                                                <img src="/images/product/category/6.jpg" class="img-fluid blur-up lazyloaded" alt="" />
                                                            </div>
                                                        </div><div class="slick-slide slick-current slick-active" style={{ width: '96px' }} data-slick-index="0" aria-hidden="false" tabindex="0">
                                                            <div class="sidebar-image">
                                                                <img src="/images/product/category/1.jpg" class="img-fluid blur-up lazyloaded" alt="" />
                                                            </div>
                                                        </div><div class="slick-slide slick-active" style={{ width: '96px' }} data-slick-index="1" aria-hidden="false" tabindex="0">
                                                            <div class="sidebar-image">
                                                                <img src="/images/product/category/2.jpg" class="img-fluid blur-up lazyloaded" alt="" />
                                                            </div>
                                                        </div><div class="slick-slide slick-active" style={{ width: '96px' }} data-slick-index="2" aria-hidden="false" tabindex="0">
                                                            <div class="sidebar-image">
                                                                <img src="/images/product/category/3.jpg" class="img-fluid blur-up lazyloaded" alt="" />
                                                            </div>
                                                        </div><div class="slick-slide slick-active" style={{ width: '96px' }} data-slick-index="3" aria-hidden="false" tabindex="0">
                                                            <div class="sidebar-image">
                                                                <img src="/images/product/category/4.jpg" class="img-fluid blur-up lazyloaded" alt="" />
                                                            </div>
                                                        </div><div class="slick-slide" style={{ width: '96px' }} data-slick-index="4" aria-hidden="true" tabindex="-1">
                                                            <div class="sidebar-image">
                                                                <img src="/images/product/category/5.jpg" class="img-fluid blur-up lazyloaded" alt="" />
                                                            </div>
                                                        </div><div class="slick-slide" style={{ width: '96px' }} data-slick-index="5" aria-hidden="true" tabindex="-1">
                                                            <div class="sidebar-image">
                                                                <img src="/images/product/category/6.jpg" class="img-fluid blur-up lazyloaded" alt="" />
                                                            </div>
                                                        </div><div class="slick-slide slick-cloned" style={{ width: '96px' }} data-slick-index="6" id="" aria-hidden="true" tabindex="-1">
                                                            <div class="sidebar-image">
                                                                <img src="/images/product/category/1.jpg" class="img-fluid blur-up lazyloaded" alt="" />
                                                            </div>
                                                        </div><div class="slick-slide slick-cloned" style={{ width: '96px' }} data-slick-index="7" id="" aria-hidden="true" tabindex="-1">
                                                            <div class="sidebar-image">
                                                                <img src="/images/product/category/2.jpg" class="img-fluid blur-up lazyloaded" alt="" />
                                                            </div>
                                                        </div><div class="slick-slide slick-cloned" style={{ width: '96px' }} data-slick-index="8" id="" aria-hidden="true" tabindex="-1">
                                                            <div class="sidebar-image">
                                                                <img src="/images/product/category/3.jpg" class="img-fluid blur-up lazyloaded" alt="" />
                                                            </div>
                                                        </div><div class="slick-slide slick-cloned" style={{ width: '96px' }} data-slick-index="9" id="" aria-hidden="true" tabindex="-1">
                                                            <div class="sidebar-image">
                                                                <img src="/images/product/category/4.jpg" class="img-fluid blur-up lazyloaded" alt="" />
                                                            </div>
                                                        </div><div class="slick-slide slick-cloned" style={{ width: '96px' }} data-slick-index="10" id="" aria-hidden="true" tabindex="-1">
                                                            <div class="sidebar-image">
                                                                <img src="/images/product/category/5.jpg" class="img-fluid blur-up lazyloaded" alt="" />
                                                            </div>
                                                        </div><div class="slick-slide slick-cloned" style={{ width: '96px' }} data-slick-index="11" id="" aria-hidden="true" tabindex="-1">
                                                            <div class="sidebar-image">
                                                                <img src="/images/product/category/6.jpg" class="img-fluid blur-up lazyloaded" alt="" />
                                                            </div>
                                                        </div></div></div><button class="slick-next slick-arrow" aria-label="Next" type="button" style={{ "display": "inline-block" }}>Next</button></div>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>

                                <div class="col-xl-6 wow fadeInUp" data-wow-delay="0.1s" style={{ "visibility": "visible", "animationDelay": "0.1s", "animationName": "fadeInUp" }}>
                                    <div class="right-box-contain">
                                        <h6 class="offer-top">Potensi Keuntungan Reseller: Rp.</h6>
                                        <h2 class="name">*Nama Produk</h2>
                                        <div class="price-rating">
                                            <h3 class="theme-color price">Rp.Harga
                                                {/* <del class="text-content">$58.46</del> */}
                                                {/* <span class="offer theme-color">(8% off)</span> */}
                                            </h3>
                                            {/* <div class="product-rating custom-rate">
                                                <ul class="rating">
                                                    <li>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star fill"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                                    </li>
                                                    <li>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star fill"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                                    </li>
                                                    <li>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star fill"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                                    </li>
                                                    <li>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star fill"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                                    </li>
                                                    <li>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                                    </li>
                                                </ul>
                                                <span class="review">23 Customer Review</span>
                                            </div> */}
                                        </div>

                                        <div class="procuct-contain">
                                            <p>Deskripsi Produk
                                            </p>
                                        </div>

                                        <div class="product-packege">
                                            <div class="product-title">
                                                <h4>Warna</h4>
                                            </div>
                                            <ul class="select-packege">
                                                <li>
                                                    <a href="javascript:void(0)" class="active">Biru</a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)">Coklat</a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)">Merah</a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)">Putih</a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)">Hitam</a>
                                                </li>
                                            </ul>
                                        </div>

                                        <div class="product-packege">
                                            <div class="product-title">
                                                <h4>Ukuran</h4>
                                            </div>
                                            <ul class="select-packege">
                                                <li>
                                                    <a href="javascript:void(0)" class="active">XL</a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)">L</a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)">M</a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)">S</a>
                                                </li>
                                            </ul>
                                        </div>

                                        {/* <div class="time deal-timer product-deal-timer mx-md-0 mx-auto" id="clockdiv-1" data-hours="1" data-minutes="2" data-seconds="3">
                                            <div class="product-title">
                                                <h4>Hurry up! Sales Ends In</h4>
                                            </div>
                                            <ul>
                                                <li>
                                                    <div class="counter d-block">
                                                        <div class="days d-block">14</div>
                                                        <h6>Days</h6>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="counter d-block">
                                                        <div class="hours d-block">23</div>
                                                        <h6>Hours</h6>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="counter d-block">
                                                        <div class="minutes d-block">45</div>
                                                        <h6>Min</h6>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="counter d-block">
                                                        <div class="seconds d-block">45</div>
                                                        <h6>Sec</h6>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div> */}

                                        <div class="note-box product-packege">
                                            <div class="cart_qty qty-box product-qty">
                                                <div class="input-group">
                                                    <button type="button" class="qty-right-plus" data-type="plus" data-field="">
                                                        <i class="fa fa-plus" aria-hidden="true"></i>
                                                    </button>
                                                    <input class="form-control input-number qty-input" type="text" name="quantity" defaultValue="0" />
                                                    <button type="button" class="qty-left-minus" data-type="minus" data-field="">
                                                        <i class="fa fa-minus" aria-hidden="true"></i>
                                                    </button>
                                                </div>
                                            </div>
                                            <button onclick="#" class="btn btn-sm cart-button text-white w-50" style={{backgroundColor: '#417394' }}><i class="fa fa-shopping-basket"></i>&nbsp;Beli</button>
                                            <button onclick="#" class="btn btn-sm cart-button text-white w-50" style={{backgroundColor: '#417394' }}><i class="fa fa-shopping-cart"></i>&nbsp;Tambah Ke Keranjang</button>
                                        </div>

                                        {/* <div class="buy-box">
                                            <a href="wishlist.html">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                                                <span>Add To Wishlist</span>
                                            </a>

                                            <a href="compare.html">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shuffle"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>
                                                <span>Add To Compare</span>
                                            </a>
                                        </div> */}

                                        <div class="pickup-box">
                                            <div class="product-title">
                                                <h4>Informasi Produk</h4>
                                            </div>

                                            {/* <div class="pickup-detail">
                                                <h4 class="text-content">Lollipop cake chocolate chocolate cake dessert jujubes.
                                                    Shortbread sugar plum dessert powder cookie sweet brownie.</h4>
                                            </div> */}

                                            <div class="product-info">
                                                <ul class="product-info-list product-info-list-2">
                                                    <li>Barcode : <a href="javascript:void(0)">21321321</a></li>
                                                    <li>Berat : <a href="javascript:void(0)">100g</a></li>
                                                    {/* <li>MFG : <a href="javascript:void(0)">Jun 4, 2022</a></li>
                                                    <li>Stock : <a href="javascript:void(0)">2 Items Left</a></li>
                                                    <li>Tags : <a href="javascript:void(0)">Cake,</a> <a href="javascript:void(0)">Backery</a></li> */}
                                                </ul>
                                            </div>
                                        </div>

                                        {/* <div class="paymnet-option">
                                            <div class="product-title">
                                                <h4>Guaranteed Safe Checkout</h4>
                                            </div>
                                            <ul>
                                                <li>
                                                    <a href="javascript:void(0)">
                                                        <img src="../../../external.html?link=https://themes.pixelstrap.com/fastkart/assets/images/product/payment/1.svg" class="blur-up lazyloaded" alt="" />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)">
                                                        <img src="../../../external.html?link=https://themes.pixelstrap.com/fastkart/assets/images/product/payment/2.svg" class="blur-up lazyloaded" alt="" />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)">
                                                        <img src="../../../external.html?link=https://themes.pixelstrap.com/fastkart/assets/images/product/payment/3.svg" class="blur-up lazyloaded" alt="" />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)">
                                                        <img src="../../../external.html?link=https://themes.pixelstrap.com/fastkart/assets/images/product/payment/4.svg" class="blur-up lazyloaded" alt="" />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)">
                                                        <img src="../../../external.html?link=https://themes.pixelstrap.com/fastkart/assets/images/product/payment/5.svg" class="blur-up lazyloaded" alt="" />
                                                    </a>
                                                </li>
                                            </ul>
                                        </div> */}
                                    </div>
                                </div>

                                <div class="col-12">
                                    <div class="product-section-box">
                                        <ul class="nav nav-tabs custom-nav" id="myTab" role="tablist">
                                            {/* <li class="nav-item" role="presentation">
                                                <button class="nav-link active" id="description-tab" data-bs-toggle="tab" data-bs-target="#description" type="button" role="tab" aria-controls="description" aria-selected="false">Description</button>
                                            </li>

                                            <li class="nav-item" role="presentation">
                                                <button class="nav-link" id="info-tab" data-bs-toggle="tab" data-bs-target="#info" type="button" role="tab" aria-controls="info" aria-selected="false">Additional info</button>
                                            </li>

                                            <li class="nav-item" role="presentation">
                                                <button class="nav-link" id="care-tab" data-bs-toggle="tab" data-bs-target="#care" type="button" role="tab" aria-controls="care" aria-selected="false">Care Instuctions</button>
                                            </li> */}

                                            <li class="nav-item" role="presentation">
                                                <button class="nav-link active" id="review-tab" data-bs-toggle="tab" data-bs-target="#review" type="button" role="tab" aria-controls="review" aria-selected="true">Review</button>
                                            </li>
                                        </ul>

                                        <div class="tab-content custom-tab" id="myTabContent">
                                            {/* <div class="tab-pane fade" id="description" role="tabpanel" aria-labelledby="description-tab">
                                                <div class="product-description">
                                                    <div class="nav-desh">
                                                        <p>Jelly beans carrot cake icing biscuit oat cake gummi bears tart.
                                                            Lemon drops carrot cake pudding sweet gummi bears. Chocolate cake
                                                            tart cupcake donut topping liquorice sugar plum chocolate bar. Jelly
                                                            beans tiramisu caramels jujubes biscuit liquorice chocolate. Pudding
                                                            toffee jujubes oat cake sweet roll. Lemon drops dessert croissant
                                                            danish cake cupcake. Sweet roll candy chocolate toffee jelly sweet
                                                            roll halvah brownie topping. Marshmallow powder candy sesame snaps
                                                            jelly beans candy canes marshmallow gingerbread pie.</p>
                                                    </div>

                                                    <div class="nav-desh">
                                                        <div class="desh-title">
                                                            <h5>Organic:</h5>
                                                        </div>
                                                        <p>vitae et leo duis ut diam quam nulla porttitor massa id neque aliquam
                                                            vestibulum morbi blandit cursus risus at ultrices mi tempus
                                                            imperdiet nulla malesuada pellentesque elit eget gravida cum sociis
                                                            natoque penatibus et magnis dis parturient montes nascetur ridiculus
                                                            mus mauris vitae ultricies leo integer malesuada nunc vel risus
                                                            commodo viverra maecenas accumsan lacus vel facilisis volutpat est
                                                            velit egestas dui id ornare arcu odio ut sem nulla pharetra diam sit
                                                            amet nisl suscipit adipiscing bibendum est ultricies integer quis
                                                            auctor elit sed vulputate mi sit amet mauris commodo quis imperdiet
                                                            massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada
                                                            proin libero nunc consequat interdum varius sit amet mattis
                                                            vulputate enim nulla aliquet porttitor lacus luctus accumsan.</p>
                                                    </div>

                                                    <div class="banner-contain nav-desh bg-size blur-up lazyloaded" style={{ "backgroundImage": "url(&quot;/images/vegetable/banner/14.jpg&quot;)", "backgroundSize": "cover", "backgroundPosition": "center center", "backgroundRepeat": "no-repeat", "display": "block" }}>
                                                        <img src="/images/vegetable/banner/14.jpg" class="bg-img blur-up lazyload" alt="" style={{ display: 'none' }} />
                                                        <div class="banner-details p-center banner-b-space w-100 text-center">
                                                            <div>
                                                                <h6 class="ls-expanded theme-color mb-sm-3 mb-1">SUMMER</h6>
                                                                <h2>VEGETABLE</h2>
                                                                <p class="mx-auto mt-1">Save up to 5% OFF</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="nav-desh">
                                                        <div class="desh-title">
                                                            <h5>From The Manufacturer:</h5>
                                                        </div>
                                                        <p>Jelly beans shortbread chupa chups carrot cake jelly-o halvah apple
                                                            pie pudding gingerbread. Apple pie halvah cake tiramisu shortbread
                                                            cotton candy croissant chocolate cake. Tart cupcake caramels gummi
                                                            bears macaroon gingerbread fruitcake marzipan wafer. Marzipan
                                                            dessert cupcake ice cream tootsie roll. Brownie chocolate cake
                                                            pudding cake powder candy ice cream ice cream cake. Jujubes soufflé
                                                            chupa chups cake candy halvah donut. Tart tart icing lemon drops
                                                            fruitcake apple pie.</p>

                                                        <p>Dessert liquorice tart soufflé chocolate bar apple pie pastry danish
                                                            soufflé. Gummi bears halvah gingerbread jelly icing. Chocolate cake
                                                            chocolate bar pudding chupa chups bear claw pie dragée donut halvah.
                                                            Gummi bears cookie ice cream jelly-o jujubes sweet croissant.
                                                            Marzipan cotton candy gummi bears lemon drops lollipop lollipop
                                                            chocolate. Ice cream cookie dragée cake sweet roll sweet roll.Lemon
                                                            drops cookie muffin carrot cake chocolate marzipan gingerbread
                                                            topping chocolate bar. Soufflé tiramisu pastry sweet dessert.</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="tab-pane fade" id="info" role="tabpanel" aria-labelledby="info-tab">
                                                <div class="table-responsive">
                                                    <table class="table info-table">
                                                        <tbody>
                                                            <tr>
                                                                <td>Specialty</td>
                                                                <td>Vegetarian</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Ingredient Type</td>
                                                                <td>Vegetarian</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Brand</td>
                                                                <td>Lavian Exotique</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Form</td>
                                                                <td>Bar Brownie</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Package Information</td>
                                                                <td>Box</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Manufacturer</td>
                                                                <td>Prayagh Nutri Product Pvt Ltd</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Item part number</td>
                                                                <td>LE 014 - 20pcs Crème Bakes (Pack of 2)</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Net Quantity</td>
                                                                <td>40.00 count</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>

                                            <div class="tab-pane fade" id="care" role="tabpanel" aria-labelledby="care-tab">
                                                <div class="information-box">
                                                    <ul>
                                                        <li>Store cream cakes in a refrigerator. Fondant cakes should be
                                                            stored in an air conditioned environment.</li>

                                                        <li>Slice and serve the cake at room temperature and make sure
                                                            it is not exposed to heat.</li>

                                                        <li>Use a serrated knife to cut a fondant cake.</li>

                                                        <li>Sculptural elements and figurines may contain wire supports
                                                            or toothpicks or wooden skewers for support.</li>

                                                        <li>Please check the placement of these items before serving to
                                                            small children.</li>

                                                        <li>The cake should be consumed within 24 hours.</li>

                                                        <li>Enjoy your cake!</li>
                                                    </ul>
                                                </div>
                                            </div> */}

                                            <div class="tab-pane fade active show" id="review" role="tabpanel" aria-labelledby="review-tab">
                                                <div class="review-box">
                                                    <div class="row g-4">
                                                        {/* <div class="col-xl-6">
                                                            <div class="review-title">
                                                                <h4 class="fw-500">Customer reviews</h4>
                                                            </div>

                                                            <div class="d-flex">
                                                                <div class="product-rating">
                                                                    <ul class="rating">
                                                                        <li>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star fill"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                                                        </li>
                                                                        <li>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star fill"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                                                        </li>
                                                                        <li>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star fill"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                                                        </li>
                                                                        <li>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                                                        </li>
                                                                        <li>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                                <h6 class="ms-3">4.2 Out Of 5</h6>
                                                            </div>

                                                            <div class="rating-box">
                                                                <ul>
                                                                    <li>
                                                                        <div class="rating-list">
                                                                            <h5>5 Star</h5>
                                                                            <div class="progress">
                                                                                <div class="progress-bar" role="progressbar" style={{ width: '68%' }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                                                                                    68%
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </li>

                                                                    <li>
                                                                        <div class="rating-list">
                                                                            <h5>4 Star</h5>
                                                                            <div class="progress">
                                                                                <div class="progress-bar" role="progressbar" style={{ width: '67%' }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                                                                                    67%
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </li>

                                                                    <li>
                                                                        <div class="rating-list">
                                                                            <h5>3 Star</h5>
                                                                            <div class="progress">
                                                                                <div class="progress-bar" role="progressbar" style={{ width: '42%' }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                                                                                    42%
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </li>

                                                                    <li>
                                                                        <div class="rating-list">
                                                                            <h5>2 Star</h5>
                                                                            <div class="progress">
                                                                                <div class="progress-bar" role="progressbar" style={{ width: '30%' }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                                                                                    30%
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </li>

                                                                    <li>
                                                                        <div class="rating-list">
                                                                            <h5>1 Star</h5>
                                                                            <div class="progress">
                                                                                <div class="progress-bar" role="progressbar" style={{ width: '24%' }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                                                                                    24%
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>

                                                        <div class="col-xl-6">
                                                            <div class="review-title">
                                                                <h4 class="fw-500">Add a review</h4>
                                                            </div>

                                                            <div class="row g-4">
                                                                <div class="col-md-6">
                                                                    <div class="form-floating theme-form-floating">
                                                                        <input type="text" class="form-control" id="name" placeholder="Name" />
                                                                        <label htmlFor="name">Your Name</label>
                                                                    </div>
                                                                </div>

                                                                <div class="col-md-6">
                                                                    <div class="form-floating theme-form-floating">
                                                                        <input type="email" class="form-control" id="email" placeholder="Email Address" />
                                                                        <label htmlFor="email">Email Address</label>
                                                                    </div>
                                                                </div>

                                                                <div class="col-md-6">
                                                                    <div class="form-floating theme-form-floating">
                                                                        <input type="url" class="form-control" id="website" placeholder="Website" />
                                                                        <label htmlFor="website">Website</label>
                                                                    </div>
                                                                </div>

                                                                <div class="col-md-6">
                                                                    <div class="form-floating theme-form-floating">
                                                                        <input type="url" class="form-control" id="review1" placeholder="Give your review a title" />
                                                                        <label htmlFor="review1">Review Title</label>
                                                                    </div>
                                                                </div>

                                                                <div class="col-12">
                                                                    <div class="form-floating theme-form-floating">
                                                                        <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: '150px' }}></textarea>
                                                                        <label htmlFor="floatingTextarea2">Write Your
                                                                            Comment</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div> */}

                                                        <div class="col-12">
                                                            {/* <div class="review-title">
                                                                <h4 class="fw-500">Customer questions &amp; answers</h4>
                                                            </div> */}

                                                            <div class="review-people">
                                                                <ul class="review-list">
                                                                    <li>
                                                                        <div class="people-box">
                                                                            <div>
                                                                                <div class="people-image">
                                                                                    <img src="#" class="img-fluid blur-up lazyloaded" alt="Foto Reseller" />
                                                                                </div>
                                                                            </div>

                                                                            <div class="people-comment">
                                                                                <a class="name" href="javascript:void(0)">Nama Reseller</a>
                                                                                <div class="date-time">
                                                                                    <h6 class="text-content">waktu review</h6>

                                                                                    {/* <div class="product-rating">
                                                                                        <ul class="rating">
                                                                                            <li>
                                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star fill"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                                                                            </li>
                                                                                            <li>
                                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star fill"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                                                                            </li>
                                                                                            <li>
                                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star fill"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                                                                            </li>
                                                                                            <li>
                                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                                                                            </li>
                                                                                            <li>
                                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                                                                            </li>
                                                                                        </ul>
                                                                                    </div> */}
                                                                                </div>

                                                                                <div class="reply">
                                                                                    <p>Deskripsi Review
                                                                                        {/* <a href="javascript:void(0)">Reply</a> */}
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </li>

                                                                    <li>
                                                                        <div class="people-box">
                                                                            <div>
                                                                                <div class="people-image">
                                                                                    <img src="#" class="img-fluid blur-up lazyloaded" alt="Foto Reseller" />
                                                                                </div>
                                                                            </div>

                                                                            <div class="people-comment">
                                                                                <a class="name" href="javascript:void(0)">Nama Reseller</a>
                                                                                <div class="date-time">
                                                                                    <h6 class="text-content">waktu review</h6>

                                                                                    {/* <div class="product-rating">
                                                                                        <ul class="rating">
                                                                                            <li>
                                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star fill"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                                                                            </li>
                                                                                            <li>
                                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star fill"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                                                                            </li>
                                                                                            <li>
                                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star fill"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                                                                            </li>
                                                                                            <li>
                                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                                                                            </li>
                                                                                            <li>
                                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                                                                            </li>
                                                                                        </ul>
                                                                                    </div> */}
                                                                                </div>

                                                                                <div class="reply">
                                                                                    <p>Deskripsi Review
                                                                                        {/* <a href="javascript:void(0)">Reply</a> */}
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </li>


                                                                    <li>
                                                                        <div class="people-box">
                                                                            <div>
                                                                                <div class="people-image">
                                                                                    <img src="#" class="img-fluid blur-up lazyloaded" alt="Foto Reseller" />
                                                                                </div>
                                                                            </div>

                                                                            <div class="people-comment">
                                                                                <a class="name" href="javascript:void(0)">Nama Reseller</a>
                                                                                <div class="date-time">
                                                                                    <h6 class="text-content">waktu review</h6>

                                                                                    {/* <div class="product-rating">
                                                                                        <ul class="rating">
                                                                                            <li>
                                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star fill"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                                                                            </li>
                                                                                            <li>
                                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star fill"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                                                                            </li>
                                                                                            <li>
                                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star fill"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                                                                            </li>
                                                                                            <li>
                                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                                                                            </li>
                                                                                            <li>
                                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                                                                            </li>
                                                                                        </ul>
                                                                                    </div> */}
                                                                                </div>

                                                                                <div class="reply">
                                                                                    <p>Deskripsi Review
                                                                                        {/* <a href="javascript:void(0)">Reply</a> */}
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </li>

                                                                    <li>
                                                                        <div class="people-box">
                                                                            <div>
                                                                                <div class="people-image">
                                                                                    <img src="#" class="img-fluid blur-up lazyloaded" alt="Foto Reseller" />
                                                                                </div>
                                                                            </div>

                                                                            <div class="people-comment">
                                                                                <a class="name" href="javascript:void(0)">Nama Reseller</a>
                                                                                <div class="date-time">
                                                                                    <h6 class="text-content">waktu review</h6>

                                                                                    {/* <div class="product-rating">
                                                                                        <ul class="rating">
                                                                                            <li>
                                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star fill"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                                                                            </li>
                                                                                            <li>
                                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star fill"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                                                                            </li>
                                                                                            <li>
                                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star fill"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                                                                            </li>
                                                                                            <li>
                                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                                                                            </li>
                                                                                            <li>
                                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                                                                            </li>
                                                                                        </ul>
                                                                                    </div> */}
                                                                                </div>

                                                                                <div class="reply">
                                                                                    <p>Deskripsi Review
                                                                                        {/* <a href="javascript:void(0)">Reply</a> */}
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <div class="col-xxl-3 col-xl-4 col-lg-5 d-none d-lg-block wow fadeInUp" style={{ visibility: 'visible', animationName: 'fadeInUp' }}>
                            <div class="right-sidebar-box">
                                <div class="vendor-box">
                                    <div class="verndor-contain">
                                        <div class="vendor-image">
                                            <img src="/images/product/vendor.png" class="blur-up lazyloaded" alt="" />
                                        </div>

                                        <div class="vendor-name">
                                            <h5 class="fw-500">Noodles Co.</h5>

                                            <div class="product-rating mt-1">
                                                <ul class="rating">
                                                    <li>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star fill"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                                    </li>
                                                    <li>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star fill"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                                    </li>
                                                    <li>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star fill"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                                    </li>
                                                    <li>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star fill"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                                    </li>
                                                    <li>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                                    </li>
                                                </ul>
                                                <span>(36 Reviews)</span>
                                            </div>

                                        </div>
                                    </div>

                                    <p class="vendor-detail">Noodles &amp; Company is an American fast-casual
                                        restaurant that offers international and American noodle dishes and pasta.</p>

                                    <div class="vendor-list">
                                        <ul>
                                            <li>
                                                <div class="address-contact">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-map-pin"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                                    <h5>Address: <span class="text-content">1288 Franklin Avenue</span></h5>
                                                </div>
                                            </li>

                                            <li>
                                                <div class="address-contact">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-headphones"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>
                                                    <h5>Contact Seller: <span class="text-content">(+1)-123-456-789</span></h5>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div class="pt-25">
                                    <div class="category-menu">
                                        <h3>Trending Products</h3>

                                        <ul class="product-list product-right-sidebar border-0 p-0">
                                            <li>
                                                <div class="offer-product">
                                                    <a href="product-left-thumbnail.html" class="offer-image">
                                                        <img src="/images/vegetable/product/23.png" class="img-fluid blur-up lazyloaded" alt="" />
                                                    </a>

                                                    <div class="offer-detail">
                                                        <div>
                                                            <a href="product-left-thumbnail.html">
                                                                <h6 class="name">Meatigo Premium Goat Curry</h6>
                                                            </a>
                                                            <span>450 G</span>
                                                            <h6 class="price theme-color">$ 70.00</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>

                                            <li>
                                                <div class="offer-product">
                                                    <a href="product-left-thumbnail.html" class="offer-image">
                                                        <img src="/images/vegetable/product/24.png" class="blur-up lazyloaded" alt="" />
                                                    </a>

                                                    <div class="offer-detail">
                                                        <div>
                                                            <a href="product-left-thumbnail.html">
                                                                <h6 class="name">Dates Medjoul Premium Imported</h6>
                                                            </a>
                                                            <span>450 G</span>
                                                            <h6 class="price theme-color">$ 40.00</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>

                                            <li>
                                                <div class="offer-product">
                                                    <a href="product-left-thumbnail.html" class="offer-image">
                                                        <img src="/images/vegetable/product/25.png" class="blur-up lazyloaded" alt="" />
                                                    </a>

                                                    <div class="offer-detail">
                                                        <div>
                                                            <a href="product-left-thumbnail.html">
                                                                <h6 class="name">Good Life Walnut Kernels</h6>
                                                            </a>
                                                            <span>200 G</span>
                                                            <h6 class="price theme-color">$ 52.00</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>

                                            <li class="mb-0">
                                                <div class="offer-product">
                                                    <a href="product-left-thumbnail.html" class="offer-image">
                                                        <img src="/images/vegetable/product/26.png" class="blur-up lazyloaded" alt="" />
                                                    </a>

                                                    <div class="offer-detail">
                                                        <div>
                                                            <a href="product-left-thumbnail.html">
                                                                <h6 class="name">Apple Red Premium Imported</h6>
                                                            </a>
                                                            <span>1 KG</span>
                                                            <h6 class="price theme-color">$ 80.00</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div class="ratio_156 pt-25">
                                    <div class="home-contain bg-size blur-up lazyloaded" style={{ "backgroundImage": "url(&quot;/images/vegetable/banner/8.jpg&quot;)", "backgroundSize": "cover", "backgroundPosition": "center center", "backgroundRepeat": "no-repeat", "display": "block" }}>
                                        <img src="/images/vegetable/banner/8.jpg" class="bg-img blur-up lazyload" alt="" style={{ display: 'none' }} />
                                        <div class="home-detail p-top-left home-p-medium">
                                            <div>
                                                <h6 class="text-yellow home-banner">Seafood</h6>
                                                <h3 class="text-uppercase fw-normal"><span class="theme-color fw-bold">Freshes</span> Products</h3>
                                                <h3 class="fw-light">every hour</h3>
                                                <button onclick="location.href = 'shop-left-sidebar.html';" class="btn btn-animation btn-md fw-bold mend-auto">Shop Now <i class="fa-solid fa-arrow-right icon"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </section>
            {/* produk detail end */}

        </div>
    )
}

// Get Server Side Props
export async function getServerSideProps({ req, res }) {
    console.log("getcookie home page");
    if (!getCookie('reseller_cookies', { req, res })) {
        return {
            props: {
                status_code: 401,
                error_title: "Unauthorized",
                error_message: "Please sign in to Ditokoku Information System",
            }
        }
    }

    return {
        props: {
            status_code: 200,
            error_title: "cookie is active",
            error_message: "cookie is active",
            cookies_data: getCookie('reseller_cookies', { req, res })
        }
    }

}

export default ProductDetail