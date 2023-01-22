import Link from 'next/link'
import Router, { useRouter } from 'next/router';
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';
import React, { useState, useEffect, useCallback } from 'react'
import Head from 'next/head';
import axios from 'axios'
import Header from './components/header';
import Slider from "react-slick";
import { Modal, Button } from 'react-bootstrap';

function Home(props) {

    const router = useRouter()
    // usestate
    const [showToastWelcome, setShowToastWelcome] = useState(true);
    const [bannerId, setBannerId] = useState(null)
    const [bannerImageFilename, setBannerImageFilename] = useState(null)
    const [categoryProducts, setCategoryProducts] = useState([])
    let cookiesData = (props.cookies_data ? JSON.parse(props.cookies_data) : props);
    cookiesData = (props.status_code === 200 ? Object.assign(cookiesData, { status_code: 200 }) : props)

    const settingsSlider = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    useEffect(() => {
        getBanners();
        getCategoryProducts();
    }, []);

    const getBanners = async () => {
        await getDataBanners();
    }
    const getCategoryProducts = async () => {
        await getDataCategoryProducts();
    }

    const getDataBanners = async () => {
        try {

            //Set Axios Configuration For Sign In to NextJS Server
            const axiosConfigForGetData = {
                url: process.env.REACT_APP_DITOKOKU_API_BASE_URL + process.env.REACT_APP_DITOKOKU_API_VERSION_URL + '/banners'
                , method: "GET"
                , timeout: 40000
                , responseType: "json"
                , responseEncoding: "utf8"
                , headers: { "Content-Type": "application/json" }
            };

            //Execute Axios Configuration For JsonContentValidation
            try {
                const getDataResults = await axios.request(axiosConfigForGetData);
                const getData = getDataResults.data;
                console.log("getdataBanner", getData)

                setBannerId((getData.data.length != 0 ? getData.data[0].banner_id : null))
                setBannerImageFilename((getData.data.length != 0 ? getData.data[0].banner_filename : null))

                // form.setFieldsValue({
                //     bannerId : (getData.data.length!=0 ? getData.data[0].banner_id : '')
                //     , imageConstruct: (getData.data.length!=0 ? getData.data[0].banner_filename : '')
                //     , descriptionConstruct: (getData.data.length!=0 ? getData.data[0].banner_description : '')/
                // });
            } catch (error) {
                console.log(error)
                if (error.response == null) {
                    // Modal.error({
                    //     title: "Internal Server Error",
                    //     content: "Error On Get Data SKU Plant Storage Location. (Please contact you system administrator and report this error message)",
                    // });
                } else {
                    // if (error.response.status === 401) {
                    //     Router.push("/security/sign-in");
                    //     return {}
                    // }
                    // Modal.error({
                    //     title: error.response.data.error_title,
                    //     content: error.response.data.error_message,
                    // });
                }
            }

        } catch (error) {
            console.log(error.error_message)
            console.log(error)
            // Modal.error({
            //     title: error.error_title,
            //     content: error.error_message,
            // });
        }
    }
    const getDataCategoryProducts = async () => {
        try {

            //Set Axios Configuration For Sign In to NextJS Server
            const axiosConfigForGetData = {
                url: process.env.REACT_APP_DITOKOKU_API_BASE_URL + process.env.REACT_APP_DITOKOKU_API_VERSION_URL + '/category-products'
                , method: "GET"
                , timeout: 40000
                , responseType: "json"
                , responseEncoding: "utf8"
                , headers: { "Content-Type": "application/json" }
            };

            //Execute Axios Configuration For JsonContentValidation
            try {
                const getDataResults = await axios.request(axiosConfigForGetData);
                const getData = getDataResults.data;
                console.log("getDataCategoryProducts", getData)

                setCategoryProducts((getData.data.length != 0 ? getData.data : []))

                // form.setFieldsValue({
                //     bannerId : (getData.data.length!=0 ? getData.data[0].banner_id : '')
                //     , imageConstruct: (getData.data.length!=0 ? getData.data[0].banner_filename : '')
                //     , descriptionConstruct: (getData.data.length!=0 ? getData.data[0].banner_description : '')/
                // });
            } catch (error) {
                console.log(error)
                if (error.response == null) {
                    // Modal.error({
                    //     title: "Internal Server Error",
                    //     content: "Error On Get Data SKU Plant Storage Location. (Please contact you system administrator and report this error message)",
                    // });
                } else {
                    // if (error.response.status === 401) {
                    //     Router.push("/security/sign-in");
                    //     return {}
                    // }
                    // Modal.error({
                    //     title: error.response.data.error_title,
                    //     content: error.response.data.error_message,
                    // });
                }
            }

        } catch (error) {
            console.log(error.error_message)
            console.log(error)
            // Modal.error({
            //     title: error.error_title,
            //     content: error.error_message,
            // });
        }
    }

    // handle product
    const handleDetailProduct = async (data) => {
        router.push('/products/detail')
    }
    const handleShopProduct = async (data) => {
        if (cookiesData.status_code !== 200) {
            router.push('/auth/login')
        }
    }
    const handleDirectPageSignUp = async () => {
        router.push('/auth/signup')
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

            {/* mobile menu */}
            {/* <div className="mobile-menu d-md-none d-block mobile-cart">
        <ul>
            <li className="active">
                <a href="!#">
                    <i className="iconly-Home icli"></i>
                    <span>Home</span>
                </a>
            </li>

            <li className="mobile-category">
                <a href="!#">
                    <i className="iconly-Category icli js-link"></i>
                    <span>Category</span>
                </a>
            </li>

            <li>
                <a href="!#" className="search-box">
                    <i className="iconly-Search icli"></i>
                    <span>Search</span>
                </a>
            </li>

            <li>
                <a href="!#" className="notifi-wishlist">
                    <i className="iconly-Heart icli"></i>
                    <span>My Wish</span>
                </a>
            </li>

            <li>
                <a href="!#">
                    <i className="iconly-Bag-2 icli fly-cate"></i>
                    <span>Cart</span>
                </a>
            </li>
        </ul>
    </div> */}
            {/* mobile menu end */}

            {/* banner menu */}
            <div className="container-fluid p-0">
                <div className="header-row" id="header-row" style={{ padding: '0px', overflow: 'hidden', height: '100%' }}>

                    <div className="container-fluid" style={{ padding: '0px' }}>
                        <div className="row">
                            <div className="col-xs-12">
                                <a className="navbar-brand logo" href="#javascript">
                                    <img src={process.env.REACT_APP_DITOKOKU_API_BASE_URL + '/assets/images/banner/' + bannerImageFilename} alt="banner image" style={{ width: '100%' }} crossOrigin='anonymous' />

                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* banner menu end */}


            {/* kategori menu */}
            <section>
                <div className="container-fluid-lg">
                    <div className="row">
                        <div className="col-12">
                            <Slider {...settingsSlider}>

                                {(categoryProducts.length > 0 ? categoryProducts.map((data, index) => {
                                    return (
                                        <Link href="#javascript" className="category-box category-dark wow fadeInUp" tabIndex={index} style={{ visibility: 'visible', animationName: 'fadeInUp' }} key={index}>
                                            <div>
                                                <img src={process.env.REACT_APP_DITOKOKU_API_BASE_URL + '/assets/images/category-products/' + (data.category_product_image_filename ? data.category_product_image_filename : 't-shirt.svg')} className="blur-up lazyloaded" alt="" crossOrigin="anonymous" />
                                                <h5>{data.category_product_name}</h5>
                                            </div>
                                        </Link>
                                    )
                                })
                                    :
                                    null
                                )

                                }

                            </Slider>
                        </div>
                    </div>
                </div>
            </section>
            {/* kategori menu end */}

            {/* produk menu */}
            <section className="product-section product-section-3">
                <div className="container-fluid-lg">
                    <div className="title">
                        <h2>{'Nama Kategori'}</h2>
                    </div>
                    <div className="row g-sm-4 g-3">
                        <div className="col-xxl-12 ratio_110">

                            <Slider {...settingsSlider}>
                                <div className="product-box-5 wow fadeInUp" >
                                    <div className="product-image">
                                        <Link href="#" className="bg-size blur-up lazyloaded" style={{ "backgroundImage": "url('/images/fashion/product/1.jpg')", "backgroundSize": "cover", "backgroundPosition": "center center", "backgroundRepeat": "no-repeat", "display": "block" }} onClick={() => handleDetailProduct({ id: 1, name: 'dsadas' })}>
                                            <img src="/images/fashion/product/1.jpg" className="img-fluid blur-up lazyload bg-img" alt="" style={{ "display": "none" }} />
                                        </Link>
                                    </div>

                                    <div className="product-detail">
                                        <Link href="#" tabIndex="0" onClick={() => handleDetailProduct({ id: 1, name: 'dsadas' })}>
                                            <h5 className="name">Nama Produk</h5>
                                        </Link>

                                        <h5 className="sold text-content">
                                            <span className="theme-color price">Harga Produk</span>
                                        </h5>
                                        <h5 className="" style={{ marginTop: '10px' }}>
                                            <span className="">* Potensi keuntungan Reseller Rp.</span>
                                        </h5>
                                        <div className="row" style={{ marginTop: '10px' }}>
                                            <div className="col-6">
                                                <button class="btn text-white btn-sm" style={{ width: '100%', backgroundColor: '#417394' }} onClick={() => handleDetailProduct({ id: 1, name: 'dsadas' })}> <i class="fa fa-info-circle"></i>&nbsp; Detail</button>
                                            </div>
                                            <div className="col-6">
                                                <button class="btn text-white btn-sm" style={{ width: '100%', backgroundColor: '#417394' }} onClick={() => handleShopProduct({ id: 1, name: 'dsadas' })}> <i class="fa fa-shopping-cart"></i>&nbsp;Beli</button>
                                            </div>

                                        </div>
                                        {
                                            (cookiesData.status_code !== 200) ?
                                                <div className="row" style={{ marginTop: '10px' }}>
                                                    <div className="col-12">
                                                        <button class="btn text-white btn-sm" style={{ width: '100%', backgroundColor: '#0da487' }} onClick={handleDirectPageSignUp}> <i class="fa fa-user-plus"></i>&nbsp; Daftar Sebagai Reseller</button>
                                                    </div>

                                                </div>
                                                :
                                                ''
                                        }
                                    </div>
                                </div>

                            </Slider>
                        </div>
                    </div>
                </div>
            </section>
            {/* produk menu end */}
            <br /><br />

            {/* footer menu */}
            <footer className="section-t-space footer-section-2 footer-color-3">
                <div className="container-fluid-lg">

                    <div className="sub-footer sub-footer-lite section-b-space section-t-space">
                        <div className="left-footer">
                            <p className="light-text">2023 Copyright By ditokoku.id</p>
                        </div>
                    </div>
                </div>
            </footer>

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

export default Home;