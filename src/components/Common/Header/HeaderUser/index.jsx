import { UserOutlined } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
// import userlogo from '../../assets/images/user.png';
function HeaderUser(props) {
    //const token = JSON.parse(localStorage.getItem("token"));
    const user = useSelector(state => state.User);
    const dispatch = useDispatch();
    const history = useHistory();
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
                <Link to='/thong-tin-khach-hang' className="header__right-account-item">Thông tin tài khoản </Link>
            </Menu.Item>
            <Menu.Item key="1">
                <Link to='/khach-hang/chung-khoan-hien-co' className="header__right-account-item">Thông tin sao kê </Link>
            </Menu.Item>
            <Menu.Item key="2">
                <Link className="header__right-account-item" to="/logout">
                    Đăng xuất </Link>
            </Menu.Item>
        </Menu>

    );
    return (
        <>

            <Dropdown overlay={menu} placement="bottomRight" arrow>
                <a className="ant-dropdown-link header__right-account-label" onClick={e => e.preventDefault()}>
                    <Avatar
                        style={{
                            backgroundColor: '#87d068'
                        }}
                        icon={<UserOutlined />}
                    />
                </a>

            </Dropdown>

        </>
    );
}
export default HeaderUser;