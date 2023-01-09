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
            router.push('/profiles/profile')
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
                                                            <Link className='btn btn-hover-blue dropdown' href={'/profiles/profile'}>
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
                                                                        <a href='javascript:void(0)' onClick={handleSignOut}>
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
                                                <img crossorigin="anonymous" src={(cookiesData.reseller_image_filename!==null ? process.env.REACT_APP_RESELLER_API_BASE_URL + '/assets/images/profil/reseller/' +cookiesData.reseller_image_filename : '/images/inner-page/user/avatar.png')} className="blur-up update_img lazyloaded" alt="" />
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
                                        <Link href={'address'}>
                                            <button className="nav-link" id="pills-address-tab" data-bs-toggle="pill" data-bs-target="#pills-address" type="button" role="tab" aria-controls="pills-address" aria-selected="false"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-map-pin"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                                Alamat</button>
                                        </Link>
                                    </li>

                                    <li className="nav-item" role="presentation">
                                        <Link href={'profile'}>
                                            <button className="nav-link active" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="true"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                                Profil</button>
                                        </Link>
                                    </li>
                                    {/* <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-dashboard-tab" data-bs-toggle="pill" data-bs-target="#pills-dashboard" type="button" role="tab" aria-controls="pills-dashboard" aria-selected="false"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                                    DashBoard</button>
                            </li>

                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-order-tab" data-bs-toggle="pill" data-bs-target="#pills-order" type="button" role="tab" aria-controls="pills-order" aria-selected="false"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-shopping-bag"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>Order</button>
                            </li>

                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-wishlist-tab" data-bs-toggle="pill" data-bs-target="#pills-wishlist" type="button" role="tab" aria-controls="pills-wishlist" aria-selected="false"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                                    Wishlist</button>
                            </li>

                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-card-tab" data-bs-toggle="pill" data-bs-target="#pills-card" type="button" role="tab" aria-controls="pills-card" aria-selected="false"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-credit-card"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg> Saved Card</button>
                            </li>

                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-address-tab" data-bs-toggle="pill" data-bs-target="#pills-address" type="button" role="tab" aria-controls="pills-address" aria-selected="false"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-map-pin"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                    Address</button>
                            </li>

                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="true"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                    Profile</button>
                            </li>

                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-security-tab" data-bs-toggle="pill" data-bs-target="#pills-security" type="button" role="tab" aria-controls="pills-security" aria-selected="false"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-shield"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                                    Privacy</button>
                            </li> */}
                                </ul>
                            </div>
                        </div>

                        <div className="col-xxl-9 col-lg-8">
                            <button className="btn left-dashboard-show btn-animation btn-md fw-bold d-block mb-4 d-lg-none">Show
                                Menu</button>
                            <div className="dashboard-right-sidebar">
                                <div className="tab-content" id="pills-tabContent">
                                    {/* <div className="tab-pane fade" id="pills-dashboard" role="tabpanel" aria-labelledby="pills-dashboard-tab">
                                <div className="dashboard-home">
                                    <div className="title">
                                        <h2>My Dashboard</h2>
                                        <span className="title-leaf">
                                            <svg className="icon-width bg-gray">
                                                 <use xlink:href="https://themes.pixelstrap.com/fastkart/assets/svg/leaf.svg#leaf"></use> 
                                            </svg>
                                        </span>
                                    </div>

                                    <div className="dashboard-user-name">
                                        <h6 className="text-content">Hello, <b className="text-title">Vicki E. Pope</b></h6>
                                        <p className="text-content">From your My Account Dashboard you have the ability to
                                            view a snapshot of your recent account activity and update your account
                                            information. Select a link below to view or edit information.</p>
                                    </div>

                                    <div className="total-box">
                                        <div className="row g-sm-4 g-3">
                                            <div className="col-xxl-4 col-lg-6 col-md-4 col-sm-6">
                                                <div className="totle-contain">
                                                    <img src="https://themes.pixelstrap.com/fastkart/assets/images/svg/order.svg" className="img-1 blur-up lazyloaded" alt="" />
                                                    <img src="https://themes.pixelstrap.com/fastkart/assets/images/svg/order.svg" className="blur-up lazyloaded" alt="" />
                                                    <div className="totle-detail">
                                                        <h5>Total Order</h5>
                                                        <h3>3658</h3>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-xxl-4 col-lg-6 col-md-4 col-sm-6">
                                                <div className="totle-contain">
                                                    <img src="https://themes.pixelstrap.com/fastkart/assets/images/svg/pending.svg" className="img-1 blur-up lazyloaded" alt="" />
                                                    <img src="https://themes.pixelstrap.com/fastkart/assets/images/svg/pending.svg" className="blur-up lazyloaded" alt="" />
                                                    <div className="totle-detail">
                                                        <h5>Total Pending Order</h5>
                                                        <h3>254</h3>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-xxl-4 col-lg-6 col-md-4 col-sm-6">
                                                <div className="totle-contain">
                                                    <img src="https://themes.pixelstrap.com/fastkart/assets/images/svg/wishlist.svg" className="img-1 blur-up lazyloaded" alt="" />
                                                    <img src="https://themes.pixelstrap.com/fastkart/assets/images/svg/wishlist.svg" className="blur-up lazyloaded" alt="" />
                                                    <div className="totle-detail">
                                                        <h5>Total Wishlist</h5>
                                                        <h3>32158</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="dashboard-title">
                                        <h3>Account Information</h3>
                                    </div>

                                    <div className="row g-4">
                                        <div className="col-xxl-6">
                                            <div className="dashboard-contant-title">
                                                <h4>Contact Information <a href="javascript:void(0)" data-bs-toggle="modal" data-bs-target="#editProfile">Edit</a>
                                                </h4>
                                            </div>
                                            <div className="dashboard-detail">
                                                <h6 className="text-content">MARK JECNO</h6>
                                                <h6 className="text-content">vicki.pope@gmail.com</h6>
                                                <a href="javascript:void(0)">Change Password</a>
                                            </div>
                                        </div>

                                        <div className="col-xxl-6">
                                            <div className="dashboard-contant-title">
                                                <h4>Newsletters <a href="javascript:void(0)" data-bs-toggle="modal" data-bs-target="#editProfile">Edit</a></h4>
                                            </div>
                                            <div className="dashboard-detail">
                                                <h6 className="text-content">You are currently not subscribed to any
                                                    newsletter</h6>
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <div className="dashboard-contant-title">
                                                <h4>Address Book <a href="javascript:void(0)" data-bs-toggle="modal" data-bs-target="#editProfile">Edit</a></h4>
                                            </div>

                                            <div className="row g-4">
                                                <div className="col-xxl-6">
                                                    <div className="dashboard-detail">
                                                        <h6 className="text-content">Default Billing Address</h6>
                                                        <h6 className="text-content">You have not set a default billing
                                                            address.</h6>
                                                        <a href="javascript:void(0)" data-bs-toggle="modal" data-bs-target="#editProfile">Edit Address</a>
                                                    </div>
                                                </div>

                                                <div className="col-xxl-6">
                                                    <div className="dashboard-detail">
                                                        <h6 className="text-content">Default Shipping Address</h6>
                                                        <h6 className="text-content">You have not set a default shipping
                                                            address.</h6>
                                                        <a href="javascript:void(0)" data-bs-toggle="modal" data-bs-target="#editProfile">Edit Address</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}

                                    {/* <div className="tab-pane fade" id="pills-wishlist" role="tabpanel" aria-labelledby="pills-wishlist-tab">
                                <div className="dashboard-wishlist">
                                    <div className="title">
                                        <h2>My Wishlist History</h2>
                                        <span className="title-leaf title-leaf-gray">
                                            <svg className="icon-width bg-gray">
                                                 <use xlink:href="https://themes.pixelstrap.com/fastkart/assets/svg/leaf.svg#leaf"></use> 
                                            </svg>
                                        </span>
                                    </div>
                                    <div className="row g-sm-4 g-3">
                                        <div className="col-xxl-3 col-lg-6 col-md-4 col-sm-6">
                                            <div className="product-box-3 theme-bg-white h-100">
                                                <div className="product-header">
                                                    <div className="product-image">
                                                        <a href="product-left-thumbnail.html">
                                                            <img src="/images/cake/product/2.png" className="img-fluid blur-up lazyloaded" alt="" />
                                                        </a>

                                                        <div className="product-header-top">
                                                            <button className="btn wishlist-button close_button">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="product-footer">
                                                    <div className="product-detail">
                                                        <span className="span-name">Vegetable</span>
                                                        <a href="product-left-thumbnail.html">
                                                            <h5 className="name">Fresh Bread and Pastry Flour 200 g</h5>
                                                        </a>
                                                        <p className="text-content mt-1 mb-2 product-content">Cheesy feet
                                                            cheesy grin brie. Mascarpone cheese and wine hard cheese the
                                                            big cheese everyone loves smelly cheese macaroni cheese
                                                            croque monsieur.</p>
                                                        <h6 className="unit mt-1">250 ml</h6>
                                                        <h5 className="price">
                                                            <span className="theme-color">$08.02</span>
                                                            <del>$15.15</del>
                                                        </h5>
                                                        <div className="add-to-cart-box mt-2">
                                                            <button className="btn btn-add-cart addcart-button" tabindex="0">Add
                                                                <span className="add-icon">
                                                                    <i className="fa-solid fa-plus"></i>
                                                                </span>
                                                            </button>
                                                            <div className="cart_qty qty-box">
                                                                <div className="input-group">
                                                                    <button type="button" className="qty-left-minus" data-type="minus" data-field="">
                                                                        <i className="fa fa-minus" aria-hidden="true"></i>
                                                                    </button>
                                                                    <input className="form-control input-number qty-input" type="text" name="quantity" value="0" />
                                                                    <button type="button" className="qty-right-plus" data-type="plus" data-field="">
                                                                        <i className="fa fa-plus" aria-hidden="true"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-xxl-3 col-lg-6 col-md-4 col-sm-6">
                                            <div className="product-box-3 theme-bg-white h-100">
                                                <div className="product-header">
                                                    <div className="product-image">
                                                        <a href="product-left-thumbnail.html">
                                                            <img src="/images/cake/product/3.png" className="img-fluid blur-up lazyloaded" alt="" />
                                                        </a>

                                                        <div className="product-header-top">
                                                            <button className="btn wishlist-button close_button">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="product-footer">
                                                    <div className="product-detail">
                                                        <span className="span-name">Vegetable</span>
                                                        <a href="product-left-thumbnail.html">
                                                            <h5 className="name">Peanut Butter Bite Premium Butter Cookies
                                                                600 g</h5>
                                                        </a>
                                                        <p className="text-content mt-1 mb-2 product-content">Feta taleggio
                                                            croque monsieur swiss manchego cheesecake dolcelatte
                                                            jarlsberg. Hard cheese danish fontina boursin melted cheese
                                                            fondue.</p>
                                                        <h6 className="unit mt-1">350 G</h6>
                                                        <h5 className="price">
                                                            <span className="theme-color">$04.33</span>
                                                            <del>$10.36</del>
                                                        </h5>
                                                        <div className="add-to-cart-box mt-2">
                                                            <button className="btn btn-add-cart addcart-button" tabindex="0">Add
                                                                <span className="add-icon">
                                                                    <i className="fa-solid fa-plus"></i>
                                                                </span>
                                                            </button>
                                                            <div className="cart_qty qty-box">
                                                                <div className="input-group">
                                                                    <button type="button" className="qty-left-minus" data-type="minus" data-field="">
                                                                        <i className="fa fa-minus" aria-hidden="true"></i>
                                                                    </button>
                                                                    <input className="form-control input-number qty-input" type="text" name="quantity" value="0" />
                                                                    <button type="button" className="qty-right-plus" data-type="plus" data-field="">
                                                                        <i className="fa fa-plus" aria-hidden="true"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-xxl-3 col-lg-6 col-md-4 col-sm-6">
                                            <div className="product-box-3 theme-bg-white h-100">
                                                <div className="product-header">
                                                    <div className="product-image">
                                                        <a href="product-left-thumbnail.html">
                                                            <img src="/images/cake/product/4.png" className="img-fluid blur-up lazyloaded" alt="" />
                                                        </a>

                                                        <div className="product-header-top">
                                                            <button className="btn wishlist-button close_button">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="product-footer">
                                                    <div className="product-detail">
                                                        <span className="span-name">Snacks</span>
                                                        <a href="product-left-thumbnail.html">
                                                            <h5 className="name">SnackAmor Combo Pack of Jowar Stick and
                                                                Jowar Chips</h5>
                                                        </a>
                                                        <p className="text-content mt-1 mb-2 product-content">Lancashire
                                                            hard cheese parmesan. Danish fontina mozzarella cream cheese
                                                            smelly cheese cheese and wine cheesecake dolcelatte stilton.
                                                            Cream cheese parmesan who moved my cheese when the cheese
                                                            comes out everybody's happy cream cheese red leicester
                                                            ricotta edam.</p>
                                                        <h6 className="unit mt-1">570 G</h6>
                                                        <h5 className="price">
                                                            <span className="theme-color">$12.52</span>
                                                            <del>$13.62</del>
                                                        </h5>
                                                        <div className="add-to-cart-box mt-2">
                                                            <button className="btn btn-add-cart addcart-button" tabindex="0">Add
                                                                <span className="add-icon">
                                                                    <i className="fa-solid fa-plus"></i>
                                                                </span>
                                                            </button>
                                                            <div className="cart_qty qty-box">
                                                                <div className="input-group">
                                                                    <button type="button" className="qty-left-minus" data-type="minus" data-field="">
                                                                        <i className="fa fa-minus" aria-hidden="true"></i>
                                                                    </button>
                                                                    <input className="form-control input-number qty-input" type="text" name="quantity" value="0" />
                                                                    <button type="button" className="qty-right-plus" data-type="plus" data-field="">
                                                                        <i className="fa fa-plus" aria-hidden="true"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-xxl-3 col-lg-6 col-md-4 col-sm-6">
                                            <div className="product-box-3 theme-bg-white h-100">
                                                <div className="product-header">
                                                    <div className="product-image">
                                                        <a href="product-left-thumbnail.html">
                                                            <img src="/images/cake/product/5.png" className="img-fluid blur-up lazyloaded" alt="" />
                                                        </a>

                                                        <div className="product-header-top">
                                                            <button className="btn wishlist-button close_button">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="product-footer">
                                                    <div className="product-detail">
                                                        <span className="span-name">Snacks</span>
                                                        <a href="product-left-thumbnail.html">
                                                            <h5 className="name">Yumitos Chilli Sprinkled Potato Chips 100 g
                                                            </h5>
                                                        </a>
                                                        <p className="text-content mt-1 mb-2 product-content">Cheddar
                                                            cheddar pecorino hard cheese hard cheese cheese and biscuits
                                                            bocconcini babybel. Cow goat paneer cream cheese fromage
                                                            cottage cheese cauliflower cheese jarlsberg.</p>
                                                        <h6 className="unit mt-1">100 G</h6>
                                                        <h5 className="price">
                                                            <span className="theme-color">$10.25</span>
                                                            <del>$12.36</del>
                                                        </h5>
                                                        <div className="add-to-cart-box mt-2">
                                                            <button className="btn btn-add-cart addcart-button" tabindex="0">Add
                                                                <span className="add-icon">
                                                                    <i className="fa-solid fa-plus"></i>
                                                                </span>
                                                            </button>
                                                            <div className="cart_qty qty-box">
                                                                <div className="input-group">
                                                                    <button type="button" className="qty-left-minus" data-type="minus" data-field="">
                                                                        <i className="fa fa-minus" aria-hidden="true"></i>
                                                                    </button>
                                                                    <input className="form-control input-number qty-input" type="text" name="quantity" value="0" />
                                                                    <button type="button" className="qty-right-plus" data-type="plus" data-field="">
                                                                        <i className="fa fa-plus" aria-hidden="true"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-xxl-3 col-lg-6 col-md-4 col-sm-6">
                                            <div className="product-box-3 theme-bg-white h-100">
                                                <div className="product-header">
                                                    <div className="product-image">
                                                        <a href="product-left-thumbnail.html">
                                                            <img src="/images/cake/product/6.png" className="img-fluid blur-up lazyloaded" alt="" />
                                                        </a>

                                                        <div className="product-header-top">
                                                            <button className="btn wishlist-button close_button">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="product-footer">
                                                    <div className="product-detail">
                                                        <span className="span-name">Vegetable</span>
                                                        <a href="product-left-thumbnail.html">
                                                            <h5 className="name">Fantasy Crunchy Choco Chip Cookies</h5>
                                                        </a>
                                                        <p className="text-content mt-1 mb-2 product-content">Bavarian
                                                            bergkase smelly cheese swiss cut the cheese lancashire who
                                                            moved my cheese manchego melted cheese. Red leicester paneer
                                                            cow when the cheese comes out everybody's happy croque
                                                            monsieur goat melted cheese port-salut.</p>
                                                        <h6 className="unit mt-1">550 G</h6>
                                                        <h5 className="price">
                                                            <span className="theme-color">$14.25</span>
                                                            <del>$16.57</del>
                                                        </h5>
                                                        <div className="add-to-cart-box mt-2">
                                                            <button className="btn btn-add-cart addcart-button" tabindex="0">Add
                                                                <span className="add-icon">
                                                                    <i className="fa-solid fa-plus"></i>
                                                                </span>
                                                            </button>
                                                            <div className="cart_qty qty-box">
                                                                <div className="input-group">
                                                                    <button type="button" className="qty-left-minus" data-type="minus" data-field="">
                                                                        <i className="fa fa-minus" aria-hidden="true"></i>
                                                                    </button>
                                                                    <input className="form-control input-number qty-input" type="text" name="quantity" value="0" />
                                                                    <button type="button" className="qty-right-plus" data-type="plus" data-field="">
                                                                        <i className="fa fa-plus" aria-hidden="true"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-xxl-3 col-lg-6 col-md-4 col-sm-6">
                                            <div className="product-box-3 theme-bg-white h-100">
                                                <div className="product-header">
                                                    <div className="product-image">
                                                        <a href="product-left-thumbnail.html">
                                                            <img src="/images/cake/product/7.png" className="img-fluid blur-up lazyloaded" alt="" />
                                                        </a>

                                                        <div className="product-header-top">
                                                            <button className="btn wishlist-button close_button">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="product-footer">
                                                    <div className="product-detail">
                                                        <span className="span-name">Vegetable</span>
                                                        <a href="product-left-thumbnail.html">
                                                            <h5 className="name">Fresh Bread and Pastry Flour 200 g</h5>
                                                        </a>
                                                        <p className="text-content mt-1 mb-2 product-content">Melted cheese
                                                            babybel chalk and cheese. Port-salut port-salut cream cheese
                                                            when the cheese comes out everybody's happy cream cheese
                                                            hard cheese cream cheese red leicester.</p>
                                                        <h6 className="unit mt-1">1 Kg</h6>
                                                        <h5 className="price">
                                                            <span className="theme-color">$12.68</span>
                                                            <del>$14.69</del>
                                                        </h5>
                                                        <div className="add-to-cart-box mt-2">
                                                            <button className="btn btn-add-cart addcart-button" tabindex="0">Add
                                                                <span className="add-icon">
                                                                    <i className="fa-solid fa-plus"></i>
                                                                </span>
                                                            </button>
                                                            <div className="cart_qty qty-box">
                                                                <div className="input-group">
                                                                    <button type="button" className="qty-left-minus" data-type="minus" data-field="">
                                                                        <i className="fa fa-minus" aria-hidden="true"></i>
                                                                    </button>
                                                                    <input className="form-control input-number qty-input" type="text" name="quantity" value="0" />
                                                                    <button type="button" className="qty-right-plus" data-type="plus" data-field="">
                                                                        <i className="fa fa-plus" aria-hidden="true"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-xxl-3 col-lg-6 col-md-4 col-sm-6">
                                            <div className="product-box-3 theme-bg-white h-100">
                                                <div className="product-header">
                                                    <div className="product-image">
                                                        <a href="product-left-thumbnail.html">
                                                            <img src="/images/cake/product/2.png" className="img-fluid blur-up lazyloaded" alt="" />
                                                        </a>

                                                        <div className="product-header-top">
                                                            <button className="btn wishlist-button close_button">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="product-footer">
                                                    <div className="product-detail">
                                                        <span className="span-name">Vegetable</span>
                                                        <a href="product-left-thumbnail.html">
                                                            <h5 className="name">Fresh Bread and Pastry Flour 200 g</h5>
                                                        </a>
                                                        <p className="text-content mt-1 mb-2 product-content">Squirty cheese
                                                            cottage cheese cheese strings. Red leicester paneer danish
                                                            fontina queso lancashire when the cheese comes out
                                                            everybody's happy cottage cheese paneer.</p>
                                                        <h6 className="unit mt-1">250 ml</h6>
                                                        <h5 className="price">
                                                            <span className="theme-color">$08.02</span>
                                                            <del>$15.15</del>
                                                        </h5>
                                                        <div className="add-to-cart-box mt-2">
                                                            <button className="btn btn-add-cart addcart-button" tabindex="0">Add
                                                                <span className="add-icon">
                                                                    <i className="fa-solid fa-plus"></i>
                                                                </span>
                                                            </button>
                                                            <div className="cart_qty qty-box">
                                                                <div className="input-group">
                                                                    <button type="button" className="qty-left-minus" data-type="minus" data-field="">
                                                                        <i className="fa fa-minus" aria-hidden="true"></i>
                                                                    </button>
                                                                    <input className="form-control input-number qty-input" type="text" name="quantity" value="0" />
                                                                    <button type="button" className="qty-right-plus" data-type="plus" data-field="">
                                                                        <i className="fa fa-plus" aria-hidden="true"></i>
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
                            </div> */}

                                    {/* <div className="tab-pane fade" id="pills-order" role="tabpanel" aria-labelledby="pills-order-tab">
                                <div className="dashboard-order">
                                    <div className="title">
                                        <h2>My Orders History</h2>
                                        <span className="title-leaf title-leaf-gray">
                                            <svg className="icon-width bg-gray">
                                                 <use xlink:href="https://themes.pixelstrap.com/fastkart/assets/svg/leaf.svg#leaf"></use> 
                                            </svg>
                                        </span>
                                    </div>

                                    <div className="order-contain">
                                        <div className="order-box dashboard-bg-box">
                                            <div className="order-container">
                                                <div className="order-icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-box"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                                                </div>

                                                <div className="order-detail">
                                                    <h4>Delivere <span>Panding</span></h4>
                                                    <h6 className="text-content">Gouda parmesan caerphilly mozzarella
                                                        cottage cheese cauliflower cheese taleggio gouda.</h6>
                                                </div>
                                            </div>

                                            <div className="product-order-detail">
                                                <a href="product-left-thumbnail.html" className="order-image">
                                                    <img src="/images/vegetable/product/1.png" className="blur-up lazyloaded" alt="" />
                                                </a>

                                                <div className="order-wrap">
                                                    <a href="product-left-thumbnail.html">
                                                        <h3>Fantasy Crunchy Choco Chip Cookies</h3>
                                                    </a>
                                                    <p className="text-content">Cheddar dolcelatte gouda. Macaroni cheese
                                                        cheese strings feta halloumi cottage cheese jarlsberg cheese
                                                        triangles say cheese.</p>
                                                    <ul className="product-size">
                                                        <li>
                                                            <div className="size-box">
                                                                <h6 className="text-content">Price : </h6>
                                                                <h5>$20.68</h5>
                                                            </div>
                                                        </li>

                                                        <li>
                                                            <div className="size-box">
                                                                <h6 className="text-content">Rate : </h6>
                                                                <div className="product-rating ms-2">
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
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-star fill"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                                                        </li>
                                                                        <li>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </li>

                                                        <li>
                                                            <div className="size-box">
                                                                <h6 className="text-content">Sold By : </h6>
                                                                <h5>Fresho</h5>
                                                            </div>
                                                        </li>

                                                        <li>
                                                            <div className="size-box">
                                                                <h6 className="text-content">Quantity : </h6>
                                                                <h5>250 G</h5>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="order-box dashboard-bg-box">
                                            <div className="order-container">
                                                <div className="order-icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-box"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                                                </div>

                                                <div className="order-detail">
                                                    <h4>Delivered <span className="success-bg">Success</span></h4>
                                                    <h6 className="text-content">Cheese on toast cheesy grin cheesy grin
                                                        cottage cheese caerphilly everyone loves cottage cheese the big
                                                        cheese.</h6>
                                                </div>
                                            </div>

                                            <div className="product-order-detail">
                                                <a href="product-left-thumbnail.html" className="order-image">
                                                    <img src="/images/vegetable/product/2.png" alt="" className="blur-up lazyloaded" />
                                                </a>

                                                <div className="order-wrap">
                                                    <a href="product-left-thumbnail.html">
                                                        <h3>Cold Brew Coffee Instant Coffee 50 g</h3>
                                                    </a>
                                                    <p className="text-content">Pecorino paneer port-salut when the cheese
                                                        comes out everybody's happy red leicester mascarpone blue
                                                        castello cauliflower cheese.</p>
                                                    <ul className="product-size">
                                                        <li>
                                                            <div className="size-box">
                                                                <h6 className="text-content">Price : </h6>
                                                                <h5>$20.68</h5>
                                                            </div>
                                                        </li>

                                                        <li>
                                                            <div className="size-box">
                                                                <h6 className="text-content">Rate : </h6>
                                                                <div className="product-rating ms-2">
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
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-star fill"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                                                        </li>
                                                                        <li>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </li>

                                                        <li>
                                                            <div className="size-box">
                                                                <h6 className="text-content">Sold By : </h6>
                                                                <h5>Fresho</h5>
                                                            </div>
                                                        </li>

                                                        <li>
                                                            <div className="size-box">
                                                                <h6 className="text-content">Quantity : </h6>
                                                                <h5>250 G</h5>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="order-box dashboard-bg-box">
                                            <div className="order-container">
                                                <div className="order-icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-box"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                                                </div>

                                                <div className="order-detail">
                                                    <h4>Delivere <span>Panding</span></h4>
                                                    <h6 className="text-content">Cheesy grin boursin cheesy grin cheesecake
                                                        blue castello cream cheese lancashire melted cheese.</h6>
                                                </div>
                                            </div>

                                            <div className="product-order-detail">
                                                <a href="product-left-thumbnail.html" className="order-image">
                                                    <img src="/images/vegetable/product/3.png" alt="" className="blur-up lazyloaded" />
                                                </a>

                                                <div className="order-wrap">
                                                    <a href="product-left-thumbnail.html">
                                                        <h3>Peanut Butter Bite Premium Butter Cookies 600 g</h3>
                                                    </a>
                                                    <p className="text-content">Cow bavarian bergkase mascarpone paneer
                                                        squirty cheese fromage frais cheese slices when the cheese comes
                                                        out everybody's happy.</p>
                                                    <ul className="product-size">
                                                        <li>
                                                            <div className="size-box">
                                                                <h6 className="text-content">Price : </h6>
                                                                <h5>$20.68</h5>
                                                            </div>
                                                        </li>

                                                        <li>
                                                            <div className="size-box">
                                                                <h6 className="text-content">Rate : </h6>
                                                                <div className="product-rating ms-2">
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
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-star fill"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                                                        </li>
                                                                        <li>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </li>

                                                        <li>
                                                            <div className="size-box">
                                                                <h6 className="text-content">Sold By : </h6>
                                                                <h5>Fresho</h5>
                                                            </div>
                                                        </li>

                                                        <li>
                                                            <div className="size-box">
                                                                <h6 className="text-content">Quantity : </h6>
                                                                <h5>250 G</h5>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="order-box dashboard-bg-box">
                                            <div className="order-container">
                                                <div className="order-icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-box"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                                                </div>

                                                <div className="order-detail">
                                                    <h4>Delivered <span className="success-bg">Success</span></h4>
                                                    <h6 className="text-content">Caerphilly port-salut parmesan pecorino
                                                        croque monsieur dolcelatte melted cheese cheese and wine.</h6>
                                                </div>
                                            </div>

                                            <div className="product-order-detail">
                                                <a href="product-left-thumbnail.html" className="order-image">
                                                    <img src="/images/vegetable/product/4.png" className="blur-up lazyloaded" alt="" />
                                                </a>

                                                <div className="order-wrap">
                                                    <a href="product-left-thumbnail.html">
                                                        <h3>SnackAmor Combo Pack of Jowar Stick and Jowar Chips</h3>
                                                    </a>
                                                    <p className="text-content">The big cheese cream cheese pepper jack
                                                        cheese slices danish fontina everyone loves cheese on toast
                                                        bavarian bergkase.</p>
                                                    <ul className="product-size">
                                                        <li>
                                                            <div className="size-box">
                                                                <h6 className="text-content">Price : </h6>
                                                                <h5>$20.68</h5>
                                                            </div>
                                                        </li>

                                                        <li>
                                                            <div className="size-box">
                                                                <h6 className="text-content">Rate : </h6>
                                                                <div className="product-rating ms-2">
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
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-star fill"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                                                        </li>
                                                                        <li>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </li>

                                                        <li>
                                                            <div className="size-box">
                                                                <h6 className="text-content">Sold By : </h6>
                                                                <h5>Fresho</h5>
                                                            </div>
                                                        </li>

                                                        <li>
                                                            <div className="size-box">
                                                                <h6 className="text-content">Quantity : </h6>
                                                                <h5>250 G</h5>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}

                                    <div className="tab-pane fade" id="pills-address" role="tabpanel" aria-labelledby="pills-address-tab">
                                        <div className="dashboard-address">
                                            <div className="title title-flex">
                                                <div>
                                                    <h2>My Address Book</h2>
                                                    <span className="title-leaf">
                                                        <svg className="icon-width bg-gray">
                                                            {/* <use xlink:href="https://themes.pixelstrap.com/fastkart/assets/svg/leaf.svg#leaf"></use> */}
                                                        </svg>
                                                    </span>
                                                </div>

                                                <button className="btn theme-bg-color text-white btn-sm fw-bold mt-lg-0 mt-3" data-bs-toggle="modal" data-bs-target="#add-address"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus me-2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> Add New Address</button>
                                            </div>

                                            <div className="row g-sm-4 g-3">
                                                <div className="col-xxl-4 col-xl-6 col-lg-12 col-md-6">
                                                    <div className="address-box">
                                                        <div>
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="radio" name="jack" id="flexRadioDefault2" checked="" />
                                                            </div>

                                                            <div className="label">
                                                                <label>Home</label>
                                                            </div>

                                                            <div className="table-responsive address-table">
                                                                <table className="table">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td colSpan="2">Jack Jennas</td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td>Address :</td>
                                                                            <td>
                                                                                <p>8424 James Lane South San Francisco, CA 94080
                                                                                </p>
                                                                            </td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td>Pin Code :</td>
                                                                            <td>+380</td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td>Phone :</td>
                                                                            <td>+ 812-710-3798</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>

                                                        <div className="button-group">
                                                            <button className="btn btn-sm add-button w-100" data-bs-toggle="modal" data-bs-target="#editProfile"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                                                Edit</button>
                                                            <button className="btn btn-sm add-button w-100" data-bs-toggle="modal" data-bs-target="#removeProfile"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                                                Remove</button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-xxl-4 col-xl-6 col-lg-12 col-md-6">
                                                    <div className="address-box">
                                                        <div>
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="radio" name="jack" id="flexRadioDefault3" />
                                                            </div>

                                                            <div className="label">
                                                                <label>Office</label>
                                                            </div>

                                                            <div className="table-responsive address-table">
                                                                <table className="table">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td colSpan="2">Terry S. Sutton</td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td>Address :</td>
                                                                            <td>
                                                                                <p>2280 Rose Avenue Kenner, LA 70062</p>
                                                                            </td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td>Pin Code :</td>
                                                                            <td>+25</td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td>Phone :</td>
                                                                            <td>+ 504-228-0969</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>

                                                        <div className="button-group">
                                                            <button className="btn btn-sm add-button w-100" data-bs-toggle="modal" data-bs-target="#editProfile"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                                                Edit</button>
                                                            <button className="btn btn-sm add-button w-100" data-bs-toggle="modal" data-bs-target="#removeProfile"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                                                Remove</button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-xxl-4 col-xl-6 col-lg-12 col-md-6">
                                                    <div className="address-box">
                                                        <div>
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="radio" name="jack" id="flexRadioDefault4" />
                                                            </div>

                                                            <div className="label">
                                                                <label>Neighbour</label>
                                                            </div>

                                                            <div className="table-responsive address-table">
                                                                <table className="table">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td colSpan="2">Juan M. McKeon</td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td>Address :</td>
                                                                            <td>
                                                                                <p>1703 Carson Street Lexington, KY 40593</p>
                                                                            </td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td>Pin Code :</td>
                                                                            <td>+78</td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td>Phone :</td>
                                                                            <td>+ 859-257-0509</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>

                                                        <div className="button-group">
                                                            <button className="btn btn-sm add-button w-100" data-bs-toggle="modal" data-bs-target="#editProfile"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                                                Edit</button>
                                                            <button className="btn btn-sm add-button w-100" data-bs-toggle="modal" data-bs-target="#removeProfile"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                                                Remove</button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-xxl-4 col-xl-6 col-lg-12 col-md-6">
                                                    <div className="address-box">
                                                        <div>
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="radio" name="jack" id="flexRadioDefault5" />
                                                            </div>

                                                            <div className="label">
                                                                <label>Home 2</label>
                                                            </div>

                                                            <div className="table-responsive address-table">
                                                                <table className="table">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td colSpan="2">Gary M. Bailey</td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td>Address :</td>
                                                                            <td>
                                                                                <p>2135 Burning Memory Lane Philadelphia, PA
                                                                                    19135</p>
                                                                            </td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td>Pin Code :</td>
                                                                            <td>+26</td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td>Phone :</td>
                                                                            <td>+ 215-335-9916</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>

                                                        <div className="button-group">
                                                            <button className="btn btn-sm add-button w-100" data-bs-toggle="modal" data-bs-target="#editProfile"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                                                Edit</button>
                                                            <button className="btn btn-sm add-button w-100" data-bs-toggle="modal" data-bs-target="#removeProfile"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                                                Remove</button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-xxl-4 col-xl-6 col-lg-12 col-md-6">
                                                    <div className="address-box">
                                                        <div>
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="radio" name="jack" id="flexRadioDefault1" />
                                                            </div>

                                                            <div className="label">
                                                                <label>Home 2</label>
                                                            </div>

                                                            <div className="table-responsive address-table">
                                                                <table className="table">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td colSpan="2">Gary M. Bailey</td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td>Address :</td>
                                                                            <td>
                                                                                <p>2135 Burning Memory Lane Philadelphia, PA
                                                                                    19135</p>
                                                                            </td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td>Pin Code :</td>
                                                                            <td>+26</td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td>Phone :</td>
                                                                            <td>+ 215-335-9916</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>

                                                        <div className="button-group">
                                                            <button className="btn btn-sm add-button w-100" data-bs-toggle="modal" data-bs-target="#editProfile"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                                                Edit</button>
                                                            <button className="btn btn-sm add-button w-100" data-bs-toggle="modal" data-bs-target="#removeProfile"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                                                Remove</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tab-pane fade" id="pills-card" role="tabpanel" aria-labelledby="pills-card-tab">
                                        <div className="dashboard-card">
                                            <div className="title title-flex">
                                                <div>
                                                    <h2>My Card Details</h2>
                                                    <span className="title-leaf">
                                                        <svg className="icon-width bg-gray">
                                                            {/* <use xlink:href="https://themes.pixelstrap.com/fastkart/assets/svg/leaf.svg#leaf"></use> */}
                                                        </svg>
                                                    </span>
                                                </div>

                                                <button className="btn theme-bg-color text-white btn-sm fw-bold mt-lg-0 mt-3" data-bs-toggle="modal" data-bs-target="#editCard"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus me-2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> Add New Card</button>
                                            </div>

                                            <div className="row g-4">
                                                <div className="col-xxl-4 col-xl-6 col-lg-12 col-sm-6">
                                                    <div className="payment-card-detail">
                                                        <div className="card-details">
                                                            <div className="card-number">
                                                                <h4>XXXX - XXXX - XXXX - 2548</h4>
                                                            </div>

                                                            <div className="valid-detail">
                                                                <div className="title">
                                                                    <span>valid</span>
                                                                    <span>thru</span>
                                                                </div>
                                                                <div className="date">
                                                                    <h3>08/05</h3>
                                                                </div>
                                                                <div className="primary">
                                                                    <span className="badge bg-pill badge-light">primary</span>
                                                                </div>
                                                            </div>

                                                            <div className="name-detail">
                                                                <div className="name">
                                                                    <h5>Audrey Carol</h5>
                                                                </div>
                                                                <div className="card-img">
                                                                    <img src="/images/payment-icon/1.jpg" className="img-fluid blur-up lazyloaded" alt="" />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="edit-card">
                                                            <a data-bs-toggle="modal" data-bs-target="#editCard" href="javascript:void(0)"><i className="far fa-edit"></i> edit</a>
                                                            <a href="javascript:void(0)" data-bs-toggle="modal" data-bs-target="#removeProfile"><i className="far fa-minus-square"></i> delete</a>
                                                        </div>
                                                    </div>

                                                    <div className="edit-card-mobile">
                                                        <a data-bs-toggle="modal" data-bs-target="#editCard" href="javascript:void(0)"><i className="far fa-edit"></i> edit</a>
                                                        <a href="javascript:void(0)"><i className="far fa-minus-square"></i>
                                                            delete</a>
                                                    </div>
                                                </div>

                                                <div className="col-xxl-4 col-xl-6 col-lg-12 col-sm-6">
                                                    <div className="payment-card-detail">
                                                        <div className="card-details card-visa">
                                                            <div className="card-number">
                                                                <h4>XXXX - XXXX - XXXX - 1536</h4>
                                                            </div>

                                                            <div className="valid-detail">
                                                                <div className="title">
                                                                    <span>valid</span>
                                                                    <span>thru</span>
                                                                </div>
                                                                <div className="date">
                                                                    <h3>12/23</h3>
                                                                </div>
                                                                <div className="primary">
                                                                    <span className="badge bg-pill badge-light">primary</span>
                                                                </div>
                                                            </div>

                                                            <div className="name-detail">
                                                                <div className="name">
                                                                    <h5>Leah Heather</h5>
                                                                </div>
                                                                <div className="card-img">
                                                                    <img src="/images/payment-icon/2.jpg" className="img-fluid blur-up lazyloaded" alt="" />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="edit-card">
                                                            <a data-bs-toggle="modal" data-bs-target="#editCard" href="javascript:void(0)"><i className="far fa-edit"></i> edit</a>
                                                            <a href="javascript:void(0)" data-bs-toggle="modal" data-bs-target="#removeProfile"><i className="far fa-minus-square"></i> delete</a>
                                                        </div>
                                                    </div>

                                                    <div className="edit-card-mobile">
                                                        <a data-bs-toggle="modal" data-bs-target="#editCard" href="javascript:void(0)"><i className="far fa-edit"></i> edit</a>
                                                        <a href="javascript:void(0)"><i className="far fa-minus-square"></i>
                                                            delete</a>
                                                    </div>
                                                </div>

                                                <div className="col-xxl-4 col-xl-6 col-lg-12 col-sm-6">
                                                    <div className="payment-card-detail">
                                                        <div className="card-details dabit-card">
                                                            <div className="card-number">
                                                                <h4>XXXX - XXXX - XXXX - 1366</h4>
                                                            </div>

                                                            <div className="valid-detail">
                                                                <div className="title">
                                                                    <span>valid</span>
                                                                    <span>thru</span>
                                                                </div>
                                                                <div className="date">
                                                                    <h3>05/21</h3>
                                                                </div>
                                                                <div className="primary">
                                                                    <span className="badge bg-pill badge-light">primary</span>
                                                                </div>
                                                            </div>

                                                            <div className="name-detail">
                                                                <div className="name">
                                                                    <h5>mark jecno</h5>
                                                                </div>
                                                                <div className="card-img">
                                                                    <img src="/images/payment-icon/3.jpg" className="img-fluid blur-up lazyloaded" alt="" />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="edit-card">
                                                            <a data-bs-toggle="modal" data-bs-target="#editCard" href="javascript:void(0)"><i className="far fa-edit"></i> edit</a>
                                                            <a href="javascript:void(0)" data-bs-toggle="modal" data-bs-target="#removeProfile"><i className="far fa-minus-square"></i> delete</a>
                                                        </div>
                                                    </div>

                                                    <div className="edit-card-mobile">
                                                        <a data-bs-toggle="modal" data-bs-target="#editCard" href="javascript:void(0)"><i className="far fa-edit"></i> edit</a>
                                                        <a href="javascript:void(0)"><i className="far fa-minus-square"></i>
                                                            delete</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

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

                                            <a href="javascript:void(0)" data-bs-toggle="modal" data-bs-target="#editProfile">Edit</a>
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
                                                                            <a href="javascript:void(0)"> {cookiesData.reseller_phone_number}</a>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>


                                                        </div>

                                                        <a className='btn theme-bg-color btn-md text-white float' href="javascript:void(0)" data-bs-toggle="modal" data-bs-target="#editProfile" style={{ width: '10%' }} onClick={handleShowProfilUpdate}>Update</a>

                                                        {/* <div className="dashboard-title mb-3">
                                                    <h3>Login Details</h3>
                                                </div> */}

                                                        {/* <div className="table-responsive">
                                                    <table className="table">
                                                        <tbody>
                                                            <tr>
                                                                <td>Email :</td>
                                                                <td>
                                                                    <a href="javascript:void(0)">vicki.pope@gmail.com
                                                                        <span data-bs-toggle="modal" data-bs-target="#editProfile">Edit</span></a>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>Password :</td>
                                                                <td>
                                                                    <a href="javascript:void(0)">●●●●●●
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

                                    <div className="tab-pane fade show" id="pills-security" role="tabpanel" aria-labelledby="pills-security-tab">
                                        <div className="dashboard-privacy">
                                            <div className="dashboard-bg-box">
                                                <div className="dashboard-title mb-4">
                                                    <h3>Privacy</h3>
                                                </div>

                                                <div className="privacy-box">
                                                    <div className="d-flex align-items-start">
                                                        <h6>Allows others to see my profile</h6>
                                                        <div className="form-check form-switch switch-radio ms-auto">
                                                            <input className="form-check-input" type="checkbox" role="switch" id="redio" aria-checked="false" />
                                                            <label className="form-check-label" htmlFor="redio"></label>
                                                        </div>
                                                    </div>

                                                    <p className="text-content">all peoples will be able to see my profile</p>
                                                </div>

                                                <div className="privacy-box">
                                                    <div className="d-flex align-items-start">
                                                        <h6>who has save this profile only that people see my profile</h6>
                                                        <div className="form-check form-switch switch-radio ms-auto">
                                                            <input className="form-check-input" type="checkbox" role="switch" id="redio2" aria-checked="false" />
                                                            <label className="form-check-label" htmlFor="redio2"></label>
                                                        </div>
                                                    </div>

                                                    <p className="text-content">all peoples will not be able to see my profile</p>
                                                </div>

                                                <button className="btn theme-bg-color btn-md fw-bold mt-4 text-white">Save
                                                    Changes</button>
                                            </div>

                                            <div className="dashboard-bg-box mt-4">
                                                <div className="dashboard-title mb-4">
                                                    <h3>Account settings</h3>
                                                </div>

                                                <div className="privacy-box">
                                                    <div className="d-flex align-items-start">
                                                        <h6>Deleting Your Account Will Permanently</h6>
                                                        <div className="form-check form-switch switch-radio ms-auto">
                                                            <input className="form-check-input" type="checkbox" role="switch" id="redio3" aria-checked="false" />
                                                            <label className="form-check-label" htmlFor="redio3"></label>
                                                        </div>
                                                    </div>
                                                    <p className="text-content">Once your account is deleted, you will be logged out
                                                        and will be unable to log in back.</p>
                                                </div>

                                                <div className="privacy-box">
                                                    <div className="d-flex align-items-start">
                                                        <h6>Deleting Your Account Will Temporary</h6>
                                                        <div className="form-check form-switch switch-radio ms-auto">
                                                            <input className="form-check-input" type="checkbox" role="switch" id="redio4" aria-checked="false" />
                                                            <label className="form-check-label" htmlFor="redio4"></label>
                                                        </div>
                                                    </div>

                                                    <p className="text-content">Once your account is deleted, you will be logged out
                                                        and you will be create new account</p>
                                                </div>

                                                <button className="btn theme-bg-color btn-md fw-bold mt-4 text-white">Delete My
                                                    Account</button>
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

export default Profil;