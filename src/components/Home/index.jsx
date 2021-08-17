import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import * as Action from '../../actions/User/index';
import routerHome from '../../routes/routerHome';
import Logout from '../../components/Logout';
import NotFoundPage from '../../pages/NotFoundPage';
import Header from 'components/Common/Header';
import Footer from 'components/Common/Footer';
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
function Home(props) {
    return (
        <>
            <Header />
            <Switch>
                {showContentPages(routerHome)}
                <Route path="/logout" exact component={Logout}></Route>
                <Route component={NotFoundPage}></Route>
            </Switch>
        </>
    );

}

export default Home;

