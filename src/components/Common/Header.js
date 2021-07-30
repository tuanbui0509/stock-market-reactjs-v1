import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ntnt from '../../assets/images/ntnt.png';
import user2logo from '../../assets/images/user2.png';
import HeaderLangue from './HeaderLangue';
import HeaderTheme from './HeaderTheme';
import HeaderUser from './HeaderUser';
import HeaderDate from '../HomePage/HeaderDate'
import HeaderTimes from '../HomePage/HeaderTimes'
function Header(props) {
  //const token = JSON.parse(localStorage.getItem("token"));
  return (
    <header className="header topbar" id="header">
      <div className="header__left">
        <Link to="/" className="header__logo"><img src={ntnt} alt="" className="img-responsive" />iBoard</Link>
      </div>
      <div className="header__right">
        <HeaderLangue/>
        <HeaderTheme/>
        <HeaderTimes/>
        <HeaderDate />
        <HeaderUser/>
      </div>
    </header>
  );
}
export default Header;

