import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import userlogo from '../../assets/images/user.png';
import user2logo from '../../assets/images/user2.png';
import * as action from '../../actions/User/index';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { Menu, Dropdown } from 'antd';
import * as ActionIsAdmin from '../../constants/Admin/ActionType';
import * as ActionToken from '../../constants/Token/ActionType';
function HeaderUser(props) {
    //const token = JSON.parse(localStorage.getItem("token"));
    const user = useSelector(state => state.User);
    const dispatch = useDispatch();
    const history = useHistory();
    const logOut = () => {
        if (window.confirm("Bạn có chắc chắn muốn đăng xuất !")) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            dispatch({ type: ActionToken.REMOVE_TOKEN });
            dispatch({ type: ActionIsAdmin.IS_USER });
            dispatch(action.UserLogout(history));
        };
    }
    const menu = (
        (user === null) ? <Menu>
            <Menu.Item key="0">
                <a className="header__right-account-item">Chào mừng đến với iBoard </a>
            </Menu.Item>
            <Menu.Item key="1">
                <Link className="header__right-account-item" to="/login">
                    Đăng Nhập </Link>
            </Menu.Item>
        </Menu> : <Menu>
            <Menu.Item key="0">
                <Link to='/khach-hang/chung-khoan-hien-co' className="header__right-account-item">Thông tin tài khoản </Link>
            </Menu.Item>
            <Menu.Item key="1">
                <Link className="header__right-account-item" to="/" onClick={logOut} >
                    Đăng xuất </Link>
            </Menu.Item>
        </Menu>

    );
    return (
        <Dropdown overlay={menu} placement="bottomRight" arrow>
            <a className="ant-dropdown-link header__right-account-label" onClick={e => e.preventDefault()}>
                <img src={userlogo} alt="" className="img-responsive" />
            </a>
        </Dropdown>
    );
}
export default HeaderUser;