import React from 'react';

const FooterLogin = () => {
    return (
        <footer className="footer__login">
            <div className="container">
                <div className="policy-info">
                    <a><button className="btn-transfer open-account">
                        <div className="round-icon" />
                        <p className="function-explain">Mở Tài khoản giao dịch</p>
                    </button></a><a><button className="btn-transfer register-account">
                        <div className="round-icon" />
                        <p className="function-explain">Đăng ký giao dịch điện tử</p>
                    </button></a><a><button className="btn-transfer about-transfer">
                        <div className="round-icon" />
                        <p className="function-explain">Giới thiệu dịch vụ giao dịch trực tuyến</p>
                    </button></a><a><button className="btn-transfer user-guide">
                        <div className="round-icon" />
                        <p className="function-explain">Hướng dẫn sử dụng</p>
                    </button></a>
                </div>
            </div>
            <div className="copyright">
                <p> Copyright ©2021 by NTNT  </p>
            </div>
        </footer>

    );
}

export default FooterLogin;
