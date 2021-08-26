import React from 'react';
import RegisterForm from '../components/Admin/ManagementRegisterForm';
import Stocks from '../components/Admin/ManagementStocks';
import Users from '../components/Admin/ManagementUsers';

const routers = [
    {
        path: '/admin',
        exact: true,
        main: () => <RegisterForm />
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

