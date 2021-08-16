import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import * as Action from '../../actions/User/index';
import routerHome from '../../routes/routerAdmin';
import Logout from '../../components/Logout';
import NotFoundPage from '../../pages/NotFoundPage';
import Header from 'components/Common/Header';
import Footer from 'components/Common/Footer';
import LeftMenu from './LeftMenu';
const showContentPages = (routes) => {
    if (routerHome.length > 0) {
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
                                    {showContentPages(routerHome)}
                                    <Route path="/logout" exact component={Logout}/>
                                    <Route component={NotFoundPage}></Route>
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

