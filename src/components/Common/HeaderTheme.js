import React, { useState } from 'react';
import sunnylogo from '../../assets/images/sunny.png';
import halfmoon from '../../assets/images/half-moon.png';
import control from '../../assets/images/controls.png';
function HeaderTheme(props) {

    const onClick = () => {
        let menuThemes = document.querySelector('.header__right-theme-list');
        let menuAccounts = document.querySelector('.header__right-account-list');
        let menuLanguages = document.querySelector('.header__right-language-list');

        console.log(menuAccounts)
        console.log(menuThemes)
        console.log(menuLanguages)
        if(menuLanguages){
            menuLanguages.style.display = 'none';
        }
        if(menuAccounts){
            menuAccounts.style.display = 'none';
        }
        if (menuThemes.style.display === 'block') {
            menuThemes.style.display = 'none';
        }
        else {
            menuThemes.style.display = 'block';
        }
    }

    return (
        <div className="header__right-theme">
            <button className="header__right-label-theme" onClick={onClick}>Light Theme<span><img src={sunnylogo} className="img-responsive" alt="" /></span></button>
            <ul className="header__right-theme-list">
                <li className="header__right-theme-item header__right-theme-item--active">Light Theme <span className="header__right-flag"><img src={sunnylogo} className="img-responsive" alt="" /></span></li>
                <li className="header__right-theme-item">Dark Theme <span className="header__right-flag"><img src={halfmoon} className="img-responsive" alt="" /></span></li>
                <li className="header__right-theme-item">Classic Theme <span className="header__right-flag"><img src={control} className="img-responsive" alt="" /></span></li>
            </ul>
        </div>
    );
}
export default HeaderTheme;