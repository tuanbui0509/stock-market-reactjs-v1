import React from 'react';
import AdminPage from '../pages/AdminPage';
const routers = [
    {
        path: '/admin',
        exact: true,
        main: () => <AdminPage />
    },
    {
        path: '/admin/duyet-don',
        exact: true,
        main: () => <AdminPage />
    }

]

export default routers;

