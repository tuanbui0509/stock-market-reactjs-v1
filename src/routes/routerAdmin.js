import React from 'react';
import AdminPage from '../pages/AdminPage';
import ViewRegisterForm from '../components/Admin/ViewRegisterForm'

const routers = [
    {
        path: '/admin',
        exact: true,
        main: () => <AdminPage />
    },
    {
        path: '/admin/duyet-don',
        exact: true,
        main: () => <ViewRegisterForm />
    }

]

export default routers;

