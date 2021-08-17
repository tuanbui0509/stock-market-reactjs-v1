import { Col, Divider, Row } from 'antd';
import React from 'react';
import { Link, Route } from 'react-router-dom';
const style = { padding: '8px 0', marginBottom: '1rem', textAlign: 'center', fontWeight: 'bold', display: 'block' };

const menus = [
    {
        label: 'Chứng khoán hiện có',
        to: '/chung-khoan-hien-co',
        exact: false
    },
    {
        label: 'Lịch sử đặt lệnh',
        to: '/lich-su-dat-lenh',
        exact: true
    },
    {
        label: 'Lịch sử khớp lệnh',
        to: '/lich-su-khop-lenh',
        exact: false
    },

    {
        label: 'Số dư tiền ngân hàng',
        to: '/so-du-tien-ngan-hang',
        exact: false
    },
    {
        label: 'Lệnh trong ngày',
        to: '/lenh-trong-ngay',
        exact: false
    },
    
]
// custom Link
const MenuLink = ({ label, to, activeOnlyWhenExact }) => {
    return (
        <Route
            path={to}
            exact={activeOnlyWhenExact}
            children={({ match }) => {
                let active = match ? 'title-info-active' : '';
                return (
                    <Col className="gutter-row" span={6}>
                        <div className={`title-info ${active}`}>
                            <Link to={to} style={style}>
                                {label}
                            </Link>
                        </div>
                    </Col>

                )
            }}
        />
    );
}

const showMenus = (menus, path) => {
    let result = null;
    if (menus.length > 0) {
        result = menus.map((menu, index) => {
            return (
                <MenuLink
                    key={index}
                    label={menu.label}
                    to={`${path + menu.to}`}
                    activeOnlyWhenExact={menu.exact}
                />
            );
        })
    }
    return result;
}
export default function Menu(props) {
    let { path } = props
    return (
        <>
            <Row gutter={16}>
                {showMenus(menus, path)}
            </Row>
        </>
    )

}
