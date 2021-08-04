import React from 'react'
// import PropTypes from 'prop-types'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import AdminPage from '../pages/AdminPage'
import RegisterPage from '../pages/RegisterPage'
import NotFoundPage from '../pages/NotFoundPage'
const routers = [
    {
        path: '/',
        exact: true,
        main: () => <HomePage />
    },
    {
        path: '/login',
        exact: false,
        main: () => <LoginPage />
    },
    {
        path: '/admin',
        exact: false,
        main: () => <AdminPage />
    },
    {
        path: '/register',
        exact: false,
        main: () => <RegisterPage />
    },
    {
        path: '',
        exact: false,
        main: () => <NotFoundPage />
    }

]

export default routers;

