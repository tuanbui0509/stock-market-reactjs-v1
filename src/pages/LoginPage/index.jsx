import React from 'react';
import '../CommonCss/login.css'
import HeaderLogin from '../../components/LoginPage/HeaderLogin/'
import FooterLogin from '../../components/LoginPage/FooterLogin/'
import MainLogin from '../../components/LoginPage/MainLogin/'
const LoginPage = () => {
    return (
        <div className="login">
            {/* Begin Header */}
            <HeaderLogin />
            {/* Begin main */}
            <MainLogin />
            {/* Begin Footer */}
            <FooterLogin />

        </div>
    );
}

export default LoginPage;
