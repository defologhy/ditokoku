import Link from 'next/link'
import axios from 'axios'
import React, { useState } from 'react'
// import Spinner from "../helpers/loader";
import { useRouter } from 'next/router';
import { Modal, Button } from 'react-bootstrap';
import { getCookies, getCookie, setCookie, removeCookies } from 'cookies-next';
import Head from 'next/head'

// base function
function Login(props) {
    console.log("props signIn page:"); console.log(props);
    const router = useRouter()

    // useState variable
    // const [isLoading, setIsLoading] = useState(false)
    const [resellerKeyForSignIn, setResellerKeyForSignIn] = useState("")
    const [passwordForSignIn, setPasswordForSignIn] = useState("")
    const [showModalError, setShowModalError] = useState(false);
    const [modalErrorMessage, setModalErrorMessage] = useState({ title: '', message: '' });
    const handleCloseModalError = () => setShowModalError(false);
    const [isLoading, setIsLoading] = useState(false);

    // if (props.status_code === 200) {
    //     router.push('/')
    // }

    // sign in
    const handleSignIn = async () => {
        setIsLoading(true);
        const axiosConfigForSignIn = {
            url: process.env.REACT_APP_DITOKOKU_API_BASE_URL + process.env.REACT_APP_DITOKOKU_API_VERSION_URL + "/resellers/sign-in"
            , method: "POST"
            , timeout: 40000
            , responseType: "json"
            , responseEncoding: "utf8"
            , headers: { "Content-Type": "application/json" }
            , data:
            {
                reseller_key: resellerKeyForSignIn,
                reseller_password: passwordForSignIn
            }
        };

        //Execute Axios Configuration For JsonContentValidation
        try {
            const signInResult = await axios.request(axiosConfigForSignIn);
            setCookie('reseller_cookies', signInResult.data.data, { expires: Number(process.env.REACT_APP_COOKIE_EXPIRES) });
            // setCookie('reseller_cookies', signInResult.data.data, { maxAge: Number(process.env.REACT_APP_COOKIE_EXPIRES) });
            router.push('/')
            setIsLoading(false);
        } catch (error) {
            console.log("error:")
            console.log(error)
            if (error.response == null) {
                setIsLoading(false);
                setShowModalError(true)
                setModalErrorMessage({ title: 'Internal Server Error', message: 'Terjadi Error Saat Proses Masuk, Harap Lapor Kepada Administrator' })
                
            } else {
                setIsLoading(false);
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

            {/* loading */}
            { isLoading ? <div className="fullpage-loader">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div> : null
            }

            <section className="log-in-section background-image-2 section-b-space">
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
                                    <h4>Masuk</h4>
                                </div>

                                <div className="input-box">
                                    <form className="row g-4">
                                        <div className="col-12">
                                            <div className="form-floating theme-form-floating log-in-form">
                                                <input type="reseller_key" className="form-control" id="reseller_key" placeholder="No.Hp/Username" onChange={(e) => setResellerKeyForSignIn(e.target.value)} />
                                                <label htmlFor="reseller_key">No.Hp/Username</label>
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <div className="form-floating theme-form-floating log-in-form">
                                                <input type="password" className="form-control" id="password" placeholder="Password" onChange={(e) => setPasswordForSignIn(e.target.value)} />
                                                <label htmlFor="password">Password</label>
                                            </div>
                                        </div>

                                        {/* <div className="col-12">
                                    <div className="forgot-box">
                                        <div className="form-check ps-0 m-0 remember-box">
                                            <input className="checkbox_animated check-box" type="checkbox" id="flexCheckDefault" />
                                            <label className="form-check-label" htmlFor="flexCheckDefault">Remember me</label>
                                        </div>
                                        <a href="forgot.html" className="forgot-password">Forgot Password?</a>
                                    </div>
                                </div> */}

                                        <div className="col-12">
                                            <button className="btn btn-animation w-100 justify-content-center" onClick={handleSignIn} type="button">Masuk</button>
                                        </div>
                                    </form>
                                </div>

                                {/* <div className="other-log-in">
                            <h6>or</h6>
                        </div>

                        <div className="log-in-button">
                            <ul>
                                <li>
                                    <a href="https://www.google.com/" className="btn google-button w-100">
                                        <img src="../images/inner-page/google.png" className="blur-up lazyloaded" alt="" /> Log In with Google
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.facebook.com/" className="btn google-button w-100">
                                        <img src="../images/inner-page/facebook.png" className="blur-up lazyloaded" alt="" /> Log In with Facebook
                                    </a>
                                </li>
                            </ul>
                        </div> */}

                                <div className="other-log-in">
                                    <h6></h6>
                                </div>

                                <div className="sign-up-box">
                                    <h4>Belum Punya Akun?</h4>
                                    <Link href="/auth/signup">Daftar</Link>
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
    console.log("getcookie signIn page");
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

export default Login;