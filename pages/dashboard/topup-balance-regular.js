import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import React, { useState, useEffect, useCallback } from 'react'
import Head from 'next/head';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios'
import Header from '../components/header';
import DashboardReseller from '../components/dashboard-reseller';
import Link from 'next/link'

function TopUpBalanceRegular(props) {
    const router = useRouter()

    console.log("props TopUpBalanceRegular page:"); console.log(props);

    let cookiesData = (props.cookies_data ? JSON.parse(props.cookies_data) : props);
    cookiesData = (props.status_code === 200 ? Object.assign(cookiesData, { status_code: 200 }) : props)
    const [showModalError, setShowModalError] = useState(false);
    const [modalErrorMessage, setModalErrorMessage] = useState({ title: '', message: '' });
    const handleCloseModalError = () => setShowModalError(false);
    const [showModalInsertTopUp, setShowModalInsertTopUp] = useState(false);
    const [showModalEditTopup, setshowModalEditTopup] = useState(false);
    const handleCloseModalEditTopup = () => setshowModalEditTopup(false);
    const [topupBalanceRegular, setTopupBalanceRegular] = useState([])
    const [totalRecordsTopupBalanceRegular, setTotalRecordsTopupBalanceRegular] = useState([])
    const [bankAccounts, setBankAccounts] = useState([])
    const [configurationPaymentAccountDestination, setConfigurationPaymentAccountDestination] = useState([])
    const handleCloseModalInsertTopUp = () => setShowModalInsertTopUp(false);
    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const handleCloseModalConfirm = () => setShowModalConfirm(false);
    const [showModalConfirmEdit, setShowModalConfirmEdit] = useState(false);
    const handleCloseModalConfirmEdit = () => setShowModalConfirmEdit(false);

    // state for add
    const [bankAccountAdd, setBankAccountAdd] = useState("");
    const [amountAdd, setAmountAdd] = useState(0);
    const [paymentAccountDestinationIdAdd, setPaymentAccountDestinationIdAdd] = useState("");
    
    // state for edit
    const [idEdit, setIdEdit] = useState("");
    const [bankAccountEdit, setBankAccountEdit] = useState("");
    const [paymentAccountDestinationEditId, setPaymentAccountDestinationEditId] = useState("");
    const [amountEdit, setAmountEdit] = useState(null);

    if (process.browser) {
        if (props.status_code === 401) {
            router.push('/auth/login')
        }
    }

    useEffect(() => {
        getBankAccount();
        getTopupBalanceRegular();
        getConfigurationPaymentAccountDestination();
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

    const getTopupBalanceRegular = async () => {
        await getDataTopupBalanceRegular();
    }
    const getDataTopupBalanceRegular = async () => {
        try {

            //Set Axios Configuration For Sign In to NextJS Server
            const axiosConfigForGetData = {
                url: process.env.REACT_APP_DITOKOKU_API_BASE_URL + process.env.REACT_APP_DITOKOKU_API_VERSION_URL + '/reseller-topup-balance-regular?filter={"reseller_id":[' + cookiesData.reseller_id + ']}'
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
                console.log("getDataTopupBalanceRegular", getData)

                setTopupBalanceRegular((getData.data.length != 0 ? getData.data : []))
                setTotalRecordsTopupBalanceRegular(
                    {
                        total_records: getData.pagination.total_records,
                        total_records_process: getData.pagination.total_records_process,
                        total_records_verified: getData.pagination.total_records_verified
                    }
                )

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

    const getConfigurationPaymentAccountDestination = async () => {
        await getDataConfigurationPaymentAccountDestination();
    }
    const getDataConfigurationPaymentAccountDestination = async () => {
        try {

            //Set Axios Configuration For Sign In to NextJS Server
            const axiosConfigForGetData = {
                url: process.env.REACT_APP_DITOKOKU_API_BASE_URL + process.env.REACT_APP_DITOKOKU_API_VERSION_URL + '/configuration-payment-account-destinations'
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
                console.log("getDataPaymentAccountDestination", getData)

                setConfigurationPaymentAccountDestination((getData.data.length != 0 ? getData.data : []))

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


    const handleShowModalAdd = async () => {
        setShowModalInsertTopUp(true)
    }

    const handleShowInsertTopUpConfirm = async () => {
        setShowModalConfirm(true)
    }

    const handleInsertTopUpConfirm = async () => {
        //Execute Add Data
        const axiosConfigForResellerAdd = {
            url: process.env.REACT_APP_DITOKOKU_API_BASE_URL + process.env.REACT_APP_DITOKOKU_API_VERSION_URL + "/reseller-topup-balance-regular"
            , method: "POST"
            , timeout: 40000
            , responseType: "json"
            , responseEncoding: "utf8"
            , headers: { "Content-Type": "application/json" }
            , data: {
                "reseller_id": cookiesData.reseller_id,
                "reseller_topup_balance_regular_amount": amountAdd,
                "reseller_payment_account_id": bankAccountAdd,
                "payment_account_destination_id": paymentAccountDestinationIdAdd,
                "responsible_user_id": cookiesData.reseller_id
            }
        };

        //Execute Axios Configuration For JsonContentValidation
        try {
            const topupResult = await axios.request(axiosConfigForResellerAdd);

            setShowModalConfirm(false);
            setShowModalInsertTopUp(false);
            await getDataTopupBalanceRegular();
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

    const handleShowEditTopupConfirm = async () => {
        setShowModalConfirmEdit(true)
    }

    const handleEditTopUp = useCallback((data) => {
        return async (e) => {
            e.preventDefault()
            setBankAccountEdit(data.reseller_payment_account_id)
            setAmountEdit(data.reseller_topup_balance_regular_amount)
            setPaymentAccountDestinationEditId(data.payment_account_destination_id)
            setIdEdit(data.reseller_topup_balance_regular_id)

            setshowModalEditTopup(true)
        }
    }, [])

    const handleEditTopupConfirm = async () => {
        //Execute Add Data
        const axiosConfigForResellerAdd = {
            url: process.env.REACT_APP_DITOKOKU_API_BASE_URL + process.env.REACT_APP_DITOKOKU_API_VERSION_URL + "/reseller-topup-balance-regular"
            , method: "PATCH"
            , timeout: 40000
            , responseType: "json"
            , responseEncoding: "utf8"
            , headers: { "Content-Type": "application/json" }
            , data: {
                "reseller_topup_balance_regular_id": idEdit,
                "reseller_id": cookiesData.reseller_id,
                "reseller_topup_balance_regular_amount": amountEdit,
                "reseller_payment_account_id": bankAccountEdit,
                "responsible_user_id": cookiesData.reseller_id
            }
        };

        //Execute Axios Configuration For JsonContentValidation
        try {
            await axios.request(axiosConfigForResellerAdd);

            setShowModalConfirmEdit(false);
            setshowModalEditTopup(false);
            await getDataTopupBalanceRegular();
            router.push('/dashboard/topup-balance-regular')
        }
        catch (error) {
            console.log("error:")
            console.log(error)
            if (error.response == null) {
                setShowModalError(true)
                setModalErrorMessage({ title: 'Internal Server Error', message: 'Terjadi Error Saat Proses Update Top Up, Harap Lapor Kepada Administrator' })
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
                    <Modal.Title>{'Top Up Saldo Regular'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Akun Bank</Form.Label>
                            <Form.Select aria-label="Pilih Akun Bank Kamu"
                                onChange={(e) => setBankAccountAdd(e.target.value)}>
                                <option value="">Pilih Akun Bank Kamu</option>
                                {
                                    bankAccounts.map(data => {
                                        return (
                                            <>
                                                <option value={data.reseller_payment_account_id}>{data.reseller_payment_account_bank_name + ' - ' + data.reseller_payment_account_number}</option>
                                            </>
                                        )
                                    })
                                }

                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Nominal Top Up</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Nominal Top Up"
                                onChange={(e) => setAmountAdd(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Akun Bank Tujuan</Form.Label>
                            <Form.Select aria-label="Pilih Akun Bank Kamu"
                                onChange={(e) => setPaymentAccountDestinationIdAdd(e.target.value)}>
                                <option value="">Pilih Akun Bank Tujuan</option>
                                {
                                    configurationPaymentAccountDestination.map(data => {
                                        return (
                                            <>
                                                <option value={data.payment_account_destination_id}>{data.payment_account_destination_bank_name + ' - ' + data.payment_account_destination_number}</option>
                                            </>
                                        )
                                    })
                                }

                            </Form.Select>
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
                    <Modal.Title>{'Top Up Saldo'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{'Apakah Yakin Akan Top Up Saldo Regular ? Lakukan Pembayaran Setelah Pengajuan Top Up Agar Admin Bisa Verifikasi Data'}</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleCloseModalConfirm}>
                        Close
                    </Button>
                    <Button variant="info" onClick={handleInsertTopUpConfirm}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal> : null}

            {showModalEditTopup ? <Modal show={showModalEditTopup} onHide={handleCloseModalEditTopup}>
                <Modal.Header closeButton>
                    <Modal.Title>{'Ubah data Top Up Saldo Regular'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Pilih Akun Bank Kamu</Form.Label>
                            <Form.Select aria-label="Pilih Akun Bank Kamu" defaultValue={bankAccountEdit}
                                onChange={(e) => setBankAccountEdit(e.target.value)}>
                                {
                                    bankAccounts.map(data => {
                                        return (
                                            <>
                                                <option value={data.reseller_payment_account_id}>{data.reseller_payment_account_bank_name + ' - ' + data.reseller_payment_account_number}</option>
                                            </>
                                        )
                                    })
                                }

                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Nominal Top Up</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Nominal Top Up"
                                onChange={(e) => setAmountEdit(e.target.value)}
                                defaultValue={amountEdit}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Akun Bank Tujuan</Form.Label>
                            <Form.Select aria-label="Pilih Akun Bank Kamu" defaultValue={paymentAccountDestinationEditId}
                                onChange={(e) => setPaymentAccountDestinationEditId(e.target.value)}>
                                <option value="">Pilih Akun Bank Tujuan</option>
                                {
                                    configurationPaymentAccountDestination.map(data => {
                                        return (
                                            <>
                                                <option value={data.payment_account_destination_id}>{data.payment_account_destination_bank_name + ' - ' + data.payment_account_destination_number}</option>
                                            </>
                                        )
                                    })
                                }

                            </Form.Select>
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleCloseModalEditTopup}>
                        Close
                    </Button>
                    <Button variant="info" onClick={handleShowEditTopupConfirm}>
                        Ubah
                    </Button>
                </Modal.Footer>
            </Modal> : null}

            {showModalConfirmEdit ? <Modal show={showModalConfirmEdit} onHide={handleCloseModalConfirmEdit}>
                <Modal.Header closeButton>
                    <Modal.Title>{'Ubah data Top Up Saldo Regular'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{'Apakah Yakin Akan Ubah Data ? '}</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleCloseModalConfirmEdit}>
                        Close
                    </Button>
                    <Button variant="info" onClick={handleEditTopupConfirm}>
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

            <Header props={cookiesData} />

            {/* user dashboard menu */}
            <section class="user-dashboard-section section-b-space">
                <div class="container-fluid-lg">
                    <div class="row">
                        <div class="col-xxl-3 col-lg-4">
                            <DashboardReseller props={cookiesData} isActive="topup-balance-regular" />
                        </div>

                        <div class="col-xxl-9 col-lg-8">
                            <button class="btn left-dashboard-show btn-animation btn-md fw-bold d-block mb-4 d-lg-none">Show
                                Menu</button>
                            <div class="dashboard-right-sidebar">
                                <div class="tab-content" id="pills-tabContent">
                                    <div class="tab-pane fade active show" id="pills-dashboard" role="tabpanel" aria-labelledby="pills-dashboard-tab">
                                        <div class="dashboard-home">
                                            <div class="title">
                                                <h2>Data Top Up Saldo Regular</h2>
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

                                            <div class="total-box">
                                                <div class="row g-sm-4 g-3">
                                                    <div class="col-xxl-4 col-lg-6 col-md-4 col-sm-6">
                                                        <div class="totle-contain">
                                                            <img src="https://themes.pixelstrap.com/fastkart/assets/images/svg/order.svg" class="img-1 blur-up lazyloaded" alt="" />
                                                            <img src="https://themes.pixelstrap.com/fastkart/assets/images/svg/order.svg" class="blur-up lazyloaded" alt="" />
                                                            <div class="totle-detail">
                                                                <h5>Total Menunggu Verifikasi</h5>
                                                                <h3>{totalRecordsTopupBalanceRegular.total_records_process}</h3>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-xxl-4 col-lg-6 col-md-4 col-sm-6">
                                                        <div class="totle-contain">
                                                            <img src="https://themes.pixelstrap.com/fastkart/assets/images/svg/pending.svg" class="img-1 blur-up lazyloaded" alt="" />
                                                            <img src="https://themes.pixelstrap.com/fastkart/assets/images/svg/pending.svg" class="blur-up lazyloaded" alt="" />
                                                            <div class="totle-detail">
                                                                <h5>Total Terverifikasi</h5>
                                                                <h3>{totalRecordsTopupBalanceRegular.total_records_verified}</h3>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div class="col-xxl-4 col-lg-6 col-md-4 col-sm-6">
                                                        <div class="totle-contain">
                                                            <img src="https://themes.pixelstrap.com/fastkart/assets/images/svg/wishlist.svg" class="img-1 blur-up lazyloaded" alt="" />
                                                            <img src="https://themes.pixelstrap.com/fastkart/assets/images/svg/wishlist.svg" class="blur-up lazyloaded" alt="" />
                                                            <div class="totle-detail">
                                                                <h5>Total Data</h5>
                                                                <h3>{totalRecordsTopupBalanceRegular.total_records}</h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="title title-flex">
                                                <div>
                                                    <h3>History</h3>
                                                    <span class="title-leaf">
                                                        <svg class="icon-width bg-gray"></svg>
                                                    </span>
                                                </div>
                                                <button class="btn theme-bg-color text-white btn-sm fw-bold mt-lg-0 mt-3" onClick={handleShowModalAdd}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus me-2">
                                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                                    </svg>
                                                    Top Up</button>
                                            </div>

                                            <div class="row g-4">
                                                {(topupBalanceRegular.length > 0 ? topupBalanceRegular.map((data, index) => {
                                                    return (
                                                        <div class="col-xxl-6" key={index}>
                                                            <div class="dashboard-contant-title">
                                                                <h4>ID#{data.reseller_topup_balance_regular_id}
                                                                    {
                                                                        (data.progress_status_id === 1 ?
                                                                            <Link href="#" onClick={handleEditTopUp(data)}>Edit</Link>
                                                                            :
                                                                            ''
                                                                        )
                                                                    }

                                                                </h4>
                                                            </div>
                                                            <div class="dashboard-detail">
                                                                <h6 class="text-content">Rekening Kamu : {data.reseller_payment_account_bank_name + ' - ' + data.reseller_payment_account_number + ' - '+ data.reseller_payment_account_holder_name}</h6>
                                                                <h6 class="text-content">Rekening Tujuan : {data.payment_account_destination_bank_name + ' - ' + data.payment_account_destination_number + ' - '+ data.payment_account_destination_holder_name}</h6>
                                                                <h6 class="text-content">Nominal : Rp. {data.reseller_topup_balance_regular_amount}</h6>
                                                                
                                                                <h6 class="text-content">Status : {data.progress_status_name}</h6>
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

export default TopUpBalanceRegular;