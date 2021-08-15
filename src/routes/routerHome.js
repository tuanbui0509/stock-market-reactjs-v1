import Logout from 'components/Logout'
import React from 'react'
// import PropTypes from 'prop-types'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import NotFoundPage from '../pages/NotFoundPage'
import RegisterPage from '../pages/RegisterPage'

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
        path: '/register',
        exact: false,
        main: () => <RegisterPage />
    }
    ,
    {
        path: '/logout',
        exact: false,
        main: () => <Logout />
    }

]

export default routers;

