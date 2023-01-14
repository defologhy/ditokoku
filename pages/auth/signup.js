import Link from 'next/link'
import axios from 'axios'
import React, { useState } from 'react'
// import Spinner from "../helpers/loader";
import { useRouter } from 'next/router';
import { Modal, Button, Toast, ToastContainer } from 'react-bootstrap';
import { getCookies, getCookie, setCookie, removeCookies } from 'cookies-next';
import Head from 'next/head';

function Signup(props) {

    console.log("props signUp page:"); console.log(props);
    const router = useRouter()
    const [showModalError, setShowModalError] = useState(false);
    const [modalErrorMessage, setModalErrorMessage] = useState({ title: '', message: '' });
    const handleCloseModalError = () => setShowModalError(false);
    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const handleCloseModalConfirm = () => setShowModalConfirm(false);
    const [resellerUsername, setResellerUsername] = useState("")
    const [resellerPhoneNumber, setResellerPhoneNumber] = useState("")
    const [resellerPassword, setResellerPassword] = useState("")

    const handleSignUp = async () => {
        setShowModalConfirm(true)
    }

    const handleSignUpConfirm = async () => {
        //Execute Add Data
        const axiosConfigForResellerAdd = {
            url: process.env.REACT_APP_DITOKOKU_API_BASE_URL + process.env.REACT_APP_DITOKOKU_API_VERSION_URL + "/resellers"
            , method: "POST"
            , timeout: 40000
            , responseType: "json"
            , responseEncoding: "utf8"
            , headers: { "Content-Type": "application/json" }
            , data: {
                "reseller_username": resellerUsername,
                "reseller_phone_number": resellerPhoneNumber,
                "reseller_password": resellerPassword,
                "responsible_user_id": 1,
                "reseller_full_name": null,
                "reseller_gender_id": null,
                "reseller_image": null
            }
        };

        //Execute Axios Configuration For JsonContentValidation
        try {
            const ResellerResults = await axios.request(axiosConfigForResellerAdd);
            setCookie('reseller_cookies', ResellerResults.data, { expires: Number(process.env.REACT_APP_COOKIE_EXPIRES) });
            // setCookie('reseller_cookies', ResellerResults.data, { maxAge: Number(process.env.REACT_APP_COOKIE_EXPIRES) });
            router.push('/')
        }
        catch (error) {
            console.log("error:")
            console.log(error)
            if (error.response == null) {
                setShowModalError(true)
                setModalErrorMessage({ title: 'Internal Server Error', message: 'Terjadi Error Saat Proses Daftar, Harap Lapor Kepada Administrator' })
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

            {showModalConfirm ? <Modal show={showModalConfirm} onHide={handleCloseModalConfirm}>
                <Modal.Header closeButton>
                    <Modal.Title>{'Daftar'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{'Apakah Yakin Data Yang Kamu Masukan Sudah Benar ? '}</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleCloseModalConfirm}>
                        Close
                    </Button>
                    <Button variant="info" onClick={handleSignUpConfirm}>
                        Daftar
                    </Button>
                </Modal.Footer>
            </Modal> : null}

            <section className="log-in-section section-b-space">
                <div className="container-fluid-lg w-100">
                    <div className="row">
                        <div className="col-xxl-6 col-xl-5 col-lg-6 d-lg-block d-none ms-auto">
                            <div className="image-contain">
                                <Link href={"/"}>
                                    <img src="../images/ditokoku2.png" className="img-fluid" alt="" />
                                </Link>
                            </div>
                        </div>

                        <div className="col-xxl-4 col-xl-5 col-lg-6 col-sm-8 mx-auto">
                            <div className="log-in-box">
                                <div className="log-in-title">
                                    <h3>Selamat Datang Ditokoku.id</h3>
                                    <h4>Buat Akun Baru</h4>
                                </div>

                                <div className="input-box">
                                    <form className="row g-4">
                                        <div className="col-12">
                                            <div className="form-floating theme-form-floating">
                                                <input type="text" className="form-control" id="phone_number" placeholder="No Whatsapp" onChange={(e) => setResellerPhoneNumber(e.target.value)} />
                                                <label htmlFor="phone_number">No Whatsapp</label>
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <div className="form-floating theme-form-floating">
                                                <input type="text" className="form-control" id="username" placeholder="Username" onChange={(e) => setResellerUsername(e.target.value)} />
                                                <label htmlFor="username">Username</label>
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <div className="form-floating theme-form-floating">
                                                <input type="password" className="form-control" id="password" placeholder="Password" onChange={(e) => setResellerPassword(e.target.value)} />
                                                <label htmlFor="password">Password</label>
                                            </div>
                                        </div>

                                        {/* <div className="col-12">
                                    <div className="forgot-box">
                                        <div className="form-check ps-0 m-0 remember-box">
                                            <input className="checkbox_animated check-box" type="checkbox" id="flexCheckDefault" />
                                            <label className="form-check-label" htmlFor="flexCheckDefault">I agree with
                                                <span>Terms</span> and <span>Privacy</span></label>
                                        </div>
                                    </div>
                                </div> */}

                                        <div className="col-12">
                                            <button className="btn btn-animation w-100" type="button" onClick={handleSignUp}>Daftar</button>
                                        </div>
                                    </form>
                                </div>

                                {/* <div className="other-log-in">
                            <h6>or</h6>
                        </div> */}

                                {/* <div className="log-in-button">
                            <ul>
                                <li>
                                    <a href="../../../external.html?link=https://accounts.google.com/signin/v2/identifier?flowName=GlifWebSignIn&amp;flowEntry=ServiceLogin" className="btn google-button w-100">
                                        <img src="../images/inner-page/google.png" className="blur-up lazyloaded" alt="">
                                        Sign up with Google
                                    </a>
                                </li>
                                <li>
                                    <a href="../../../external.html?link=https://www.facebook.com/" className="btn google-button w-100">
                                        <img src="../images/inner-page/facebook.png" className="blur-up lazyloaded" alt=""> Sign up with Facebook
                                    </a>
                                </li>
                            </ul>
                        </div> */}

                                <div className="other-log-in">
                                    <h6></h6>
                                </div>

                                <div className="sign-up-box">
                                    <h4>Sudah Punya Akun?</h4>
                                    <Link href="/auth/login">Masuk</Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-xxl-7 col-xl-6 col-lg-6"></div>
                    </div>
                </div>
            </section>
        </>
    )
}

// Get Server Side Props
export async function getServerSideProps({ req, res }) {
    console.log("getcookie signUp page");
    getCookie('reseller_cookies', { req, res })
    if (getCookie('reseller_cookies', { req, res })) {
        console.log('anda sudah login')
        return {
            props: {
                status_code: 200,
                error_title: "cookie is active",
                error_message: "cookie is active",
                cookies_data: JSON.parse(getCookie('reseller_cookies', { req, res }))
            }
        }
    }

    return {
        props: {
            status_code: 401,
            error_title: "Unauthorized",
            error_message: "Please sign in to Ditokoku Information System",
        }
    }

}

export default Signup;