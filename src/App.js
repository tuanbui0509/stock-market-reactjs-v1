import React from 'react';
// import Home from './pages/HomePage/HomePage';
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import routers from './routes/routers';



function App() {
  return (
    <Router>
      {showContentPages(routers)}
    </Router>
  );
}

const showContentPages = (routes) => {
  let result = null;
  if (routes.length > 0) {
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
