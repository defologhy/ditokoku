import Link from 'next/link'
import Router, { useRouter } from 'next/router';
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';
import React, { useState, useEffect } from 'react'
import Head from 'next/head';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios'

function TopUpBalanceRegular(props) {
    const router = useRouter()
    
    console.log("props TopUpBalanceRegular page:"); console.log(props);
    
    const [showToastWelcome, setShowToastWelcome] = useState(true);
    const cookiesData = (props.cookies_data ? JSON.parse(props.cookies_data) : {});
    const [showModalError, setShowModalError] = useState(false);
    const [modalErrorMessage, setModalErrorMessage] = useState({ title: '', message: '' });
    const handleCloseModalError = () => setShowModalError(false);
    const [showModalInsertTopUp, setShowModalInsertTopUp] = useState(false);
    const handleCloseModalInsertTopUp = () => setShowModalInsertTopUp(false);
    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const handleCloseModalConfirm = () => setShowModalConfirm(false);
    const [categoryProducts, setCategoryProducts] = useState([])

    if (process.browser){
        if (props.status_code === 401) {
            router.push('/auth/login')
        }
    }

    useEffect(() => {
        getCategoryProducts();
    }, []);
    const getCategoryProducts = async () => {
        await getDataCategoryProducts();
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

    const handleSignOut = async () => {
        deleteCookie('reseller_cookies')
        router.push('/auth/login')
    }

    const handleShowInsertTopUpConfirm = async () => {
        setShowModalConfirm(true)
    }

    const handleInsertTopUpConfirm = async () => {
        //Execute Add Data
        const axiosConfigForResellerAdd = {
            url: process.env.REACT_APP_DITOKOKU_API_BASE_URL + process.env.REACT_APP_DITOKOKU_API_VERSION_URL + "/reseller-balances/top-up"
            , method: "POST"
            , timeout: 40000
            , responseType: "json"
            , responseEncoding: "utf8"
            , headers: { "Content-Type": "application/json" }
            , data: {
                "reseller_id": cookiesData.reseller_id,
                "reseller_username": resellerUsername,
                "reseller_phone_number": resellerPhoneNumber,
                "reseller_password": resellerPassword,
                "responsible_user_id": 1,
                "reseller_full_name": resellerFullName,
                "reseller_gender_id": resellerGender,
                "reseller_image": null
            }
        };

        //Execute Axios Configuration For JsonContentValidation
        try {
            const ResellerResults = await axios.request(axiosConfigForResellerAdd);

            setShowModalConfirm(false);
            setShowModalUpdate(false);
            router.push('/dashboard/topup-balance-regular')
        }
        catch (error) {
            console.log("error:")
            console.log(error)
            if (error.response == null) {
                setShowModalError(true)
                setModalErrorMessage({ title: 'Internal Server Error', message: 'Terjadi Error Saat Proses Insert Top Up, Harap Lapor Kepada Administrator' })
            } else {
                if (error.response.status === 401) {
                    router.push("/auth/login");
                    return {}
                }
                setShowModalError(true)
                setModalErrorMessage({ title: error.response.data.error_title, message: error.response.data.error_message })
            }
        }

    }


    return (
        <>
            <Head>
                <title>Ditokoku.id</title>
                <link rel="shortcut icon" href="/images/ditokoku2.png" />
            </Head>

            {showModalInsertTopUp ? <Modal show={showModalInsertTopUp} onHide={handleCloseModalInsertTopUp}>
                <Modal.Header closeButton>
                    <Modal.Title>{'Update Profil'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Username"
                                onChange={(e) => setResellerUsername(e.target.value)}
                                defaultValue={cookiesData.reseller_username}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleCloseModalInsertTopUp}>
                        Close
                    </Button>
                    <Button variant="info" onClick={handleShowInsertTopUpConfirm}>
                        Tambah
                    </Button>
                </Modal.Footer>
            </Modal> : null}

            {showModalConfirm ? <Modal show={showModalConfirm} onHide={handleCloseModalConfirm}>
                <Modal.Header closeButton>
                    <Modal.Title>{'Update Profil'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{'Apakah Yakin Akan Update Data ? '}</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleCloseModalConfirm}>
                        Close
                    </Button>
                    <Button variant="info" onClick={handleInsertTopUpConfirm}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal> : null}

            {showModalError ? <Modal show={showModalError} onHide={handleCloseModalError}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalErrorMessage['title']}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalErrorMessage['message']}</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleCloseModalError}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal> : null}

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
                                                                <Link href={'/dashboard/topup-balance-regular'}>
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

            {/* user dashboard menu */}
            <section class="user-dashboard-section section-b-space">
        <div class="container-fluid-lg">
            <div class="row">
                <div class="col-xxl-3 col-lg-4">
                    <div class="dashboard-left-sidebar">
                        <div class="close-button d-flex d-lg-none">
                            <button class="close-sidebar">
                                <i class="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                        <div class="profile-box">
                            <div class="cover-image">
                                <img src="/images/inner-page/cover-img.jpg" class="img-fluid blur-up lazyloaded" alt=""/>
                            </div>

                            <div className="profile-contain">
                                <div className="profile-image">
                                    <div className="position-relative">
                                        <img crossorigin="anonymous" src={(cookiesData.reseller_image_filename!==null ? process.env.REACT_APP_DITOKOKU_API_BASE_URL + '/assets/images/profil/reseller/' +cookiesData.reseller_image_filename : '/images/inner-page/user/avatar.png')} className="blur-up update_img lazyloaded" alt="" />
                                        {/* <div className="cover-icon">
                                            <i className="fa-solid fa-pen">
                                                <input type="file" onchange="readURL(this,0)" />
                                            </i>
                                        </div> */}
                                    </div>
                                </div>

                                <div className="profile-name">
                                    <h3>{cookiesData.reseller_full_name}</h3>
                                    {/* <h6 className="text-content">vicki.pope@gmail.com</h6> */}
                                </div>
                            </div>
                        </div>

                        <ul class="nav nav-pills user-nav-pills" id="pills-tab" role="tablist">

                            <li className="nav-item" role="presentation">
                                <Link href={'/dashboard/address'}>
                                    <button className="nav-link" id="pills-address-tab" data-bs-toggle="pill" data-bs-target="#pills-address" type="button" role="tab" aria-controls="pills-address" aria-selected="false"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-map-pin"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                        Alamat</button>
                                </Link>
                            </li>

                            <li className="nav-item" role="presentation">
                                <Link href={'/dashboard/profile'}>
                                    <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="true"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                        Profil</button>
                                </Link>
                            </li>
                            
                            <li class="nav-item" role="presentation">
                                <Link href={'/dashboard/bank-accounts'}>
                                <button class="nav-link active" id="pills-dashboard-tab" data-bs-toggle="pill" data-bs-target="#pills-dashboard" type="button" role="tab" aria-controls="pills-dashboard" aria-selected="true"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                                    Akun Bank</button>
                                </Link>
                            </li>
                            
                            <li class="nav-item" role="presentation">
                                <Link href={'/dashboard/topup-balance-regular'}>
                                <button class="nav-link" id="pills-dashboard-tab" data-bs-toggle="pill" data-bs-target="#pills-dashboard" type="button" role="tab" aria-controls="pills-dashboard" aria-selected="true"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                                    Top Up Saldo Regular</button>
                                </Link>
                            </li>

                        </ul>
                    </div>
                </div>

                <div class="col-xxl-9 col-lg-8">
                    <button class="btn left-dashboard-show btn-animation btn-md fw-bold d-block mb-4 d-lg-none">Show
                        Menu</button>
                    <div class="dashboard-right-sidebar">
                        <div class="tab-content" id="pills-tabContent">
                            <div class="tab-pane fade active show" id="pills-dashboard" role="tabpanel" aria-labelledby="pills-dashboard-tab">
                                <div class="dashboard-home">
                                    <div class="title">
                                        <h2>Akun Bank</h2>
                                        <span class="title-leaf">
                                            <svg class="icon-width bg-gray">
                                                {/* <use xlink:href="https://themes.pixelstrap.com/fastkart/assets/svg/leaf.svg#leaf"></use> */}
                                            </svg>
                                        </span>
                                    </div>

                                    {/* <div class="dashboard-user-name">
                                        <h6 class="text-content">Hello, <b class="text-title">Vicki E. Pope</b></h6>
                                        <p class="text-content">From your My Account Dashboard you have the ability to
                                            view a snapshot of your recent account activity and update your account
                                            information. Select a link below to view or edit information.</p>
                                    </div> */}

                                    {/* <div class="total-box">
                                        <div class="row g-sm-4 g-3">
                                            <div class="col-xxl-4 col-lg-6 col-md-4 col-sm-6">
                                                <div class="totle-contain">
                                                    <img src="https://themes.pixelstrap.com/fastkart/assets/images/svg/order.svg" class="img-1 blur-up lazyloaded" alt=""/>
                                                    <img src="https://themes.pixelstrap.com/fastkart/assets/images/svg/order.svg" class="blur-up lazyloaded" alt=""/>
                                                    <div class="totle-detail">
                                                        <h5>Total Menunggu Verifikasi</h5>
                                                        <h3>3658</h3>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-xxl-4 col-lg-6 col-md-4 col-sm-6">
                                                <div class="totle-contain">
                                                    <img src="https://themes.pixelstrap.com/fastkart/assets/images/svg/pending.svg" class="img-1 blur-up lazyloaded" alt=""/>
                                                    <img src="https://themes.pixelstrap.com/fastkart/assets/images/svg/pending.svg" class="blur-up lazyloaded" alt=""/>
                                                    <div class="totle-detail">
                                                        <h5>Total Terverifikasi</h5>
                                                        <h3>254</h3>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-xxl-4 col-lg-6 col-md-4 col-sm-6">
                                                <div class="totle-contain">
                                                    <img src="https://themes.pixelstrap.com/fastkart/assets/images/svg/wishlist.svg" class="img-1 blur-up lazyloaded" alt=""/>
                                                    <img src="https://themes.pixelstrap.com/fastkart/assets/images/svg/wishlist.svg" class="blur-up lazyloaded" alt=""/>
                                                    <div class="totle-detail">
                                                        <h5>Total Pengajuan</h5>
                                                        <h3>32158</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}

                                    <div class="title title-flex">
                                        <div>
                                            <h3>Data Akun Bank</h3>
                                            <span class="title-leaf">
                                                <svg class="icon-width bg-gray"></svg>
                                            </span>
                                        </div>
                                    <button class="btn theme-bg-color text-white btn-sm fw-bold mt-lg-0 mt-3" data-bs-toggle="modal" data-bs-target="#add-address">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus me-2">
                                            <line x1="12" y1="5" x2="12" y2="19"></line>
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                        </svg>
                                    Tambah Akun (pengerjaan selanjutnya)</button>
                                </div>

                                    <div class="row g-4">
                                        <div class="col-xxl-6">
                                            <div class="dashboard-contant-title">
                                                <h4>Trx#123 <a href="javascript:void(0)" data-bs-toggle="modal" data-bs-target="#editProfile">Edit</a>
                                                </h4>
                                            </div>
                                            <div class="dashboard-detail">
                                                <h6 class="text-content">Atas Nama : Defitra M</h6>
                                                <h6 class="text-content">No Rekening : 302132132131</h6>
                                                <h6 class="text-content">Bank : BCA</h6>
                                                <h6 class="text-content">Nominal : 100.000</h6>
                                                <h6 class="text-content">Status : Menunggu Verifikasi</h6>
                                            </div>
                                        </div>

                                        <div class="col-xxl-6">
                                            <div class="dashboard-contant-title">
                                                <h4>Trx#345 <a href="javascript:void(0)" data-bs-toggle="modal" data-bs-target="#editProfile">Edit</a>
                                                </h4>
                                            </div>
                                            <div class="dashboard-detail">
                                            <h6 class="text-content">Atas Nama : Defitra M</h6>
                                                <h6 class="text-content">No Rekening : 302132132131</h6>
                                                <h6 class="text-content">Bank : BCA</h6>
                                                <h6 class="text-content">Nominal : 20.000</h6>
                                                <h6 class="text-content">Status : Terverifikasi</h6>
                                            </div>
                                        </div>

                                        <div class="col-xxl-6">
                                            <div class="dashboard-contant-title">
                                                <h4>Trx#678 <a href="javascript:void(0)" data-bs-toggle="modal" data-bs-target="#editProfile">Edit</a>
                                                </h4>
                                            </div>
                                            <div class="dashboard-detail">
                                                <h6 class="text-content">No Rekening : 302132132131</h6>
                                                <h6 class="text-content">Bank : BCA</h6>
                                                <h6 class="text-content">Nominal : 20.000</h6>
                                                <h6 class="text-content">Status : Terverifikasi</h6>
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
    </section>
        </>
    )
}

// Get Server Side Props
export async function getServerSideProps({ req, res }) {
    console.log("getcookie home page");
    getCookie('reseller_cookies', { req, res })
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

export default TopUpBalanceRegular;