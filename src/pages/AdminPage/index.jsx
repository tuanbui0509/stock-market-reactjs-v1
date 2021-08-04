import React from 'react'
import LeftMenu from '../../components/Admin/LeftMenu'
import ViewRegisterForm from '../../components/Admin/ViewRegisterForm'
import './Admin.css'
function AdminPage(props) {
  return (
    <>
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

