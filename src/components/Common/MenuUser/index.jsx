import { Col, Divider, Row } from 'antd';
import React from 'react';
import { Link, Route } from 'react-router-dom';
const style = { padding: '8px 0', marginBottom: '1rem', textAlign: 'center', fontWeight: 'bold', display: 'block' };

const menus = [
    {
        label: 'Lịch sử đặt lệnh',
        to: '/history-order',
        exact: false
    },
    {
        label: 'Lịch sử khớp lệnh',
        to: '/history-purchase',
        exact: false
    },

    {
        label: 'Sao kê giao dịch tiền',
        to: '/statement-strafer-price',
        exact: false
    },
    {
        label: 'Sao kê giao dịch chứng khoán',
        to: '/statement-strafer-stock',
        exact: false
    },
    {
        label: 'Chứng khoán hiện có',
        to: '/stocks',
        exact: false
    }
]
// custom Link
const MenuLink = ({ label, to, activeOnlyWhenExact }) => {
    return (
        <Route
            path={to}
            exact={activeOnlyWhenExact}
            children={({ match }) => {
                let active = match ? 'title-info-active' : '';
                console.log(match)
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

const showMenus = (menus) => {
    let result = null;
    if (menus.length > 0) {
        result = menus.map((menu, index) => {
            return (
                <MenuLink
                    key={index}
                    label={menu.label}
                    to={menu.to}
                    activeOnlyWhenExact={menu.exact}
                />
            );
        })
    }
    return result;
}
export default function Menu() {
    return (
        <>
            {/* <Divider orientation="left">Horizontal</Divider> */}
            <Row gutter={16}>
                {showMenus(menus)}
            </Row>
        </>
    )

}
