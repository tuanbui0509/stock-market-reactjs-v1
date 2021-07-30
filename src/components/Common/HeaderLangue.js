import React, {useState} from 'react';
import vietnamlogo from '../../assets/images/vietnam-logo.png';
import uklogo from '../../assets/images/uk-logo.png';
import chinalogo from '../../assets/images/china-logo.png';
import japanlogo from '../../assets/images/japan-logo.png';

function HeaderLangue(props){


     const onclick = ()=>{
      let menuLanguages = document.querySelector('.header__right-language-list');
      let menuThemes = document.querySelector('.header__right-theme-list');
      let menuAccounts = document.querySelector('.header__right-account-list');
      if(menuAccounts){
          menuAccounts.style.display = 'none';
      }
      if(menuThemes){
          menuThemes.style.display = 'none';
      }
      if (menuLanguages.style.display === 'block') {
          menuLanguages.style.display = 'none';
      }
      else{
          menuLanguages.style.display = 'block';
      }
    }

    return(
        <div className="header__right-language">
            <button  className="header__right-label-language" onClick={onclick}> <span><img src={vietnamlogo} className="img-responsive" alt="" /></span> Tiếng Việt <i className="fas fa-chevron-down" /></button>
            <ul className="header__right-language-list" >
              <li className="header__right-language-item header__right-language-item--active">
                Tiếng Việt
                <span className="header__right-flag"><img src={vietnamlogo} className="img-responsive" alt="" /></span>
              </li>
              <li className="header__right-language-item">English<span className="header__right-flag"><img src={uklogo} className="img-responsive" alt="" /></span></li>
              <li className="header__right-language-item">中文 (Chinese)
                <span className="header__right-flag"><img src={chinalogo} className="img-responsive" alt="" /></span>
              </li>
              <li className="header__right-language-item">日本人 (Japanese)
                <span className="header__right-flag"><img src={japanlogo} className="img-responsive" alt="" /></span>
              </li>
            </ul>
          </div>
    );
}
export default HeaderLangue;