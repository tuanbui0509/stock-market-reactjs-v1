import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as ActionIsAdmin from '../../constants/Admin/ActionType';
import * as ActionToken from '../../constants/Token/ActionType';
import useLoading from '../HookLoading';
import { openNotificationSuccess } from '../Notification';
function Logout() {
    const [Loading, Hidden, Display] = useLoading();
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        Display()
        localStorage.removeItem('token');
        dispatch({ type: ActionToken.REMOVE_TOKEN });
        dispatch({ type: ActionIsAdmin.IS_USER });
        openNotificationSuccess('Thành công', 'Đăng xuất thành công ', 3);
        Hidden();
        history.push("/login");

    }, [])
    return (
        <div>
            {Loading}
        </div>
    )
}

export default Logout
