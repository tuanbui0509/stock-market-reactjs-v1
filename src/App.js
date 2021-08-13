import React from 'react';
// import Home from './pages/HomePage/HomePage';
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import routerAdmin from './routes/routerAdmin';
import routerHome from './routes/routerHome';



function App() {
  // let token = localStorage.getItem('token');
  // let role = localStorage.getItem('role');
  // console.log(token);
  // console.log(role);
  return (
    <Router>
      {showContentPages(routerHome)}
    </Router>
  );
}
const showContentPages = (routes) => {
  let result = null;
  if (routerHome.length > 0) {
    result = routes.map((route, index) => {
      return <Route
        key={index}
        path={route.path}
        exact={route.exact}
        component={route.main}
      />
    })
  }
  return <Switch>{result}</Switch>
}


export default App;
