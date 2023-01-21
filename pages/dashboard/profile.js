import Link from 'next/link'
import { useRouter } from 'next/router';
import { getCookie, setCookie } from 'cookies-next';
import React, { useState, useEffect } from 'react'
import Head from 'next/head';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import Header from '../components/header';
import DashboardReseller from '../components/dashboard-reseller';

function Profil(props) {
    const router = useRouter()

    console.log("props Profile page:"); console.log(props);
    const [showToastWelcome, setShowToastWelcome] = useState(true);
    const cookiesData = (props.cookies_data ? JSON.parse(props.cookies_data) : undefined);
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

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getGender();
    }, []);

    const getGender = async () => {
        await getGenderData();
    }

    if (process.browser) {
        if (props.status_code === 401) {
            router.push('/auth/login')
        }
    }

    const getGenderData = async (pagination) => {
        try {

            //Set Axios Configuration For Sign In to NextJS Server
            const axiosConfigForGenderData = {
                url: process.env.REACT_APP_DITOKOKU_API_BASE_URL + process.env.REACT_APP_DITOKOKU_API_VERSION_URL + '/genders'
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
        setIsLoading(true);
        //Execute update Data
        let imageFilename = ""

        if (resellerImageFile) {
            const formData = new FormData();
            const fileFormat = resellerImageFile[0].name.split('.');
            const filenameFormat = 'profile-reseller-' + cookiesData.reseller_id + new Date().getTime() + '.' + fileFormat[fileFormat.length - 1];
            formData.append("file", resellerImageFile[0]);
            formData.append("file_name", filenameFormat);
            formData.append("reseller_id", cookiesData.reseller_id);
            try {
                const res = await axios.post(
                    process.env.REACT_APP_DITOKOKU_API_BASE_URL + process.env.REACT_APP_DITOKOKU_API_VERSION_URL + "/resellers/upload-profile",
                    formData
                );
                imageFilename = filenameFormat
                console.log(res);
            } catch (ex) {
                console.log(ex);
            }
        }

        const axiosConfigForResellerAdd = {
            url: process.env.REACT_APP_DITOKOKU_API_BASE_URL + process.env.REACT_APP_DITOKOKU_API_VERSION_URL + "/resellers"
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
                "reseller_gender_id": resellerGender
            }
        };

        //Execute Axios Configuration For JsonContentValidation
        try {
            const ResellerResults = await axios.request(axiosConfigForResellerAdd);
            setCookie('reseller_cookies', ResellerResults.data, { expires: Number(process.env.REACT_APP_COOKIE_EXPIRES) });
            // setCookie('reseller_cookies', ResellerResults.data, { maxAge: Number(process.env.REACT_APP_COOKIE_EXPIRES) });
            setShowModalConfirm(false);
            setShowModalUpdate(false);
            router.push('/dashboard/profile')
            setIsLoading(false);
        }
        catch (error) {
            console.log("error:")
            console.log(error)
            if (error.response == null) {
                setIsLoading(false);
                setShowModalError(true)
                setModalErrorMessage({ title: 'Internal Server Error', message: 'Terjadi Error Saat Proses Update Profil, Harap Lapor Kepada Administrator' })

            } else {
                setIsLoading(false);
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
                                onClick={(e) => {
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

            {/* loading */}
            {isLoading ? <div className="fullpage-loader">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div> : null
            }

            {/* header fix menu start */}
            <Header props={cookiesData} />
            {/* header fix menu end */}

            {/* user dashboard menu */}
            <section className="user-dashboard-section section-b-space">
                <div className="container-fluid-lg">
                    <div className="row">
                        <div className="col-xxl-3 col-lg-4">
                            <DashboardReseller props={cookiesData} isActive="profile"/>
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
                                                        {props.status_code === 200 && Object.values(cookiesData).includes(null) === true ?
                                                            <a className='btn theme-bg-color btn-md text-white float' href="#javascript" data-bs-toggle="modal" data-bs-target="#editProfile" style={{ width: '30%' }} onClick={handleShowProfilUpdate}>Dapatkan Saldo Bonus</a>
                                                            :
                                                            <a className='btn theme-bg-color btn-md text-white float' href="#javascript" data-bs-toggle="modal" data-bs-target="#editProfile" style={{ width: '30%' }} onClick={handleShowProfilUpdate}>Rubah Data Profil</a>
                                                        }

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
    console.log(getCookie('reseller_cookies', { req, res }))
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