import React from 'react'
// import PropTypes from 'prop-types'
import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/LoginPage/LoginPage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
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
        path: '',
        exact: false,
        main: () => <NotFoundPage />
    }

]

export default routers;

