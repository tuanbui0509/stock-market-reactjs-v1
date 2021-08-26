import { IdcardTwoTone, RightCircleTwoTone } from '@ant-design/icons';
import { openNotificationSuccess } from 'components/Notification';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import * as action from '../../../actions/Admin/RegisterForm/index';
import * as ActionIsAdmin from '../../../constants/Admin/ActionType';
import * as ActionToken from '../../../constants/Token/ActionType';

export default function LeftMenu() {

    const dispatch = useDispatch();
    const history = useHistory();
    const logOut = () => {
        if (window.confirm("Bạn có chắc chắn muốn đăng xuất !")) {
            dispatch({ type: ActionToken.REMOVE_TOKEN });
            dispatch({ type: ActionIsAdmin.IS_USER });
            openNotificationSuccess('Thành công', 'Đăng xuất thành công ', 3);
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
                        {/* <li className="left__menuItem">
                            <Link to="/admin" className="left__title"><HomeTwoTone />Dashboard</Link>
                        </li> */}
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
                            <Link to="/login" onClick={logOut} className="left__title"><RightCircleTwoTone />Đăng Xuất</Link>
                        </li>
                    </ul>
                </div>
            </div>

        </>
    )
}
