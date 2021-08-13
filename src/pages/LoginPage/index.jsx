import React from 'react';
import '../../assets/css/login.css'
import HeaderLogin from '../../components/LoginPage/HeaderLogin/'
import FooterLogin from '../../components/LoginPage/FooterLogin/'
import MainLogin from '../../components/LoginPage/MainLogin/'
const LoginPage = () => {
    return (
        <div className="login">
            <HeaderLogin />
            <MainLogin />
            <FooterLogin />

        </div>
    );
}

export default LoginPage;
