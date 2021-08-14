import Footer from 'components/Common/Footer';
import Header from 'components/Common/Header';
import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LeftMenu from './components/Admin/LeftMenu';
import Logout from './components/Logout';
import NotFoundPage from './pages/NotFoundPage';
import routerAdmin from './routes/routerAdmin';
import routerHome from './routes/routerHome';
import routerUser from './routes/routerUser';

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

function App() {
  const token = useSelector(state => state.Token)
  const isAdmin = useSelector(state => state.isAdmin);
  console.log(token);
  console.log(isAdmin);
  return (

    <Router>
      <Switch>
        {(isAdmin) ?
          <>
            <div className="wrapper" id="admin">
              <div className="container">
                <div className="dashboard">
                  <LeftMenu />
                  <div className="right">
                    <div className="right__content">
                      {showContentPages(routerAdmin)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
          :
          <>
            <Header />
            {(token) ? showContentPages(routerUser) : showContentPages(routerHome)}
          </>
        }
        <Route path="/logout" exact component={Logout}></Route>
        <Route path="" component={NotFoundPage}></Route>
      </Switch>
      <Footer />
    </Router >
  );
}


export default App;
