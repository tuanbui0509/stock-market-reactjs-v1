import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as ActionLogin from '../../actions/User/index';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
const MainLogin = (props) => {
    const [login, setLogin] = useState({
        username: "",
        password: "",
    });
    const dispatch = useDispatch();
    const history = useHistory();
    const handleOnChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        setLogin({
            ...login,
            [name]: value
        })

    }
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(ActionLogin.UserLoginRequest(login.username, login.password, history));
    }

    let showError = (id) => {
        let user = document.getElementById('username');
        let pass = document.getElementById('password');
        let userNotify = document.getElementById('userLogin');
        let PassNotify = document.getElementById('passLogin');
        // console.log(id)
        let icon_error;
        if (id === 'user') {
            changeError(pass, '.password + .icon-error');
            icon_error = document.querySelector('.username + .icon-error');
            PassNotify.classList.remove('type-error--show');
            if (user.value.length === 0) {
                userNotify.classList.add('type-error--show');
                icon_error.style.visibility = 'visible';
            }
            else {
                PassNotify.classList.remove('type-error--show');
                icon_error.style.visibility = 'hidden';
            }
        } else if (id === 'pass') {
            changeError(user, '.username + .icon-error');
            icon_error = document.querySelector('.password + .icon-error');
            userNotify.classList.remove('type-error--show');
            if (pass.value.length === 0) {
                PassNotify.classList.add('type-error--show');
                icon_error.style.visibility = 'visible';
            }
            else {
                PassNotify.classList.remove('type-error--show');
                icon_error.style.visibility = 'hidden';
            }
        }
    }

    function changeError(str, className) {
        let icon_error = document.querySelector(className);
        if (str.value.length > 0) {
            icon_error.style.visibility = 'hidden';
        } else {
            icon_error.style.visibility = 'visible';
        }
    }
    return (
        <main className="main">
            <div className="container">
                <div className="content-login">
                    <div className="form-login">
                        <h5 className="form-title">Đăng nhập</h5>
                        <form onSubmit={onSubmit} className="form">
                            <div className="input-view">
                                <input
                                    onFocus={() => showError('user')}
                                    type="text"
                                    className="username form-control"
                                    id="username"
                                    placeholder="Tên đăng nhập"
                                    name="username"
                                    onChange={handleOnChange}
                                    required />
                                <i className="fas fa-exclamation-circle icon-error" />
                                <div className="type-error" data-id="tooltip" id="userLogin">Vui lòng nhập Tên đăng nhập</div>
                            </div>
                            <div className="input-view">
                                <input
                                    onFocus={() => showError('pass')}
                                    type="password"
                                    className="password form-control"
                                    id="password"
                                    placeholder="Mật khẩu"
                                    name="password"
                                    onChange={handleOnChange}
                                    required />
                                <i className="fas fa-exclamation-circle icon-error" />
                                <div className="type-error " data-id="tooltip" id="passLogin">Vui lòng nhập Mật khẩu</div>
                            </div>
                            <Link to="#" className="forgotPassword">Quên mật khẩu?</Link>
                            <button className="btn-login">Đăng nhập</button>
                        </form>
                    </div>
                </div>
            </div>
        </main>

    );
}

export default MainLogin;
