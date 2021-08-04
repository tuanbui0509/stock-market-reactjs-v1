import { HomeTwoTone, IdcardTwoTone, RightCircleTwoTone } from '@ant-design/icons'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom'
import * as action from '../../../actions/Admin/RegisterForm/index';

export default function LeftMenu() {
   
    const dispatch = useDispatch();
    const history = useHistory();
    const logOut = () => {
        if (window.confirm("Bạn có chắc chắn muốn đăng xuất !")) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("role");
            dispatch(action.AdminLogout(history));
        };
    }
    return (
        <>
            <div className="left">
                <div className="left__content">
                    <div className="left__logo">LOGO</div>
                    <ul className="left__menu">
                        <li className="left__menuItem">
                            <Link to="/admin" className="left__title"><HomeTwoTone />Dashboard</Link>
                        </li>
                        <li className="left__menuItem">
                            <Link to="/" className="left__title"><IdcardTwoTone />Khách Hàng</Link>
                        </li>
                        <li className="left__menuItem">
                            <Link to="/" onClick={logOut} className="left__title"><RightCircleTwoTone />Đăng Xuất</Link>
                        </li>
                    </ul>
                </div>
            </div>

        </>
    )
}
