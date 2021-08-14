import HomePage from 'pages/HomePage';
import React from 'react'
import UserPage from '../pages/UserPage'

const routers = [

    {
        path: '/',
        exact: true,
        main: () => <HomePage />
    },
    {
        path: '/khach-hang',
        exact: false,
        main: (history, match) => <UserPage history={history} match={match} />
    }
]

export default routers;

