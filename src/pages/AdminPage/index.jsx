import React from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import LeftMenu from '../../components/Admin/LeftMenu'
import ViewRegisterForm from '../../components/Admin/ViewRegisterForm'
import './Admin.css'
function AdminPage(props) {
  return (
    <>
      {/* <Router>
        <Header></Header>
        <Switch>
          <Route path="/" exact component={LightningTable} />
          <Route path="/user" exact component={UserPage} />
        </Switch>
        <Footer></Footer>
      </Router> */}
      <div className="wrapper" id="admin">
        <div className="container">
          <div className="dashboard">
            <LeftMenu />
            <div className="right">
              <div className="right__content">
                <ViewRegisterForm />
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default AdminPage

