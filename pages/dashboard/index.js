import Link from 'next/link'
import Router, { useRouter } from 'next/router';
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';
import React, { useState, useEffect } from 'react'
import Head from 'next/head';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

function Profil(props) {
    const router = useRouter()

    console.log("props Profile page:"); console.log(props);
    const [showToastWelcome, setShowToastWelcome] = useState(true);
    const cookiesData = (props.cookies_data ? JSON.parse(props.cookies_data) : {});
    const [showModalError, setShowModalError] = useState(false);
    const [modalErrorMessage, setModalErrorMessage] = useState({ title: '', message: '' });
    const handleCloseModalError = () => setShowModalError(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const handleCloseModalUpdate = () => setShowModalUpdate(false);
    const [resellerUsername, setResellerUsername] = useState(null)
    const [resellerPhoneNumber, setResellerPhoneNumber] = useState(null)
    const [resellerPassword, setResellerPassword] = useState(null)
    // optional
    const [resellerFullName, setResellerFullName] = useState(null)
    const [resellerGender, setResellerGender] = useState(null)
    const [resellerImageFile, setResellerImageFile] = useState(null)

    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const handleCloseModalConfirm = () => setShowModalConfirm(false);

    const [genderData, setGenderData] = useState([]);

    useEffect(() => {
        getGender();
    }, []);

    const getGender = async () => {
        await getGenderData();
    }

    if (process.browser){
        if (props.status_code === 401) {
            router.push('/auth/login')
        }
    }

    const getGenderData = async (pagination) => {
        try {

            //Set Axios Configuration For Sign In to NextJS Server
            const axiosConfigForGenderData = {
                url: process.env.REACT_APP_RESELLER_API_BASE_URL + process.env.REACT_APP_RESELLER_API_VERSION_URL + '/genders'
                , method: "GET"
                , timeout: 40000
                , responseType: "json"
                , responseEncoding: "utf8"
                , headers: { "Content-Type": "application/json" }
                , params: {
                    all_data: true
                }
            };

            //Execute Axios Configuration For JsonContentValidation
            try {
                const GenderDataResults = await axios.request(axiosConfigForGenderData);
                const GenderData = GenderDataResults.data;

                setGenderData(GenderData.data)
            } catch (error) {
                console.log(error)
                if (error.response == null) {
                    // Modal.error({
                    //     title: "Internal Server Error",
                    //     content: "Error On Get Data SKU Plant Storage Location. (Please contact you system administrator and report this error message)",
                    // });
                    setShowModalError(true)
                    setModalErrorMessage({ title: 'Internal Server Error', message: 'Error Saat Mengambil Data Master Gender(Harap Laporkan Pesan Ini Kepada Admin)' })
                } else {
                    // if (error.response.status === 401) {
                    //     Router.push("/security/sign-in");
                    //     return {}
                    // }
                    // Modal.error({
                    //     title: error.response.data.error_title,
                    //     content: error.response.data.error_message,
                    // });
                    setShowModalError(true)
                    setModalErrorMessage({ title: error.response.data.error_title, message: error.response.data.error_message })
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

    const handleShowProfilUpdate = async () => {
        setShowModalUpdate(true)
        setResellerUsername(cookiesData.reseller_username)
        setResellerPhoneNumber(cookiesData.reseller_phone_number)
        setResellerFullName(cookiesData.reseller_full_name)
        setResellerGender(cookiesData.gender_id)
    }

    const handleShowProfilUpdateConfirm = async () => {
        setShowModalConfirm(true)
    }

    const handleProfilUpdateConfirm = async () => {
        //Execute Add Data
        const axiosConfigForResellerAdd = {
            url: process.env.REACT_APP_RESELLER_API_BASE_URL + process.env.REACT_APP_RESELLER_API_VERSION_URL + "/resellers"
            , method: "PATCH"
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

            if(resellerImageFile){
                const formData = new FormData();
                formData.append("file", resellerImageFile[0]);
                formData.append("fileName", resellerImageFile[0].name);
                formData.append("reseller_id", cookiesData.reseller_id);
                try {
                    const res = await axios.post(
                        process.env.REACT_APP_RESELLER_API_BASE_URL + process.env.REACT_APP_RESELLER_API_VERSION_URL + "/resellers/upload-profile",
                        formData
                );
                    console.log(res);
                } catch (ex) {
                    console.log(ex);
                }
            }

            setCookie('reseller_cookies', ResellerResults.data, { maxAge: Number(process.env.REACT_APP_COOKIE_EXPIRES) });
            setShowModalConfirm(false);
            setShowModalUpdate(false);
            router.push('/dashboard')
        }
        catch (error) {
            console.log("error:")
            console.log(error)
            if (error.response == null) {
                setShowModalError(true)
                setModalErrorMessage({ title: 'Internal Server Error', message: 'Terjadi Error Saat Proses Update Profil, Harap Lapor Kepada Administrator' })
            } else {
                if (error.response.status === 401) {
                    router.push("/auth/sign-in");
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

            {showModalUpdate ? <Modal show={showModalUpdate} onHide={handleCloseModalUpdate}>
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
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Rubah Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="*******"
                                onChange={(e) => setResellerPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                            <Form.Label>Nama Lengkap</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nama Lengkap"
                                defaultValue={cookiesData.reseller_full_name}
                                onChange={(e) => setResellerFullName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                            <Form.Label>No HP</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="No HP"
                                defaultValue={cookiesData.reseller_phone_number}
                                onChange={(e) => setResellerPhoneNumber(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                            <Form.Label>Gender</Form.Label>
                            <Form.Select aria-label="Gender" defaultValue={cookiesData.gender_id} 
                            onChange={(e) => setResellerGender(e.target.value)}>
                                <option>Pilih Gender</option>
                                {
                                    genderData.map(data => {
                                        return (
                                        <>
                                            <option value={data.gender_id}>{data.gender_name}</option>
                                        </>
                                        )
                                    })
                                }

                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
                            <Form.Label>Rubah Foto</Form.Label>
                            <Form.Control
                                type="file"
                                placeholder="Rubah Foto"
                                onChange={(e) => setResellerImageFile(e.target.files)}
                                onClick={(e)=> { 
                                    setResellerImageFile(null)
                                    e.target.value = null
                               }}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleCloseModalUpdate}>
                        Close
                    </Button>
                    <Button variant="info" onClick={handleShowProfilUpdateConfirm}>
                        Update
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
                    <Button variant="info" onClick={handleProfilUpdateConfirm}>
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
                {/* <div className="header-top">
    <div className="container-fluid-lg">
        <div className="row">
            <div className="col-xxl-3 d-xxl-block d-none">
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
            </div>

            <div className="col-lg-3">
                <ul className="about-list right-nav-about">
                    <li className="right-nav-list">
                        <div className="dropdown theme-form-select">
                            <button className="btn dropdown-toggle" type="button" id="select-language" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="/images/country/united-states.png" className="img-fluid blur-up lazyloaded" alt="" />
                                <span>English</span>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="select-language">
                                <li>
                                    <a className="dropdown-item" href="!#" id="english">
                                        <img src="/images/country/united-kingdom.png" className="img-fluid blur-up lazyload" alt="" />
                                        <span>English</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="!#" id="france">
                                        <img src="/images/country/germany.png" className="img-fluid blur-up lazyload" alt="" />
                                        <span>Germany</span>
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="!#" id="chinese">
                                        <img src="/images/country/turkish.png" className="img-fluid blur-up lazyload" alt="" />
                                        <span>Turki</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className="right-nav-list">
                        <div className="dropdown theme-form-select">
                            <button className="btn dropdown-toggle" type="button" id="select-dollar" data-bs-toggle="dropdown" aria-expanded="false">
                                <span>USD</span>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end sm-dropdown-menu" aria-labelledby="select-dollar">
                                <li>
                                    <a className="dropdown-item" id="aud" href="!#">AUD</a>
                                </li>
                                <li>
                                    <a className="dropdown-item" id="eur" href="!#">EUR</a>
                                </li>
                                <li>
                                    <a className="dropdown-item" id="cny" href="!#">CNY</a>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div> */}

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
                                    <a href="!#" className="web-logo nav-logo">
                                        <img src="/images/ditokoku.png" className="img-fluid blur-up lazyloaded" alt="" />
                                    </a>

                                    <div className="header-nav-middle">
                                        <div className="main-nav navbar navbar-expand-xl navbar-light navbar-sticky">
                                            <div className="offcanvas offcanvas-collapse order-xl-2" id="primaryMenu">
                                                <div className="offcanvas-header navbar-shadow">
                                                    <h5>Menu</h5>
                                                    <button className="btn-close lead" type="button" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                                </div>
                                                <div className="offcanvas-body">
                                                    <ul className="navbar-nav">

                                                        <li className="nav-item">
                                                            <Link className='btn btn-hover-blue dropdown' href={'/'}>
                                                                Beranda
                                                            </Link>
                                                        </li>

                                                        <li className="">
                                                            <Link className='btn btn-hover-blue dropdown' href={'#'}>
                                                                Kategori
                                                            </Link>
                                                        </li>

                                                        <li className="">
                                                            <Link className='btn btn-hover-blue dropdown' href={'#'}>
                                                                Produk
                                                            </Link>
                                                        </li>

                                                        <li className="">
                                                            <Link className='btn btn-hover-blue dropdown' href={'/dashboard'}>
                                                                Profil
                                                            </Link>
                                                        </li>

                                                        {/* <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="!#" data-bs-toggle="dropdown">Blog</a>
                                            <ul className="dropdown-menu">
                                                <li>
                                                    <a className="dropdown-item" href="blog-detail.html">Blog Detail</a>
                                                </li>
                                                <li>
                                                    <a className="dropdown-item" href="blog-grid.html">Blog Grid</a>
                                                </li>
                                                <li>
                                                    <a className="dropdown-item" href="blog-list.html">Blog List</a>
                                                </li>
                                            </ul>
                                        </li>

                                        <li className="nav-item dropdown new-nav-item">
                                            <label className="new-dropdown">New</label>
                                            <a className="nav-link dropdown-toggle" href="!#" data-bs-toggle="dropdown">Pages</a>
                                            <ul className="dropdown-menu">
                                                <li className="sub-dropdown-hover">
                                                    <a className="dropdown-item" href="!#">Email
                                                        Template <span className="new-text"><i className="fa-solid fa-bolt-lightning"></i></span></a>
                                                    <ul className="sub-menu">
                                                        <li>
                                                            <a href="https://themes.pixelstrap.com/fastkart/assets/email-templete/abandonment-email.html">Abandonment</a>
                                                        </li>
                                                        <li>
                                                            <a href="https://themes.pixelstrap.com/fastkart/assets/email-templete/offer-template.html">Offer
                                                                Template</a>
                                                        </li>
                                                        <li>
                                                            <a href="https://themes.pixelstrap.com/fastkart/assets/email-templete/order-success.html">Order
                                                                Success</a>
                                                        </li>
                                                        <li>
                                                            <a href="https://themes.pixelstrap.com/fastkart/assets/email-templete/reset-password.html">Reset
                                                                Password</a>
                                                        </li>
                                                        <li>
                                                            <a href="https://themes.pixelstrap.com/fastkart/assets/email-templete/welcome.html">Welcome
                                                                template</a>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li className="sub-dropdown-hover">
                                                    <a className="dropdown-item" href="!#">Invoice
                                                        Template <span className="new-text"><i className="fa-solid fa-bolt-lightning"></i></span></a>
                                                    <ul className="sub-menu">
                                                        <li>
                                                            <a href="https://themes.pixelstrap.com/fastkart/assets/invoice/invoice-1.html">Invoice 1</a>
                                                        </li>

                                                        <li>
                                                            <a href="https://themes.pixelstrap.com/fastkart/assets/invoice/invoice-2.html">Invoice 2</a>
                                                        </li>

                                                        <li>
                                                            <a href="https://themes.pixelstrap.com/fastkart/assets/invoice/invoice-3.html">Invoice 3</a>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    <a className="dropdown-item" href="404.html">404</a>
                                                </li>
                                                <li>
                                                    <a className="dropdown-item" href="about-us.html">About Us</a>
                                                </li>
                                                <li>
                                                    <a className="dropdown-item" href="cart.html">Cart</a>
                                                </li>
                                                <li>
                                                    <a className="dropdown-item" href="contact-us.html">Contact</a>
                                                </li>
                                                <li>
                                                    <a className="dropdown-item" href="checkout.html">Checkout</a>
                                                </li>
                                                <li>
                                                    <a className="dropdown-item" href="coming-soon.html">Coming Soon</a>
                                                </li>
                                                <li>
                                                    <a className="dropdown-item" href="!#">Compare</a>
                                                </li>
                                                <li>
                                                    <a className="dropdown-item" href="faq.html">Faq</a>
                                                </li>
                                                <li>
                                                    <a className="dropdown-item" href="order-success.html">Order
                                                        Success</a>
                                                </li>
                                                <li>
                                                    <a className="dropdown-item" href="order-tracking.html">Order
                                                        Tracking</a>
                                                </li>
                                                <li>
                                                    <a className="dropdown-item" href="otp.html">OTP</a>
                                                </li>
                                                <li>
                                                    <a className="dropdown-item" href="search.html">Search</a>
                                                </li>
                                                <li>
                                                    <a className="dropdown-item" href="user-dashboard.html">User
                                                        Dashboard</a>
                                                </li>
                                                <li>
                                                    <a className="dropdown-item" href="!#">Wishlist</a>
                                                </li>
                                            </ul>
                                        </li>

                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="!#" data-bs-toggle="dropdown">Seller</a>
                                            <ul className="dropdown-menu">
                                                <li>
                                                    <a className="dropdown-item" href="seller-become.html">Become a
                                                        Seller</a>
                                                </li>
                                                <li>
                                                    <a className="dropdown-item" href="seller-dashboard.html">Seller
                                                        Dashboard</a>
                                                </li>
                                                <li>
                                                    <a className="dropdown-item" href="seller-detail.html">Seller
                                                        Detail</a>
                                                </li>
                                                <li>
                                                    <a className="dropdown-item" href="seller-detail-2.html">Seller
                                                        Detail 2</a>
                                                </li>
                                                <li>
                                                    <a className="dropdown-item" href="seller-grid.html">Seller Grid</a>
                                                </li>
                                                <li>
                                                    <a className="dropdown-item" href="seller-grid-2.html">Seller Grid
                                                        2</a>
                                                </li>
                                            </ul>
                                        </li> */}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rightside-box">
                                        <div className="search-full">
                                            <div className="input-group">
                                                <span className="input-group-text">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search font-light"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                                </span>
                                                <input type="text" className="form-control search-type" placeholder="Search here.." />
                                                <span className="input-group-text close-search">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x font-light"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                                </span>
                                            </div>
                                        </div>
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
                                            {/* <li className="right-side">
                                                <a href="!#" className="btn p-0 position-relative header-wishlist">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bookmark"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                                                </a>
                                            </li> */}
                                            <li className="right-side">
                                                <div className="onhover-dropdown header-badge">
                                                    <button type="button" className="btn p-0 position-relative header-wishlist">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-shopping-cart"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                                                        <span className="position-absolute top-0 start-100 translate-middle badge">2
                                                            <span className="visually-hidden">unread messages</span>
                                                        </span>
                                                    </button>

                                                    <div className="onhover-div">
                                                        <ul className="cart-list">
                                                            <li className="product-box-contain">
                                                                <div className="drop-cart">
                                                                    <a href="!#" className="drop-image">
                                                                        <img src="/images/vegetable/product/1.png" className="blur-up lazyloaded" alt="" />
                                                                    </a>

                                                                    <div className="drop-contain">
                                                                        <a href="!#">
                                                                            <h5>Fantasy Crunchy Choco Chip Cookies</h5>
                                                                        </a>
                                                                        <h6><span>1 x</span> $80.58</h6>
                                                                        <button className="close-button close_button">
                                                                            <i className="fa-solid fa-xmark"></i>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </li>

                                                            <li className="product-box-contain">
                                                                <div className="drop-cart">
                                                                    <a href="!#" className="drop-image">
                                                                        <img src="/images/vegetable/product/2.png" className="blur-up lazyloaded" alt="" />
                                                                    </a>

                                                                    <div className="drop-contain">
                                                                        <a href="!#">
                                                                            <h5>Peanut Butter Bite Premium Butter Cookies 600 g
                                                                            </h5>
                                                                        </a>
                                                                        <h6><span>1 x</span> $25.68</h6>
                                                                        <button className="close-button close_button">
                                                                            <i className="fa-solid fa-xmark"></i>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </ul>

                                                        <div className="price-box">
                                                            <h5>Total :</h5>
                                                            <h4 className="theme-color fw-bold">$106.58</h4>
                                                        </div>

                                                        <div className="button-group">
                                                            <a href="cart.html" className="btn btn-sm cart-button">View Cart</a>
                                                            <a href="checkout.html" className="btn btn-sm cart-button theme-bg-color
                                            text-white">Checkout</a>
                                                        </div>
                                                    </div>
                                                </div>
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
                                                        {
                                                            props.status_code === 401 ?
                                                                <>
                                                                    <li className="product-box-contain">
                                                                        <Link href="/auth/login">Masuk</Link>
                                                                    </li>

                                                                    <li className="product-box-contain">
                                                                        <Link href="/auth/signup">Daftar</Link>
                                                                    </li>
                                                                </>
                                                                :

                                                                <>

                                                                    <li className="product-box-contain">
                                                                        <a href='#javascript' onClick={handleSignOut}>
                                                                            Keluar
                                                                        </a>
                                                                    </li>
                                                                </>

                                                        }


                                                    </ul>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
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
            <section className="user-dashboard-section section-b-space">
                <div className="container-fluid-lg">
                    <div className="row">
                        <div className="col-xxl-3 col-lg-4">
                            <div className="dashboard-left-sidebar">
                                <div className="close-button d-flex d-lg-none">
                                    <button className="close-sidebar">
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>
                                </div>
                                <div className="profile-box">
                                    <div className="cover-image">
                                        <img src="/images/inner-page/cover-img.jpg" className="img-fluid blur-up lazyloaded" alt="" />
                                    </div>

                                    <div className="profile-contain">
                                        <div className="profile-image">
                                            <div className="position-relative">
                                                <img crossOrigin="anonymous" src={(cookiesData.reseller_image_filename!==null ? process.env.REACT_APP_RESELLER_API_BASE_URL + '/assets/images/profil/reseller/' +cookiesData.reseller_image_filename : '/images/inner-page/user/avatar.png')} className="blur-up update_img lazyloaded" alt="" />
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

                                <ul className="nav nav-pills user-nav-pills" id="pills-tab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <Link href={'/dashboard/address'}>
                                            <button className="nav-link" id="pills-address-tab" data-bs-toggle="pill" data-bs-target="#pills-address" type="button" role="tab" aria-controls="pills-address" aria-selected="false"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-map-pin"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                                Alamat</button>
                                        </Link>
                                    </li>

                                    <li className="nav-item" role="presentation">
                                        <Link href={'/dashboard'}>
                                            <button className="nav-link active" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="true"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                                Profil</button>
                                        </Link>
                                    </li>

                                    <li className="nav-item" role="presentation">
                                        <Link href={'/dashboard/address'}>
                                        <button className="nav-link" id="pills-dashboard-tab" data-bs-toggle="pill" data-bs-target="#pills-dashboard" type="button" role="tab" aria-controls="pills-dashboard" aria-selected="true"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                                            Top Up</button>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-xxl-9 col-lg-8">
                            <button className="btn left-dashboard-show btn-animation btn-md fw-bold d-block mb-4 d-lg-none">Show
                                Menu</button>
                            <div className="dashboard-right-sidebar">
                                <div className="tab-content" id="pills-tabContent">
                                   

                                    <div className="tab-pane fade show active" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                        <div className="dashboard-profile">
                                            {/* <div className="title">
                                        <h2>My Profile</h2>
                                        <span className="title-leaf">
                                            <svg className="icon-width bg-gray">
                                                <use xlink:href="https://themes.pixelstrap.com/fastkart/assets/svg/leaf.svg#leaf"></use>
                                            </svg>
                                        </span>
                                    </div> */}

                                            {/* <div className="profile-detail dashboard-bg-box">
                                        <div className="dashboard-title">
                                            <h3>Profile Name</h3>
                                        </div>
                                        <div className="profile-name-detail">
                                            <div className="d-sm-flex align-items-center d-block">
                                                <h3>Vicki E. Pope</h3>
                                                <div className="product-rating profile-rating">
                                                    <ul className="rating">
                                                        <li>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-star fill"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                                        </li>
                                                        <li>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-star fill"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                                        </li>
                                                        <li>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-star fill"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                                        </li>
                                                        <li>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                                        </li>
                                                        <li>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>

                                            <a href="#javascript" data-bs-toggle="modal" data-bs-target="#editProfile">Edit</a>
                                        </div>

                                        <div className="location-profile">
                                            <ul>
                                                <li>
                                                    <div className="location-box">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-map-pin"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                                        <h6>Downers Grove, IL</h6>
                                                    </div>
                                                </li>

                                                <li>
                                                    <div className="location-box">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-mail"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                                        <h6>vicki.pope@gmail.com</h6>
                                                    </div>
                                                </li>

                                                <li>
                                                    <div className="location-box">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check-square"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
                                                        <h6>Licensed for 2 years</h6>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="profile-description">
                                            <p>Residences can be classified by and how they are connected to
                                                neighbouring residences and land. Different types of housing tenure can
                                                be used for the same physical type.</p>
                                        </div>
                                    </div> */}

                                            <div className="profile-about dashboard-bg-box">
                                                <div className="row">
                                                    <div className="col-xxl-7">

                                                        <div className="dashboard-title mb-3">
                                                            <h3>Profil</h3>

                                                        </div>

                                                        <div className="table-responsive">

                                                            <table className="table">
                                                                <tbody>
                                                                    <tr>
                                                                        <td>Username :</td>
                                                                        <td>{cookiesData.reseller_username}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Gender :</td>
                                                                        <td>{cookiesData.gender_name}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>Nomor HP :</td>
                                                                        <td>
                                                                            <a href="#javascript"> {cookiesData.reseller_phone_number}</a>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>


                                                        </div>

                                                        <a className='btn theme-bg-color btn-md text-white float' href="#javascript" data-bs-toggle="modal" data-bs-target="#editProfile" style={{ width: '10%' }} onClick={handleShowProfilUpdate}>Update</a>

                                                        {/* <div className="dashboard-title mb-3">
                                                    <h3>Login Details</h3>
                                                </div> */}

                                                        {/* <div className="table-responsive">
                                                    <table className="table">
                                                        <tbody>
                                                            <tr>
                                                                <td>Email :</td>
                                                                <td>
                                                                    <a href="#javascript">vicki.pope@gmail.com
                                                                        <span data-bs-toggle="modal" data-bs-target="#editProfile">Edit</span></a>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>Password :</td>
                                                                <td>
                                                                    <a href="#javascript">●●●●●●
                                                                        <span data-bs-toggle="modal" data-bs-target="#editProfile">Edit</span></a>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div> */}
                                                    </div>

                                                    {/* <div className="col-xxl-5">
                                                <div className="profile-image">
                                                    <img src="/images/inner-page/dashboard-profile.png" className="img-fluid blur-up lazyloaded" alt="" />
                                                </div>
                                            </div> */}
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
    console.log("getcookie profile page");
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

export default Profil;