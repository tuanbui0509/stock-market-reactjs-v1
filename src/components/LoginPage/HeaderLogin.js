import React from 'react';
import { Link } from 'react-router-dom';

const HeaderLogin = () => {
    const showMenuLanguage = () => {
        let menuLanguages = document.querySelector('.header__right-language-list');
        let menuThemes = document.querySelector('.header__right-theme-list');
        let menuAccounts = document.querySelector('.header__right-account-list');
        if (menuAccounts) {
            menuAccounts.style.display = 'none';
        }
        if (menuThemes) {
            menuThemes.style.display = 'none';
        }
        if (menuLanguages.style.display === 'block') {
            menuLanguages.style.display = 'none';
        }
        else {
            menuLanguages.style.display = 'block';
        }
    }
    return (
        <header className="header__login">
            <div className="container">
                <div className="header__content">
                    <Link to="/" className="header__logo-login"><img src="./assets/images/ntnt.png" alt /></Link>
                    <div className="header__right-language">
                        <button className="header__right-label-language" onClick={showMenuLanguage}> <span><img src="./assets/images/vietnam-logo.png" className="img-responsive" alt /></span> Tiếng Việt
            <i className="fas fa-chevron-down" /></button>
                        <ul className="header__right-language-list">
                            <li className="header__right-language-item header__right-language-item--active">
                                Tiếng Việt
              <span className="header__right-flag"><img src="./assets/images/vietnam-logo.png" className="img-responsive" alt /></span>
                            </li>
                            <li className="header__right-language-item">English<span className="header__right-flag"><img src="./assets/images/uk-logo.png" className="img-responsive" alt /></span></li>
                            <li className="header__right-language-item">中文 (Chinese)
              <span className="header__right-flag"><img src="./assets/images/china-logo.png" className="img-responsive" alt /></span>
                            </li>
                            <li className="header__right-language-item">日本人 (Japanese)
              <span className="header__right-flag"><img src="./assets/images/japan-logo.png" className="img-responsive" alt /></span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default HeaderLogin;
