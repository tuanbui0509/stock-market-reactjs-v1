import { IdcardTwoTone, RightCircleTwoTone } from '@ant-design/icons';
import React from 'react';
import { Link } from 'react-router-dom';

export default function LeftMenu() {
    return (
        <>
            <div className="left">
                <div className="left__content">
                    <div className="left__logo">LOGO</div>
                    <ul className="left__menu">
                        <li className="left__menuItem">
                            <Link to="/admin/don-dang-ky" className="left__title"><IdcardTwoTone />Quản lý đơn đăng ký</Link>
                        </li>
                        <li className="left__menuItem">
                            <Link to="/admin/quan-ly-ndt" className="left__title"><IdcardTwoTone />Quản lý nhà đầu tư</Link>
                        </li>
                        <li className="left__menuItem">
                            <Link to="/admin/quan-ly-cp" className="left__title"><IdcardTwoTone />Quản lý cổ phiếu</Link>
                        </li>
                        <li className="left__menuItem">
                            <Link to="/logout" className="left__title"><RightCircleTwoTone />Đăng Xuất</Link>
                        </li>
                    </ul>
                </div>
            </div>

        </>
    )
}
