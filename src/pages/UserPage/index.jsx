import React, { useState } from 'react'
import './user.css';
import { Table, Tag, Space, Divider, Row, Col } from 'antd';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import MenuUser from '../../components/Common/MenuUser'
import Header from 'components/Common/Header';
import Footer from 'components/Common/Footer';
import StatementOrderPage from '../UserPage/StatementOrderPage';
import StatementPurchasedPage from '../UserPage/StatementPurchasedPage';
import StockPage from '../UserPage/StockPage';
const { Column, ColumnGroup } = Table;


const style = { padding: '8px 0', marginBottom: '1rem', textAlign: 'center', fontWeight: 'bold', display: 'block' };
function UserPage() {

    return (
        <Router>
            <Header />
            <main className="main-user">
                <div className="container">
                    <div className="row">
                        <div className="col col-12">
                            <MenuUser />
                            <Switch>
                                <Route path="/history-order" exact component={StatementOrderPage} />
                                <Route path="/history-purchase" exact component={StatementPurchasedPage} />
                                <Route path="/statement-strafer-price" exact component={StatementOrderPage} />
                                <Route path="/statement-strafer-stock" exact component={StatementOrderPage} />
                                <Route path="/stocks" exact component={StockPage} />
                            </Switch>

                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </Router>
    )
}

export default UserPage
