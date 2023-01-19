import Link from 'next/link'
import Router, { useRouter } from 'next/router';
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';
import React, { useState, useEffect, useCallback } from 'react'
import Head from 'next/head';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios'
import Header from '../components/header';
import DashboardReseller from '../components/dashboard-reseller';

function BankAccount(props) {
    const router = useRouter()

    console.log("props BankAccount page:"); console.log(props);

    const [showToastWelcome, setShowToastWelcome] = useState(true);
    const cookiesData = (props.cookies_data ? JSON.parse(props.cookies_data) : {});
    const [showModalInsertBankAccount, setshowModalInsertBankAccount] = useState(false);
    const handleCloseModalInsertBankAccount = () => setshowModalInsertBankAccount(false);
    const [showModalEditBankAccount, setshowModalEditBankAccount] = useState(false);
    const handleCloseModalEditBankAccount = () => setshowModalEditBankAccount(false);
    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const handleCloseModalConfirm = () => setShowModalConfirm(false);
    const [showModalConfirmEdit, setShowModalConfirmEdit] = useState(false);
    const handleCloseModalConfirmEdit = () => setShowModalConfirmEdit(false);
    const [bankAccounts, setBankAccounts] = useState([])
    const [showModalError, setShowModalError] = useState(false);
    const [modalErrorMessage, setModalErrorMessage] = useState({ title: '', message: '' });
    const handleCloseModalError = () => setShowModalError(false);
    const [bankName, setBankName] = useState("");
    const [number, setNumber] = useState(null);
    const [holderName, setHolderName] = useState("");
    const [idEdit, setIdEdit] = useState("");
    const [bankNameEdit, setBankNameEdit] = useState("");
    const [numberEdit, setNumberEdit] = useState(null);
    const [holderNameEdit, setHolderNameEdit] = useState("");

    if (process.browser) {
        if (props.status_code === 401) {
            router.push('/auth/login')
        }
    }

    useEffect(() => {
        getBankAccount();
    }, []);

    const getBankAccount = async () => {
        await getDataBankAccount();
    }
    const getDataBankAccount = async () => {
        try {

            //Set Axios Configuration For Sign In to NextJS Server
            const axiosConfigForGetData = {
                url: process.env.REACT_APP_DITOKOKU_API_BASE_URL + process.env.REACT_APP_DITOKOKU_API_VERSION_URL + '/reseller-payment-accounts?filter={"reseller_id":[' + cookiesData.reseller_id + ']}'
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
                console.log("getDataBankAccount", getData)

                setBankAccounts((getData.data.length != 0 ? getData.data : []))

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

    const handleShowInsertBankAccountConfirm = async () => {
        setShowModalConfirm(true)
    }

    const handleShowEditBankAccountConfirm = async () => {
        setShowModalConfirmEdit(true)
    }

    const handleInsertBankAccountConfirm = async () => {
        //Execute Add Data
        const axiosConfigForResellerAdd = {
            url: process.env.REACT_APP_DITOKOKU_API_BASE_URL + process.env.REACT_APP_DITOKOKU_API_VERSION_URL + "/reseller-payment-accounts"
            , method: "POST"
            , timeout: 40000
            , responseType: "json"
            , responseEncoding: "utf8"
            , headers: { "Content-Type": "application/json" }
            , data: {
                "reseller_id": cookiesData.reseller_id,
                "reseller_payment_account_number": number,
                "reseller_payment_account_bank_name": bankName,
                "reseller_payment_account_holder_name": holderName,
                "responsible_user_id": cookiesData.reseller_id
            }
        };

        //Execute Axios Configuration For JsonContentValidation
        try {
            await axios.request(axiosConfigForResellerAdd);

            setShowModalConfirm(false);
            setshowModalInsertBankAccount(false);
            await getBankAccount();
            router.push('/dashboard/bank-accounts')
        }
        catch (error) {
            console.log("error:")
            console.log(error)
            if (error.response == null) {
                setShowModalError(true)
                setModalErrorMessage({ title: 'Internal Server Error', message: 'Terjadi Error Saat Proses Insert Akun Bank, Harap Lapor Kepada Administrator' })
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

    const handleShowModalAdd = async () => {
        setshowModalInsertBankAccount(true)
    }

    const handleEditBankAccount = useCallback((data) => {
        return async (e) => {
            e.preventDefault()
            setBankNameEdit(data.reseller_payment_account_bank_name)
            setNumberEdit(data.reseller_payment_account_number)
            setHolderNameEdit(data.reseller_payment_account_holder_name)
            setIdEdit(data.reseller_payment_account_id)

            setshowModalEditBankAccount(true)
        }
    }, [])

    const handleEditBankAccountConfirm = async () => {
        //Execute Add Data
        const axiosConfigForResellerAdd = {
            url: process.env.REACT_APP_DITOKOKU_API_BASE_URL + process.env.REACT_APP_DITOKOKU_API_VERSION_URL + "/reseller-payment-accounts"
            , method: "PATCH"
            , timeout: 40000
            , responseType: "json"
            , responseEncoding: "utf8"
            , headers: { "Content-Type": "application/json" }
            , data: {
                "reseller_id": cookiesData.reseller_id,
                "reseller_payment_account_id": idEdit,
                "reseller_payment_account_number": numberEdit,
                "reseller_payment_account_bank_name": bankNameEdit,
                "reseller_payment_account_holder_name": holderNameEdit,
                "responsible_user_id": cookiesData.reseller_id
            }
        };

        //Execute Axios Configuration For JsonContentValidation
        try {
            await axios.request(axiosConfigForResellerAdd);

            setShowModalConfirmEdit(false);
            setshowModalEditBankAccount(false);
            await getBankAccount();
            router.push('/dashboard/bank-accounts')
        }
        catch (error) {
            console.log("error:")
            console.log(error)
            if (error.response == null) {
                setShowModalError(true)
                setModalErrorMessage({ title: 'Internal Server Error', message: 'Terjadi Error Saat Proses Edit Akun Bank, Harap Lapor Kepada Administrator' })
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

            {showModalInsertBankAccount ? <Modal show={showModalInsertBankAccount} onHide={handleCloseModalInsertBankAccount}>
                <Modal.Header closeButton>
                    <Modal.Title>{'Tambah Akun Bank'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Nama Bank</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nama Bank"
                                onChange={(e) => setBankName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Nomor Rekening</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Nomor Rekening"
                                onChange={(e) => setNumber(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Nama Pemilik</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nama Pemilik"
                                onChange={(e) => setHolderName(e.target.value)}
                            />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleCloseModalInsertBankAccount}>
                        Close
                    </Button>
                    <Button variant="info" onClick={handleShowInsertBankAccountConfirm}>
                        Tambah
                    </Button>
                </Modal.Footer>
            </Modal> : null}

            {showModalConfirm ? <Modal show={showModalConfirm} onHide={handleCloseModalConfirm}>
                <Modal.Header closeButton>
                    <Modal.Title>{'Tambah Bank Akun'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{'Apakah Yakin Akan Tambah Data ? '}</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleCloseModalConfirm}>
                        Close
                    </Button>
                    <Button variant="info" onClick={handleInsertBankAccountConfirm}>
                        Simpan
                    </Button>
                </Modal.Footer>
            </Modal> : null}

            {showModalEditBankAccount ? <Modal show={showModalEditBankAccount} onHide={handleCloseModalEditBankAccount}>
                <Modal.Header closeButton>
                    <Modal.Title>{'Tambah Akun Bank'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Nama Bank</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nama Bank"
                                onChange={(e) => setBankNameEdit(e.target.value)}
                                defaultValue={bankNameEdit}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Nomor Rekening</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Nomor Rekening"
                                onChange={(e) => setNumberEdit(e.target.value)}
                                defaultValue={numberEdit}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Nama Pemilik</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nama Pemilik"
                                onChange={(e) => setHolderNameEdit(e.target.value)}
                                defaultValue={holderNameEdit}
                            />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleCloseModalEditBankAccount}>
                        Close
                    </Button>
                    <Button variant="info" onClick={handleShowEditBankAccountConfirm}>
                        Rubah
                    </Button>
                </Modal.Footer>
            </Modal> : null}

            {showModalConfirmEdit ? <Modal show={showModalConfirmEdit} onHide={handleCloseModalConfirmEdit}>
                <Modal.Header closeButton>
                    <Modal.Title>{'Rubah Bank Akun'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{'Apakah Yakin Akan Rubah Data ? '}</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleCloseModalConfirmEdit}>
                        Close
                    </Button>
                    <Button variant="info" onClick={handleEditBankAccountConfirm}>
                        Simpan Perubahan
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
            <Header props={props} />
            {/* header fix menu end */}

            {/* user dashboard menu */}
            <section class="user-dashboard-section section-b-space">
                <div class="container-fluid-lg">
                    <div class="row">
                        <div class="col-xxl-3 col-lg-4">
                            <DashboardReseller props={props} isActive="bank-accounts"/>
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
                                                {/* <div>
                                            <h3>Data Akun Bank</h3>
                                            <span class="title-leaf">
                                                <svg class="icon-width bg-gray"></svg>
                                            </span>
                                        </div> */}
                                                <button class="btn theme-bg-color text-white btn-sm fw-bold mt-lg-0 mt-3" onClick={handleShowModalAdd}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus me-2">
                                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                                    </svg>
                                                    Tambah Akun</button>
                                            </div>

                                            <div class="row g-4">
                                                {(bankAccounts.length > 0 ? bankAccounts.map((data, index) => {
                                                    return (
                                                        <div class="col-xxl-6" key={index}>
                                                            <div class="dashboard-contant-title">
                                                                <h4>{data.reseller_payment_account_bank_name} <Link href="#javascript" onClick={handleEditBankAccount(data)}>Edit</Link>
                                                                </h4>
                                                            </div>
                                                            <div class="dashboard-detail">
                                                                <h6 class="text-content">Atas Nama : {data.reseller_payment_account_holder_name}</h6>
                                                                <h6 class="text-content">No Rekening : {data.reseller_payment_account_number}</h6>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                                    :
                                                    null
                                                )

                                                }


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

export default BankAccount;