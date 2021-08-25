import React from 'react';
import AdminPage from '../pages/AdminPage';
import RegisterForm from '../components/Admin/ManagementRegisterForm'
import Users from '../components/Admin/ManagementUsers'
import Stocks from '../components/Admin/ManagementStocks'

const routers = [
    {
        path: '/admin',
        exact: true,
        main: () => <AdminPage />
    },
    {
        path: '/admin/don-dang-ky',
        exact: true,
        main: () => <RegisterForm />
    },
    {
        path: '/admin/quan-ly-ndt',
        exact: true,
        main: () => <Users />
    },
    {
        path: '/admin/quan-ly-cp',
        exact: true,
        main: () => <Stocks />
    }

]

export default routers;

