import Link from 'next/link'

function DashboardReseller({props, isActive}) {

    const cookiesData = (props.cookies_data ? JSON.parse(props.cookies_data) : {});

    return (
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
                            <img crossorigin="anonymous" src={(cookiesData.reseller_image_filename !== null ? process.env.REACT_APP_DITOKOKU_API_BASE_URL + '/assets/images/profil/reseller/' + cookiesData.reseller_image_filename : '/images/inner-page/user/avatar.png')} className="blur-up update_img lazyloaded" alt="" />
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
                        <button className={"nav-link "+(isActive==="address"?"active":"")} id="pills-address-tab" data-bs-toggle="pill" data-bs-target="#pills-address" type="button" role="tab" aria-controls="pills-address" aria-selected="false"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-map-pin"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                            Alamat</button>
                    </Link>
                </li>

                <li className="nav-item" role="presentation">
                    <Link href={'/dashboard/profile'}>
                        <button className={"nav-link "+(isActive==="profile"?"active":"")} id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="true"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                            Profil</button>
                    </Link>
                </li>

                <li className="nav-item" role="presentation">
                    <Link href={'/dashboard/bank-accounts'}>
                        <button className={"nav-link "+(isActive==="bank-accounts"?"active":"")}  id="pills-dashboard-tab" data-bs-toggle="pill" data-bs-target="#pills-dashboard" type="button" role="tab" aria-controls="pills-dashboard" aria-selected="true"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                            Akun Bank</button>
                    </Link>
                </li>

                <li className="nav-item" role="presentation">
                    <Link href={'/dashboard/topup-balance-regular'}>
                        <button className={"nav-link "+(isActive==="topup-balance-regular"?"active":"")} id="pills-dashboard-tab" data-bs-toggle="pill" data-bs-target="#pills-dashboard" type="button" role="tab" aria-controls="pills-dashboard" aria-selected="true"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                            Top Up Saldo Regular</button>
                    </Link>
                </li>

            </ul>
        </div>
    )
}

export default DashboardReseller