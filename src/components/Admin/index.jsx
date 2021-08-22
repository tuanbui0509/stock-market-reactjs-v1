import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Logout from '../../components/Logout';
import routerAdmin from '../../routes/routerAdmin';
import LeftMenu from './LeftMenu';
import NotFoundAdminPage from './NotFoundAdmin';

const showContentPages = (routes) => {
    if (routerAdmin.length > 0) {
        return routes.map((route, index) => {
            return <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.main}
            />
        })
    }
}
function Admin(props) {
    return (
        <>
            <div className="wrapper" id="admin">
                <div className="container">
                    <div className="dashboard">
                        <LeftMenu />
                        <div className="right">
                            <div className="right__content">
                                <Switch>
                                    {showContentPages(routerAdmin)}
                                    <Route path="/logout" exact component={Logout}/>
                                    <Route component={NotFoundAdminPage}></Route>
                                </Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}

export default Admin;

