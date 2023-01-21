
function Products(){
    return(
        <div>
             {/* produk menu */}
             <section>
                <div class="container-fluid-lg">
                    <div class="row">
                        <div class="col-12">
                            <div class="title title-flex">
                                <div>
                                    <h2>Top Save Today</h2>
                                    <span class="title-leaf">
                                        <svg class="icon-width">
                                            {/* <use xlink:href="link=https://themes.pixelstrap.com/fastkart/svg/leaf.svg#cake"></use> */}
                                        </svg>
                                    </span>
                                </div>
                                <div class="timing-box">
                                    <div class="timing theme-bg-color">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clock"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                        <h6 class="name">Expires in :</h6>
                                        <div class="time" id="clockdiv-1" data-hours="1" data-minutes="2" data-seconds="3">
                                            <ul>
                                                <li>
                                                    <div class="counter">
                                                        <div class="days">14</div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="counter">
                                                        <div class="hours">23</div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="counter">
                                                        <div class="minutes">58</div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div class="counter">
                                                        <div class="seconds">19</div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="product-box-slider-2 no-arrow">
                                <div class="product-box product-box-bg wow fadeInUp" style={{ width: '257px' }}>
                                    <div class="product-image">
                                        <a href="product-left-thumbnail.html">
                                            <img src="/images/cake/product/1.png"
                                                class="img-fluid" alt="" />
                                        </a>
                                    </div>
                                    <div class="product-detail">
                                        <a href="product-left-thumbnail.html" tabindex="0">
                                            <h6 class="name">
                                                Muffets &amp; Tuffets Whole Wheat Bread 400 g
                                            </h6>
                                        </a>

                                        <h5 class="sold text-content">
                                            <span class="theme-color price">$26.69</span>
                                            <del>28.56</del>
                                        </h5>

                                        <div class="product-rating mt-2">
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

                                            <h6 class="theme-color">In Stock</h6>
                                        </div>

                                        <div class="add-to-cart-box bg-white">
                                            <button class="btn btn-add-cart addcart-button" tabindex="0">Add
                                                <span class="add-icon bg-light-orange">
                                                    <i class="fa-solid fa-plus"></i>
                                                </span>
                                            </button>
                                            <div class="cart_qty qty-box">
                                                <div class="input-group">
                                                    <button type="button" class="qty-left-minus" data-type="minus" data-field="" tabindex="0">
                                                        <i class="fa fa-minus" aria-hidden="true"></i>
                                                    </button>
                                                    <input class="form-control input-number qty-input" type="text" name="quantity" value="0" tabindex="0" />
                                                    <button type="button" class="qty-right-plus" data-type="plus" data-field="" tabindex="0">
                                                        <i class="fa fa-plus" aria-hidden="true"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </section>
            {/* produk menu end */}
        </div>
    )
}

export default Products