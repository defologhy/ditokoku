import Link from 'next/link'
import Router, { useRouter } from 'next/router';
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';
import React, { useState, useEffect } from 'react'
import Head from 'next/head';
import axios from 'axios'

function Home(props) {

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
                
                setBannerId((getData.data.length!=0 ? getData.data[0].banner_id : null))
                setBannerImageFilename((getData.data.length!=0 ? getData.data[0].banner_filename : null))

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
                
                setCategoryProducts((getData.data.length!=0 ? getData.data : []))

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


    const router = useRouter()
    const [showToastWelcome, setShowToastWelcome] = useState(true);
    const [bannerId, setBannerId] = useState(null)
    const [bannerImageFilename, setBannerImageFilename] = useState(null)
    const [categoryProducts, setCategoryProducts] = useState([])
    const cookiesData = (props.cookies_data ? JSON.parse(props.cookies_data) : null);
    console.log("props Home page:"); console.log(cookiesData);

    const handleSignOut = async () => {
        deleteCookie('reseller_cookies')
        router.push('/auth/login')
    }

    return (
        <div>
            <Head>
                <title>Ditokoku.id</title>
                <link rel="shortcut icon" href="/images/ditokoku2.png" />
            </Head>
            {/* header fix menu start */}
            <header>

                {
                    props.status_code === 200 && Object.values(cookiesData).includes(null) === true ?
                        <div>
                            <div className="header-top bg-dark">
                                <div className="container-fluid-lg">
                                    <div className="row">
                                        {/* <div className="col-xxl-3 d-xxl-block d-none">
                                <div className="top-left-header">
                                    <i className="iconly-Location icli text-white"></i>
                                    <span className="text-white">1418 Riverwood Drive, CA 96052, US</span>
                                </div>
                            </div> */}

                                        {/* <div className="col-xxl-6 col-lg-9 d-lg-block d-none">
                                <div className="header-offer">
                                    <div className="notification-slider slick-initialized slick-slider slick-vertical">
                                        <div className="slick-list draggable" style={{height: "0px"}}><div className="slick-track" style={{opacity: 1, height: '0px', transform: 'translate3d(0px, 0px, 0px)'}}><div className="slick-slide slick-cloned" data-slick-index="-1" id="" aria-hidden="true" tabIndex="-1" style={{width: '0px'}}>
                                            <div className="timer-notification">
                                                <h6>Something you love is now on sale!
                                                    <a href="!#" className="text-white" tabIndex="-1">Buy Now
                                                        !</a>
                                                </h6>
                                            </div>
                                        </div><div className="slick-slide slick-current slick-active" data-slick-index="0" aria-hidden="false" tabIndex="0" style={{width: '0px'}}>
                                            <div className="timer-notification">
                                                <h6><strong className="me-1">Welcome to Fastkart!</strong>Wrap new offers/gift
                                                    every signle day on Weekends.<strong className="ms-1">New Coupon Code: Fast024
                                                    </strong>

                                                </h6>
                                            </div>
                                        </div><div className="slick-slide" data-slick-index="1" aria-hidden="true" tabIndex="-1" style={{width: '0px'}}>
                                            <div className="timer-notification">
                                                <h6>Something you love is now on sale!
                                                    <a href="!#" className="text-white" tabIndex="-1">Buy Now
                                                        !</a>
                                                </h6>
                                            </div>
                                        </div><div className="slick-slide slick-cloned" data-slick-index="2" id="" aria-hidden="true" tabIndex="-1" style={{width: '0px'}}>
                                            <div className="timer-notification">
                                                <h6><strong className="me-1">Welcome to Fastkart!</strong>Wrap new offers/gift
                                                    every signle day on Weekends.<strong className="ms-1">New Coupon Code: Fast024
                                                    </strong>

                                                </h6>
                                            </div>
                                        </div><div className="slick-slide slick-cloned" data-slick-index="3" id="" aria-hidden="true" tabIndex="-1" style={{width: '0px'}}>
                                            <div className="timer-notification">
                                                <h6>Something you love is now on sale!
                                                    <a href="!#" className="text-white" tabIndex="-1">Buy Now
                                                        !</a>
                                                </h6>
                                            </div>
                                        </div></div></div>

                                        
                                    </div>
                                </div>
                            </div> */}

                                        <div className="col-lg-2">
                                            <ul className="about-list right-nav-about">
                                                <li className="right-nav-list">
                                                    {/* <Link href={'/auth/signup'}> */}
                                                    <button className="btn" type="button" id="select-language" data-bs-toggle="dropdown" aria-expanded="false" style={{ 'fontSize': '14px', 'fontWeight': '500', 'color': '#fff', 'padding': '0 0 0 0' }}>
                                                        <span>Download</span>
                                                    </button>
                                                    {/* </Link> */}
                                                </li>
                                                <li className="right-nav-list">
                                                    {/* <Link href={'/auth/login'}> */}
                                                    <div className="dropdown theme-form-select">
                                                        <button className="btn" type="button" id="select-language" data-bs-toggle="dropdown" aria-expanded="false" style={{ 'fontSize': '14px', 'fontWeight': '500', 'color': '#fff', 'padding': '0 0 0 0' }}>
                                                            <span>Ikuti Kami Di </span>
                                                        </button>
                                                    </div>
                                                    {/* </Link> */}
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-lg-3">

                                        </div>

                                        <div className="col-lg-6">
                                            <ul className="about-list right-nav-about">

                                                <li className="right-nav-list">
                                                    <Link href={'/dashboard/profile'}>
                                                        <button className="btn" type="button" id="select-language" data-bs-toggle="dropdown" aria-expanded="false" style={{ 'fontSize': '14px', 'fontWeight': '500', 'color': '#fff', 'padding': '0 0 0 0' }}>
                                                            <span>Dapatkan Saldo Bonus</span>
                                                        </button>
                                                    </Link>

                                                </li>


                                                <li className="right-nav-list">
                                                    <div className="dropdown theme-form-select">
                                                        <button className="btn" type="button" id="select-language" data-bs-toggle="dropdown" aria-expanded="false" style={{ 'fontSize': '14px', 'fontWeight': '500', 'color': '#fff', 'padding': '0 0 0 0' }} onClick={handleSignOut}>
                                                            <span>Logout</span>
                                                        </button>
                                                    </div>
                                                </li>

                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : props.status_code === 200 && Object.values(cookiesData).includes(null) === false ?
                            <div>
                                <div className="header-top bg-dark">
                                    <div className="container-fluid-lg">
                                        <div className="row">
                                            {/* <div className="col-xxl-3 d-xxl-block d-none">
                                <div className="top-left-header">
                                    <i className="iconly-Location icli text-white"></i>
                                    <span className="text-white">1418 Riverwood Drive, CA 96052, US</span>
                                </div>
                            </div> */}

                                            {/* <div className="col-xxl-6 col-lg-9 d-lg-block d-none">
                                <div className="header-offer">
                                    <div className="notification-slider slick-initialized slick-slider slick-vertical">
                                        <div className="slick-list draggable" style={{height: "0px"}}><div className="slick-track" style={{opacity: 1, height: '0px', transform: 'translate3d(0px, 0px, 0px)'}}><div className="slick-slide slick-cloned" data-slick-index="-1" id="" aria-hidden="true" tabIndex="-1" style={{width: '0px'}}>
                                            <div className="timer-notification">
                                                <h6>Something you love is now on sale!
                                                    <a href="!#" className="text-white" tabIndex="-1">Buy Now
                                                        !</a>
                                                </h6>
                                            </div>
                                        </div><div className="slick-slide slick-current slick-active" data-slick-index="0" aria-hidden="false" tabIndex="0" style={{width: '0px'}}>
                                            <div className="timer-notification">
                                                <h6><strong className="me-1">Welcome to Fastkart!</strong>Wrap new offers/gift
                                                    every signle day on Weekends.<strong className="ms-1">New Coupon Code: Fast024
                                                    </strong>

                                                </h6>
                                            </div>
                                        </div><div className="slick-slide" data-slick-index="1" aria-hidden="true" tabIndex="-1" style={{width: '0px'}}>
                                            <div className="timer-notification">
                                                <h6>Something you love is now on sale!
                                                    <a href="!#" className="text-white" tabIndex="-1">Buy Now
                                                        !</a>
                                                </h6>
                                            </div>
                                        </div><div className="slick-slide slick-cloned" data-slick-index="2" id="" aria-hidden="true" tabIndex="-1" style={{width: '0px'}}>
                                            <div className="timer-notification">
                                                <h6><strong className="me-1">Welcome to Fastkart!</strong>Wrap new offers/gift
                                                    every signle day on Weekends.<strong className="ms-1">New Coupon Code: Fast024
                                                    </strong>

                                                </h6>
                                            </div>
                                        </div><div className="slick-slide slick-cloned" data-slick-index="3" id="" aria-hidden="true" tabIndex="-1" style={{width: '0px'}}>
                                            <div className="timer-notification">
                                                <h6>Something you love is now on sale!
                                                    <a href="!#" className="text-white" tabIndex="-1">Buy Now
                                                        !</a>
                                                </h6>
                                            </div>
                                        </div></div></div>

                                        
                                    </div>
                                </div>
                            </div> */}

                                            <div className="col-lg-2">
                                                <ul className="about-list right-nav-about">
                                                    <li className="right-nav-list">
                                                        {/* <Link href={'/auth/signup'}> */}
                                                        <button className="btn" type="button" id="select-language" data-bs-toggle="dropdown" aria-expanded="false" style={{ 'fontSize': '14px', 'fontWeight': '500', 'color': '#fff', 'padding': '0 0 0 0' }}>
                                                            <span>Download</span>
                                                        </button>
                                                        {/* </Link> */}
                                                    </li>
                                                    <li className="right-nav-list">
                                                        <Link href={'/auth/login'}>
                                                            <div className="dropdown theme-form-select">
                                                                <button className="btn" type="button" id="select-language" data-bs-toggle="dropdown" aria-expanded="false" style={{ 'fontSize': '14px', 'fontWeight': '500', 'color': '#fff', 'padding': '0 0 0 0' }}>
                                                                    <span>Ikuti Kami Di </span>
                                                                </button>
                                                            </div>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="col-lg-3">

                                            </div>

                                            <div className="col-lg-6">
                                                <ul className="about-list right-nav-about">
                                                    <li className="right-nav-list">
                                                        <div className="dropdown theme-form-select">
                                                            <button className="btn" type="button" id="select-language" data-bs-toggle="dropdown" aria-expanded="false" style={{ 'fontSize': '14px', 'fontWeight': '500', 'color': '#fff', 'padding': '0 0 0 0' }}>
                                                                <span>{cookiesData.reseller_full_name}</span>
                                                            </button>
                                                        </div>
                                                    </li>
                                                    {/* <li className="right-nav-list">
                                        <div className="dropdown theme-form-select">
                                            <button className="btn" type="button" id="select-language" data-bs-toggle="dropdown" aria-expanded="false" style={{'fontSize':'14px','fontWeight':'500','color':'#fff','padding':'0 0 0 0'}} onClick={handleSignOut}>
                                                <span>Logout</span>
                                            </button>
                                        </div>
                                    </li> */}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            <div>
                                <div className="header-top bg-dark">
                                    <div className="container-fluid-lg">
                                        <div className="row">
                                            {/* <div className="col-xxl-3 d-xxl-block d-none">
                                <div className="top-left-header">
                                    <i className="iconly-Location icli text-white"></i>
                                    <span className="text-white">1418 Riverwood Drive, CA 96052, US</span>
                                </div>
                            </div>

                            <div className="col-xxl-6 col-lg-9 d-lg-block d-none">
                                <div className="header-offer">
                                    <div className="notification-slider slick-initialized slick-slider slick-vertical">
                                        <div className="slick-list draggable" style={{height: "0px"}}><div className="slick-track" style={{opacity: 1, height: '0px', transform: 'translate3d(0px, 0px, 0px)'}}><div className="slick-slide slick-cloned" data-slick-index="-1" id="" aria-hidden="true" tabIndex="-1" style={{width: '0px'}}>
                                            <div className="timer-notification">
                                                <h6>Something you love is now on sale!
                                                    <a href="!#" className="text-white" tabIndex="-1">Buy Now
                                                        !</a>
                                                </h6>
                                            </div>
                                        </div><div className="slick-slide slick-current slick-active" data-slick-index="0" aria-hidden="false" tabIndex="0" style={{width: '0px'}}>
                                            <div className="timer-notification">
                                                <h6><strong className="me-1">Welcome to Fastkart!</strong>Wrap new offers/gift
                                                    every signle day on Weekends.<strong className="ms-1">New Coupon Code: Fast024
                                                    </strong>

                                                </h6>
                                            </div>
                                        </div><div className="slick-slide" data-slick-index="1" aria-hidden="true" tabIndex="-1" style={{width: '0px'}}>
                                            <div className="timer-notification">
                                                <h6>Something you love is now on sale!
                                                    <a href="!#" className="text-white" tabIndex="-1">Buy Now
                                                        !</a>
                                                </h6>
                                            </div>
                                        </div><div className="slick-slide slick-cloned" data-slick-index="2" id="" aria-hidden="true" tabIndex="-1" style={{width: '0px'}}>
                                            <div className="timer-notification">
                                                <h6><strong className="me-1">Welcome to Fastkart!</strong>Wrap new offers/gift
                                                    every signle day on Weekends.<strong className="ms-1">New Coupon Code: Fast024
                                                    </strong>

                                                </h6>
                                            </div>
                                        </div><div className="slick-slide slick-cloned" data-slick-index="3" id="" aria-hidden="true" tabIndex="-1" style={{width: '0px'}}>
                                            <div className="timer-notification">
                                                <h6>Something you love is now on sale!
                                                    <a href="!#" className="text-white" tabIndex="-1">Buy Now
                                                        !</a>
                                                </h6>
                                            </div>
                                        </div></div></div>

                                        
                                    </div>
                                </div>
                            </div> */}

                                            <div className="col-lg-2">
                                                <ul className="about-list right-nav-about">
                                                    <li className="right-nav-list">
                                                        {/* <Link href={'/auth/signup'}> */}
                                                        <button className="btn" type="button" id="select-language" data-bs-toggle="dropdown" aria-expanded="false" style={{ 'fontSize': '14px', 'fontWeight': '500', 'color': '#fff', 'padding': '0 0 0 0' }}>
                                                            <span>Download</span>
                                                        </button>
                                                        {/* </Link> */}
                                                    </li>
                                                    <li className="right-nav-list">
                                                        <Link href={'/auth/login'}>
                                                            <div className="dropdown theme-form-select">
                                                                <button className="btn" type="button" id="select-language" data-bs-toggle="dropdown" aria-expanded="false" style={{ 'fontSize': '14px', 'fontWeight': '500', 'color': '#fff', 'padding': '0 0 0 0' }}>
                                                                    <span>Ikuti Kami Di </span>
                                                                </button>
                                                            </div>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="col-lg-3">

                                            </div>
                                            <div className="col-lg-6">
                                                <ul className="about-list right-nav-about">
                                                    <li className="right-nav-list">
                                                        <Link href={'/auth/signup'}>
                                                            <button className="btn" type="button" id="select-language" data-bs-toggle="dropdown" aria-expanded="false" style={{ 'fontSize': '14px', 'fontWeight': '500', 'color': '#fff', 'padding': '0 0 0 0' }}>
                                                                <span>Daftar Reseller</span>
                                                            </button>
                                                        </Link>
                                                    </li>
                                                    <li className="right-nav-list">
                                                        <Link href={'/auth/login'}>
                                                            <div className="dropdown theme-form-select">
                                                                <button className="btn" type="button" id="select-language" data-bs-toggle="dropdown" aria-expanded="false" style={{ 'fontSize': '14px', 'fontWeight': '500', 'color': '#fff', 'padding': '0 0 0 0' }}>
                                                                    <span>Login Reseller</span>
                                                                </button>
                                                            </div>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                }


                <div className="top-nav top-header sticky-header">
                    <div className="container-fluid-lg">
                        <div className="row">
                            <div className="col-12">
                                <div className="navbar-top">
                                    <button className="navbar-toggler d-xl-none d-inline navbar-menu-button" type="button" data-bs-toggle="offcanvas" data-bs-target="#primaryMenu">
                                        <span className="navbar-toggler-icon">
                                            <i className="fa-solid fa-bars"></i>
                                        </span>
                                    </button>
                                    <Link href="/" className="web-logo nav-logo">
                                        <img src="/images/ditokoku.png" className="img-fluid blur-up lazyloaded" alt="" />
                                    </Link>

                                    <div className="header-nav-middle">
                                        <div className="main-nav navbar navbar-expand-xl navbar-light navbar-sticky">
                                            <div className="offcanvas offcanvas-collapse order-xl-2" id="primaryMenu">
                                                <div className="offcanvas-header navbar-shadow">
                                                    <h5>Menu</h5>
                                                    <button className="btn-close lead" type="button" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                                </div>
                                                <div className="offcanvas-body">
                                                    <ul className="navbar-nav">

                                                        <li className="nav-item dropdown">
                                                            <a className="nav-link dropdown-toggle" href="#javascript" data-bs-toggle="dropdown">Kategori</a>

                                                            <ul className="dropdown-menu">
                                                                {(categoryProducts.length > 0 ? categoryProducts.map(data=>{
                                                                    return(
                                                                        <li>
                                                                            <a className="dropdown-item" href="#javascript">{data.category_product_name}</a>
                                                                        </li>
                                                                    )
                                                                })
                                                                :
                                                                    <li>
                                                                        <a className="dropdown-item" href="#javascript">Data Tidak Tersedia</a>
                                                                    </li>
                                                                )

                                                                }
                                                                
                                                            </ul>
                                                        </li>

                                                        <li className="nav-item">
                                                            <div className="search-box">
                                                                <div className="input-group" style={{ width: '200px', marginRight: '200px' }}>
                                                                    <input type="search" className="form-control" placeholder="Cari ditokoku...." aria-label="Recipient's username" aria-describedby="button-addon2" />
                                                                    {/* <button className="btn search-button-2" type="button" id="button-addon2">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                                                </button> */}
                                                                </div>
                                                            </div>

                                                        </li>

                                                        <li className="">
                                                            Saldo Bonus: Rp. {(cookiesData ? cookiesData.balance_bonus_amount : 0)} <br />
                                                            Saldo Regular: Rp. {(cookiesData ? cookiesData.balance_regular_amount : 0)}
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {props.status_code === 200 ?
                                        <div className="rightside-box">
                                            {/* <div className="search-full">
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search font-light"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                        </span>
                                        <input type="text" className="form-control search-type" placeholder="Search here.."/>
                                        <span className="input-group-text close-search">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x font-light"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                        </span>
                                    </div>
                                </div> */}
                                            <ul className="right-side-menu">
                                                {/* <li className="right-side">
                                        <div className="delivery-login-box">
                                            <div className="delivery-icon">
                                                <div className="search-box">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                                </div>
                                            </div>
                                        </div>
                                    </li> */}
                                                <li className="right-side">
                                                    {/* <a href="wishlist.html" className="btn p-0 position-relative header-wishlist">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bookmark"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                                        </a> */}
                                                </li>
                                                <li className="right-side">
                                                    <button type="button" className="btn p-0 position-relative header-wishlist">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-shopping-cart"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                                                        <span className="position-absolute top-0 start-100 translate-middle badge">2
                                                            <span className="visually-hidden">unread messages</span>
                                                        </span>
                                                    </button>
                                                </li>

                                                <li className="right-side onhover-dropdown">
                                                    <div className="delivery-login-box">
                                                        <div className="delivery-icon">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                                        </div>
                                                        <div className="delivery-detail">
                                                            <h6>Hello,</h6>
                                                            <h5>My Account</h5>
                                                        </div>
                                                    </div>

                                                    <div className="onhover-div onhover-div-login">
                                                        <ul className="user-box-name">
                                                            <li className="product-box-contain">
                                                                <Link href={'/dashboard/profile'}>
                                                                    Profil
                                                                </Link>
                                                            </li>
                                                        </ul>
                                                        <ul className="user-box-name">
                                                            <li className="product-box-contain">
                                                                <Link href={'/dashboard/topup'}>
                                                                    Top Up Saldo
                                                                </Link>
                                                            </li>
                                                        </ul>
                                                        <ul className="user-box-name">
                                                            <li className="product-box-contain">
                                                                <a href='#javascript' onClick={handleSignOut}>
                                                                    Keluar
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </li>

                                            </ul>
                                        </div>
                                        :
                                        <div></div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
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
                                <a className="navbar-brand logo" href="index.html">
                                <img src={process.env.REACT_APP_DITOKOKU_API_BASE_URL +'/assets/images/banner/'+bannerImageFilename} alt="banner image" style={{ width: '100%' }} crossOrigin='anonymous'/>
                                   
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
                            <div className="slider-9 slick-initialized slick-slider">

                                <div className="slick-slide slick-current slick-active" style={{ width: '201px' }} data-slick-index="0" aria-hidden="false" tabIndex="0">
                                    <a href="shop-left-sidebar.html" className="category-box category-dark wow fadeInUp" tabIndex="0" style={{ visibility: 'visible', animationName: 'fadeInUp' }}>
                                        <div>
                                            <img src="https://themes.pixelstrap.com/fastkart/assets/svg/fashion/t-shirt.svg" className="blur-up lazyloaded" alt="" />
                                            <h5>Kategori 1</h5>
                                        </div>
                                    </a>
                                </div>

                                <div className="slick-slide slick-current slick-active" style={{ width: '201px' }} data-slick-index="0" aria-hidden="false" tabIndex="0">
                                    <a href="shop-left-sidebar.html" className="category-box category-dark wow fadeInUp" tabIndex="0" style={{ visibility: 'visible', animationName: 'fadeInUp' }}>
                                        <div>
                                            <img src="https://themes.pixelstrap.com/fastkart/assets/svg/fashion/t-shirt.svg" className="blur-up lazyloaded" alt="" />
                                            <h5>Kategori 2</h5>
                                        </div>
                                    </a>
                                </div>

                                <div className="slick-slide slick-current slick-active" style={{ width: '201px' }} data-slick-index="0" aria-hidden="false" tabIndex="0">
                                    <a href="shop-left-sidebar.html" className="category-box category-dark wow fadeInUp" tabIndex="0" style={{ visibility: 'visible', animationName: 'fadeInUp' }}>
                                        <div>
                                            <img src="https://themes.pixelstrap.com/fastkart/assets/svg/fashion/t-shirt.svg" className="blur-up lazyloaded" alt="" />
                                            <h5>Kategori 3</h5>
                                        </div>
                                    </a>
                                </div>

                                <div className="slick-slide slick-current slick-active" style={{ width: '201px' }} data-slick-index="0" aria-hidden="false" tabIndex="0">
                                    <a href="shop-left-sidebar.html" className="category-box category-dark wow fadeInUp" tabIndex="0" style={{ visibility: 'visible', animationName: 'fadeInUp' }}>
                                        <div>
                                            <img src="https://themes.pixelstrap.com/fastkart/assets/svg/fashion/t-shirt.svg" className="blur-up lazyloaded" alt="" />
                                            <h5>Kategori 4</h5>
                                        </div>
                                    </a>
                                </div>

                                <div className="slick-slide slick-current slick-active" style={{ width: '201px' }} data-slick-index="0" aria-hidden="false" tabIndex="0">
                                    <a href="shop-left-sidebar.html" className="category-box category-dark wow fadeInUp" tabIndex="0" style={{ visibility: 'visible', animationName: 'fadeInUp' }}>
                                        <div>
                                            <img src="https://themes.pixelstrap.com/fastkart/assets/svg/fashion/t-shirt.svg" className="blur-up lazyloaded" alt="" />
                                            <h5>Kategori 5</h5>
                                        </div>
                                    </a>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* kategori menu end */}

            {/* produk menu */}
            <section className="product-section product-section-3">
                <div className="container-fluid-lg">
                    <div className="title">
                        <h2>Produk Best Seller</h2>
                    </div>
                    <div className="row g-sm-4 g-3">
                        <div className="col-xxl-12 ratio_110">
                            <div className="slider-6 img-slider slick-initialized slick-slider">
                                <div className="slick-list draggable"><div className="slick-track" style={{ opacity: "1", width: "4020px", transform: " translate3d(-804px, 0px, 0px)" }}><div className="slick-slide slick-cloned" style={{ "width": "268px" }} data-slick-index="-3" id="" aria-hidden="true" tabIndex="-1">
                                    <div className="product-box-5 wow fadeInUp" style={{ visibility: "visible", animationName: "fadeInUp" }}>
                                        <div className="product-image">
                                            <a href="!#" tabIndex="-1" className="bg-size blur-up lazyloaded" style={{ backgroundImage: "url('images/fashion/product/4.jpg')", backgroundSize: "cover", backgroundPosition: "center center", backgroundRepeat: "no-repeat", display: "block" }}>
                                                <img src="/images/fashion/product/4.jpg" className="img-fluid blur-up lazyload bg-img" alt="" style={{ display: "none" }} />
                                            </a>

                                            <a href="!#" className="wishlist-top" data-bs-toggle="tooltip" data-bs-placement="top" title="" tabIndex="-1" data-bs-original-title="Wishlist">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bookmark"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                                            </a>

                                            <ul className="product-option">
                                                <li data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="View">
                                                    <a href="!#" data-bs-toggle="modal" data-bs-target="#view" tabIndex="-1">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                                    </a>
                                                </li>

                                                <li data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Compare">
                                                    <a href="!#" tabIndex="-1">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-refresh-cw"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                                                    </a>
                                                </li>

                                                <li data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Wishlist">
                                                    <a href="!#" className="notifi-wishlist" tabIndex="-1">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="product-detail">
                                            <a href="!#" tabIndex="-1">
                                                <h5 className="name">Black dotted shirt</h5>
                                            </a>

                                            <h5 className="sold text-content">
                                                <span className="theme-color price">$26.69</span>
                                                <del>28.56</del>
                                            </h5>
                                        </div>
                                    </div>
                                </div><div className="slick-slide slick-cloned" style={{ "width": "268px" }} data-slick-index="-2" id="" aria-hidden="true" tabIndex="-1">
                                        <div className="product-box-5 wow fadeInUp" style={{ "visibility": "visible", "animationName": "fadeInUp" }}>
                                            <div className="product-image">
                                                <a href="!#" tabIndex="-1" className="bg-size blur-up lazyloaded" style={{ "backgroundImage": "url('/images/fashion/product/5.jpg')", "backgroundSize": "cover", "backgroundPosition": "center center", "backgroundRepeat": "no-repeat", "display": "block" }}>
                                                    <img src="/images/fashion/product/5.jpg" className="img-fluid blur-up lazyload bg-img" alt="" style={{ "display": "none" }} />
                                                </a>

                                                <a href="!#" className="wishlist-top" data-bs-toggle="tooltip" data-bs-placement="top" title="" tabIndex="-1" data-bs-original-title="Wishlist">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bookmark"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                                                </a>

                                                <ul className="product-option">
                                                    <li data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="View">
                                                        <a href="!#" data-bs-toggle="modal" data-bs-target="#view" tabIndex="-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                                        </a>
                                                    </li>

                                                    <li data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Compare">
                                                        <a href="!#" tabIndex="-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-refresh-cw"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                                                        </a>
                                                    </li>

                                                    <li data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Wishlist">
                                                        <a href="!#" className="notifi-wishlist" tabIndex="-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div className="product-detail">
                                                <a href="!#" tabIndex="-1">
                                                    <h5 className="name">long brown jacket</h5>
                                                </a>

                                                <h5 className="sold text-content">
                                                    <span className="theme-color price">$26.69</span>
                                                    <del>28.56</del>
                                                </h5>
                                            </div>
                                        </div>
                                    </div><div className="slick-slide slick-cloned" style={{ "width": "268px" }} data-slick-index="-1" id="" aria-hidden="true" tabIndex="-1">
                                        <div className="product-box-5 wow fadeInUp" style={{ "visibility": "visible", "animationName": "fadeInUp" }}>
                                            <div className="product-image">
                                                <a href="!#" tabIndex="-1" className="bg-size blur-up lazyloaded" style={{ "backgroundImage": "url('images/fashion/product/6.jpg')", "backgroundSize": "cover", "backgroundPosition": "center center", "backgroundRepeat": "no-repeat", "display": "block" }}>
                                                    <img src="/images/fashion/product/6.jpg" className="img-fluid blur-up lazyload bg-img" alt="" style={{ "display": "none" }} />
                                                </a>

                                                <a href="!#" className="wishlist-top" data-bs-toggle="tooltip" data-bs-placement="top" title="" tabIndex="-1" data-bs-original-title="Wishlist">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bookmark"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                                                </a>

                                                <ul className="product-option">
                                                    <li data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="View">
                                                        <a href="!#" data-bs-toggle="modal" data-bs-target="#view" tabIndex="-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                                        </a>
                                                    </li>

                                                    <li data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Compare">
                                                        <a href="!#" tabIndex="-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-refresh-cw"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                                                        </a>
                                                    </li>

                                                    <li data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Wishlist">
                                                        <a href="!#" className="notifi-wishlist" tabIndex="-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div className="product-detail">
                                                <a href="!#" tabIndex="-1">
                                                    <h5 className="name">Black dotted jacket</h5>
                                                </a>

                                                <h5 className="sold text-content">
                                                    <span className="theme-color price">$26.69</span>
                                                    <del>28.56</del>
                                                </h5>
                                            </div>
                                        </div>
                                    </div><div className="slick-slide slick-current slick-active" style={{ "width": "268px" }} data-slick-index="0" aria-hidden="false" tabIndex="0">
                                        <div className="product-box-5 wow fadeInUp" style={{ "visibility": "visible", "animationName": "fadeInUp" }}>
                                            <div className="product-image">
                                                <a href="!#" tabIndex="0" className="bg-size blur-up lazyloaded" style={{ "backgroundImage": "url('/images/fashion/product/1.jpg')", "backgroundSize": "cover", "backgroundPosition": "center center", "backgroundRepeat": "no-repeat", "display": "block" }}>
                                                    <img src="/images/fashion/product/1.jpg" className="img-fluid blur-up lazyload bg-img" alt="" style={{ "display": "none" }} />
                                                </a>

                                                <a href="!#" className="wishlist-top" data-bs-toggle="tooltip" data-bs-placement="top" title="" tabIndex="0" data-bs-original-title="Wishlist">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bookmark"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                                                </a>

                                                <ul className="product-option">
                                                    <li data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="View">
                                                        <a href="!#" data-bs-toggle="modal" data-bs-target="#view" tabIndex="0">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                                        </a>
                                                    </li>

                                                    <li data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Compare">
                                                        <a href="!#" tabIndex="0">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-refresh-cw"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                                                        </a>
                                                    </li>

                                                    <li data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Wishlist">
                                                        <a href="!#" className="notifi-wishlist" tabIndex="0">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div className="product-detail">
                                                <a href="!#" tabIndex="0">
                                                    <h5 className="name">brown khadi jacket</h5>
                                                </a>

                                                <h5 className="sold text-content">
                                                    <span className="theme-color price">$26.69</span>
                                                    <del>28.56</del>
                                                </h5>
                                            </div>
                                        </div>
                                    </div><div className="slick-slide slick-active" style={{ "width": "268px" }} data-slick-index="1" aria-hidden="false" tabIndex="0">
                                        <div className="product-box-5 wow fadeInUp" style={{ "visibility": "visible", "animationName": "fadeInUp" }}>
                                            <div className="product-image">
                                                <a href="!#" tabIndex="0" className="bg-size blur-up lazyloaded" style={{ "backgroundImage": "url(/images/fashion/product/2.jpg)", "backgroundSize": "cover", "backgroundPosition": "center center", "backgroundRepeat": "no-repeat", "display": "block" }}>
                                                    <img src="/images/fashion/product/2.jpg" className="img-fluid blur-up lazyload bg-img" alt="" style={{ "display": "none" }} />
                                                </a>

                                                <a href="!#" className="wishlist-top" data-bs-toggle="tooltip" data-bs-placement="top" title="" tabIndex="0" data-bs-original-title="Wishlist">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bookmark"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                                                </a>

                                                <ul className="product-option">
                                                    <li data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="View">
                                                        <a href="!#" data-bs-toggle="modal" data-bs-target="#view" tabIndex="0">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                                        </a>
                                                    </li>

                                                    <li data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Compare">
                                                        <a href="!#" tabIndex="0">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-refresh-cw"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                                                        </a>
                                                    </li>

                                                    <li data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Wishlist">
                                                        <a href="!#" className="notifi-wishlist" tabIndex="0">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div className="product-detail">
                                                <a href="!#" tabIndex="0">
                                                    <h5 className="name">white top</h5>
                                                </a>

                                                <h5 className="sold text-content">
                                                    <span className="theme-color price">$26.69</span>
                                                    <del>28.56</del>
                                                </h5>
                                            </div>
                                        </div>
                                    </div><div className="slick-slide slick-active" style={{ "width": "268px" }} data-slick-index="2" aria-hidden="false" tabIndex="0">
                                        <div className="product-box-5 wow fadeInUp" style={{ "visibility": "visible", "animationName": "fadeInUp" }}>
                                            <div className="product-image">
                                                <a href="!#" tabIndex="0" className="bg-size blur-up lazyloaded" style={{ "backgroundImage": "url(/images/fashion/product/3.jpg)", "backgroundSize": "cover", "backgroundPosition": "center center", "backgroundRepeat": "no-repeat", "display": "block" }}>
                                                    <img src="/images/fashion/product/3.jpg" className="img-fluid blur-up lazyload bg-img" alt="" style={{ "display": "none" }} />
                                                </a>

                                                <a href="!#" className="wishlist-top" data-bs-toggle="tooltip" data-bs-placement="top" title="" tabIndex="0" data-bs-original-title="Wishlist">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bookmark"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                                                </a>

                                                <ul className="product-option">
                                                    <li data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="View">
                                                        <a href="!#" data-bs-toggle="modal" data-bs-target="#view" tabIndex="0">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                                        </a>
                                                    </li>

                                                    <li data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Compare">
                                                        <a href="!#" tabIndex="0">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-refresh-cw"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                                                        </a>
                                                    </li>

                                                    <li data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Wishlist">
                                                        <a href="!#" className="notifi-wishlist" tabIndex="0">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div className="product-detail">
                                                <a href="!#" tabIndex="0">
                                                    <h5 className="name">blazer with cap</h5>
                                                </a>

                                                <h5 className="sold text-content">
                                                    <span className="theme-color price">$26.69</span>
                                                    <del>28.56</del>
                                                </h5>
                                            </div>
                                        </div>
                                    </div><div className="slick-slide" style={{ "width": "268px" }} data-slick-index="3" aria-hidden="true" tabIndex="-1">
                                        <div className="product-box-5 wow fadeInUp" style={{ "visibility": "visible", "animationName": "fadeInUp" }}>
                                            <div className="product-image">
                                                <a href="!#" tabIndex="-1" className="bg-size blur-up lazyloaded" style={{ "backgroundImage": "url(/images/fashion/product/4.jpg)", "backgroundSize": "cover", "backgroundPosition": "center center", "backgroundRepeat": "no-repeat", "display": "block" }}>
                                                    <img src="/images/fashion/product/4.jpg" className="img-fluid blur-up lazyload bg-img" alt="" style={{ "display": "none" }} />
                                                </a>

                                                <a href="!#" className="wishlist-top" data-bs-toggle="tooltip" data-bs-placement="top" title="" tabIndex="-1" data-bs-original-title="Wishlist">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bookmark"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                                                </a>

                                                <ul className="product-option">
                                                    <li data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="View">
                                                        <a href="!#" data-bs-toggle="modal" data-bs-target="#view" tabIndex="-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                                        </a>
                                                    </li>

                                                    <li data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Compare">
                                                        <a href="!#" tabIndex="-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-refresh-cw"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                                                        </a>
                                                    </li>

                                                    <li data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Wishlist">
                                                        <a href="!#" className="notifi-wishlist" tabIndex="-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div className="product-detail">
                                                <a href="!#" tabIndex="-1">
                                                    <h5 className="name">Black dotted shirt</h5>
                                                </a>

                                                <h5 className="sold text-content">
                                                    <span className="theme-color price">$26.69</span>
                                                    <del>28.56</del>
                                                </h5>
                                            </div>
                                        </div>
                                    </div><div className="slick-slide" style={{ "width": "268px" }} data-slick-index="4" aria-hidden="true" tabIndex="-1">
                                        <div className="product-box-5 wow fadeInUp" style={{ "visibility": "visible", "animationName": "fadeInUp" }}>
                                            <div className="product-image">
                                                <a href="!#" tabIndex="-1" className="bg-size blur-up lazyloaded" style={{ "backgroundImage": "url('/images/fashion/product/5.jpg')", "backgroundSize": "cover", "backgroundPosition": "center center", "backgroundRepeat": "no-repeat", "display": "block" }}>
                                                    <img src="/images/fashion/product/5.jpg" className="img-fluid blur-up lazyload bg-img" alt="" style={{ "display": "none" }} />
                                                </a>

                                                <a href="!#" className="wishlist-top" data-bs-toggle="tooltip" data-bs-placement="top" title="" tabIndex="-1" data-bs-original-title="Wishlist">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bookmark"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                                                </a>

                                                <ul className="product-option">
                                                    <li data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="View">
                                                        <a href="!#" data-bs-toggle="modal" data-bs-target="#view" tabIndex="-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                                        </a>
                                                    </li>

                                                    <li data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Compare">
                                                        <a href="!#" tabIndex="-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-refresh-cw"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                                                        </a>
                                                    </li>

                                                    <li data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Wishlist">
                                                        <a href="!#" className="notifi-wishlist" tabIndex="-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div className="product-detail">
                                                <a href="!#" tabIndex="-1">
                                                    <h5 className="name">long brown jacket</h5>
                                                </a>

                                                <h5 className="sold text-content">
                                                    <span className="theme-color price">$26.69</span>
                                                    <del>28.56</del>
                                                </h5>
                                            </div>
                                        </div>
                                    </div><div className="slick-slide" style={{ "width": "268px" }} data-slick-index="5" aria-hidden="true" tabIndex="-1">
                                        <div className="product-box-5 wow fadeInUp" style={{ "visibility": "visible", "animationName": "fadeInUp" }}>
                                            <div className="product-image">
                                                <a href="!#" tabIndex="-1" className="bg-size blur-up lazyloaded" style={{ "backgroundImage": "url('/images/fashion/product/6.jpg')", "backgroundSize": "cover", "backgroundPosition": "center center", "backgroundRepeat": "no-repeat", "display": "block" }}>
                                                    <img src="/images/fashion/product/6.jpg" className="img-fluid blur-up lazyload bg-img" alt="" style={{ "display": "none" }} />
                                                </a>

                                                <a href="!#" className="wishlist-top" data-bs-toggle="tooltip" data-bs-placement="top" title="" tabIndex="-1" data-bs-original-title="Wishlist">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bookmark"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                                                </a>

                                                <ul className="product-option">
                                                    <li data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="View">
                                                        <a href="!#" data-bs-toggle="modal" data-bs-target="#view" tabIndex="-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                                        </a>
                                                    </li>

                                                    <li data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Compare">
                                                        <a href="!#" tabIndex="-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-refresh-cw"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                                                        </a>
                                                    </li>

                                                    <li data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Wishlist">
                                                        <a href="!#" className="notifi-wishlist" tabIndex="-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div className="product-detail">
                                                <a href="!#" tabIndex="-1">
                                                    <h5 className="name">Black dotted jacket</h5>
                                                </a>

                                                <h5 className="sold text-content">
                                                    <span className="theme-color price">$26.69</span>
                                                    <del>28.56</del>
                                                </h5>
                                            </div>
                                        </div>
                                    </div><div className="slick-slide slick-cloned" style={{ "width": "268px" }} data-slick-index="6" id="" aria-hidden="true" tabIndex="-1">
                                        <div className="product-box-5 wow fadeInUp" style={{ "visibility": "visible", "animationName": "fadeInUp" }}>
                                            <div className="product-image">
                                                <a href="!#" tabIndex="-1" className="bg-size blur-up lazyload" style={{ "backgroundImage": "url(/images/fashion/product/1.jpg)", "backgroundSize": "cover", "backgroundPosition": "center center", "backgroundRepeat": "no-repeat", "display": "block" }}>
                                                    <img src="/images/fashion/product/1.jpg" className="img-fluid blur-up lazyload bg-img" alt="" style={{ "display": "none" }} />
                                                </a>

                                                <a href="!#" className="wishlist-top" data-bs-toggle="tooltip" data-bs-placement="top" title="" tabIndex="-1" data-bs-original-title="Wishlist">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bookmark"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                                                </a>

                                                <ul className="product-option">
                                                    <li data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="View">
                                                        <a href="!#" data-bs-toggle="modal" data-bs-target="#view" tabIndex="-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                                        </a>
                                                    </li>

                                                    <li data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Compare">
                                                        <a href="!#" tabIndex="-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-refresh-cw"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                                                        </a>
                                                    </li>

                                                    <li data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Wishlist">
                                                        <a href="!#" className="notifi-wishlist" tabIndex="-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div className="product-detail">
                                                <a href="!#" tabIndex="-1">
                                                    <h5 className="name">brown khadi jacket</h5>
                                                </a>

                                                <h5 className="sold text-content">
                                                    <span className="theme-color price">$26.69</span>
                                                    <del>28.56</del>
                                                </h5>
                                            </div>
                                        </div>
                                    </div><div className="slick-slide slick-cloned" style={{ "width": "268px" }} data-slick-index="7" id="" aria-hidden="true" tabIndex="-1">
                                        <div className="product-box-5 wow fadeInUp" style={{ "visibility": "visible", "animationName": "fadeInUp" }}>
                                            <div className="product-image">
                                                <a href="!#" tabIndex="-1" className="bg-size blur-up lazyload" style={{ "backgroundImage": "url(/images/fashion/product/2.jpg)", "backgroundSize": "cover", "backgroundPosition": "center center", "backgroundRepeat": "no-repeat", "display": "block" }}>
                                                    <img src="/images/fashion/product/2.jpg" className="img-fluid blur-up lazyload bg-img" alt="" style={{ "display": "none" }} />
                                                </a>

                                                <a href="!#" className="wishlist-top" data-bs-toggle="tooltip" data-bs-placement="top" title="" tabIndex="-1" data-bs-original-title="Wishlist">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bookmark"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                                                </a>

                                                <ul className="product-option">
                                                    <li data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="View">
                                                        <a href="!#" data-bs-toggle="modal" data-bs-target="#view" tabIndex="-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                                        </a>
                                                    </li>

                                                    <li data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Compare">
                                                        <a href="!#" tabIndex="-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-refresh-cw"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                                                        </a>
                                                    </li>

                                                    <li data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Wishlist">
                                                        <a href="!#" className="notifi-wishlist" tabIndex="-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div className="product-detail">
                                                <a href="!#" tabIndex="-1">
                                                    <h5 className="name">white top</h5>
                                                </a>

                                                <h5 className="sold text-content">
                                                    <span className="theme-color price">$26.69</span>
                                                    <del>28.56</del>
                                                </h5>
                                            </div>
                                        </div>
                                    </div><div className="slick-slide slick-cloned" style={{ "width": "268px" }} data-slick-index="8" id="" aria-hidden="true" tabIndex="-1">
                                        <div className="product-box-5 wow fadeInUp" style={{ "visibility": "visible", "animationName": "fadeInUp" }}>
                                            <div className="product-image">
                                                <a href="!#" tabIndex="-1" className="bg-size blur-up lazyload" style={{ "backgroundImage": "url(/images/fashion/product/3.jpg)", "backgroundSize": "cover", "backgroundPosition": "center center", "backgroundRepeat": "no-repeat", "display": "block" }}>
                                                    <img src="/images/fashion/product/3.jpg" className="img-fluid blur-up lazyload bg-img" alt="" style={{ "display": "none" }} />
                                                </a>

                                                <a href="!#" className="wishlist-top" data-bs-toggle="tooltip" data-bs-placement="top" title="" tabIndex="-1" data-bs-original-title="Wishlist">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bookmark"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                                                </a>

                                                <ul className="product-option">
                                                    <li data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="View">
                                                        <a href="!#" data-bs-toggle="modal" data-bs-target="#view" tabIndex="-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                                        </a>
                                                    </li>

                                                    <li data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Compare">
                                                        <a href="!#" tabIndex="-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-refresh-cw"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                                                        </a>
                                                    </li>

                                                    <li data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Wishlist">
                                                        <a href="!#" className="notifi-wishlist" tabIndex="-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div className="product-detail">
                                                <a href="!#" tabIndex="-1">
                                                    <h5 className="name">blazer with cap</h5>
                                                </a>

                                                <h5 className="sold text-content">
                                                    <span className="theme-color price">$26.69</span>
                                                    <del>28.56</del>
                                                </h5>
                                            </div>
                                        </div>
                                    </div><div className="slick-slide slick-cloned" style={{ "width": "268px" }} data-slick-index="9" id="" aria-hidden="true" tabIndex="-1">
                                        <div className="product-box-5 wow fadeInUp" style={{ "visibility": "visible", "animationName": "fadeInUp" }}>
                                            <div className="product-image">
                                                <a href="!#" tabIndex="-1" className="bg-size blur-up lazyload" style={{ "backgroundImage": "url(/images/fashion/product/4.jpg)", "backgroundSize": "cover", "backgroundPosition": "center center", "backgroundRepeat": "no-repeat", "display": "block" }}>
                                                    <img src="/images/fashion/product/4.jpg" className="img-fluid blur-up lazyload bg-img" alt="" style={{ "display": "none" }} />
                                                </a>

                                                <a href="!#" className="wishlist-top" data-bs-toggle="tooltip" data-bs-placement="top" title="" tabIndex="-1" data-bs-original-title="Wishlist">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bookmark"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                                                </a>

                                                <ul className="product-option">
                                                    <li data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="View">
                                                        <a href="!#" data-bs-toggle="modal" data-bs-target="#view" tabIndex="-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                                        </a>
                                                    </li>

                                                    <li data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Compare">
                                                        <a href="!#" tabIndex="-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-refresh-cw"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                                                        </a>
                                                    </li>

                                                    <li data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Wishlist">
                                                        <a href="!#" className="notifi-wishlist" tabIndex="-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div className="product-detail">
                                                <a href="!#" tabIndex="-1">
                                                    <h5 className="name">Black dotted shirt</h5>
                                                </a>

                                                <h5 className="sold text-content">
                                                    <span className="theme-color price">$26.69</span>
                                                    <del>28.56</del>
                                                </h5>
                                            </div>
                                        </div>
                                    </div><div className="slick-slide slick-cloned" style={{ "width": "268px" }} data-slick-index="10" id="" aria-hidden="true" tabIndex="-1">
                                        <div className="product-box-5 wow fadeInUp" style={{ "visibility": "visible", "animationName": "fadeInUp" }}>
                                            <div className="product-image">
                                                <a href="!#" tabIndex="-1" className="bg-size blur-up lazyload" style={{ "backgroundImage": "url(/images/fashion/product/5.jpg)", "backgroundSize": "cover", "backgroundPosition": "center center", "backgroundRepeat": "no-repeat", "display": "block" }}>
                                                    <img src="/images/fashion/product/5.jpg" className="img-fluid blur-up lazyload bg-img" alt="" style={{ "display": "none" }} />
                                                </a>

                                                <a href="!#" className="wishlist-top" data-bs-toggle="tooltip" data-bs-placement="top" title="" tabIndex="-1" data-bs-original-title="Wishlist">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bookmark"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                                                </a>

                                                <ul className="product-option">
                                                    <li data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="View">
                                                        <a href="!#" data-bs-toggle="modal" data-bs-target="#view" tabIndex="-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                                        </a>
                                                    </li>

                                                    <li data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Compare">
                                                        <a href="!#" tabIndex="-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-refresh-cw"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                                                        </a>
                                                    </li>

                                                    <li data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Wishlist">
                                                        <a href="!#" className="notifi-wishlist" tabIndex="-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div className="product-detail">
                                                <a href="!#" tabIndex="-1">
                                                    <h5 className="name">long brown jacket</h5>
                                                </a>

                                                <h5 className="sold text-content">
                                                    <span className="theme-color price">$26.69</span>
                                                    <del>28.56</del>
                                                </h5>
                                            </div>
                                        </div>
                                    </div><div className="slick-slide slick-cloned" style={{ "width": "268px" }} data-slick-index="11" id="" aria-hidden="true" tabIndex="-1">
                                        <div className="product-box-5 wow fadeInUp" style={{ "visibility": "visible", "animationName": "fadeInUp" }}>
                                            <div className="product-image">
                                                <a href="!#" tabIndex="-1" className="bg-size blur-up lazyload" style={{ "backgroundImage": "url(/images/fashion/product/6.jpg)", "backgroundSize": "cover", "backgroundPosition": "center center", "backgroundRepeat": "no-repeat", "display": "block" }}>
                                                    <img src="/images/fashion/product/6.jpg" className="img-fluid blur-up lazyload bg-img" alt="" style={{ "display": "none" }} />
                                                </a>

                                                <a href="!#" className="wishlist-top" data-bs-toggle="tooltip" data-bs-placement="top" title="" tabIndex="-1" data-bs-original-title="Wishlist">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bookmark"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                                                </a>

                                                <ul className="product-option">
                                                    <li data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="View">
                                                        <a href="!#" data-bs-toggle="modal" data-bs-target="#view" tabIndex="-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                                        </a>
                                                    </li>

                                                    <li data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Compare">
                                                        <a href="!#" tabIndex="-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-refresh-cw"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                                                        </a>
                                                    </li>

                                                    <li data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Wishlist">
                                                        <a href="!#" className="notifi-wishlist" tabIndex="-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div className="product-detail">
                                                <a href="!#" tabIndex="-1">
                                                    <h5 className="name">Black dotted jacket</h5>
                                                </a>

                                                <h5 className="sold text-content">
                                                    <span className="theme-color price">$26.69</span>
                                                    <del>28.56</del>
                                                </h5>
                                            </div>
                                        </div>
                                    </div></div></div></div>
                        </div>
                    </div>
                </div>
            </section>
            {/* produk menu end */}
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