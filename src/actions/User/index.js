import * as types from '../../constants/User/ActionType';
import callApi from '../../utils/apiCaller';

export const UserLogin = (user) => {
    return {
        type: types.USER_LOGIN,
        user
    }
}

export const GetUserFromLocal = (user) => {
    return {
        type: types.USER_GET,
        user
    }
}

export const UserLoginRequest = (username, password, history) => {
    return (dispatch) => {
        console.log('login/' + username + '/' + password);
        return callApi('login/' + username + '/' + password, 'GET', null).then(res => {
            let rec = res.data;
            console.log(rec);
            if (rec.result === 0) {
                dispatch(UserLogin(rec.data));
                localStorage.setItem("token", JSON.stringify(rec.data));
                history.replace("/");
            } else {
                alert(rec.message);
            }
        })
    }
}

export const UserLogout = (history) => {
    history.replace("fhkljdshafkdsj");
    history.replace("/");
    return {
        type: types.USER_LOGOUT,
        user: null
    }
}