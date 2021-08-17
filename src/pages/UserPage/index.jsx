import { Divider } from 'antd';
import Footer from 'components/Common/Footer';
import Header from 'components/Common/Header';
import React from 'react';
import { Route } from 'react-router-dom';
import MenuUser from '../../components/Common/MenuUser';
import HistoryOrderPage from './HistoryOrderPage';
import ChargeInBankAccount from './ChargeInBankAccount';
import HistoryPurchasedPage from './HistoryPurchasedPage';
import PurchasedOneDayPage from './PurchasedOneDayPage';
import StockPage from './StockPage';
import './user.css';
function UserPage(props) {
    let user = JSON.parse(localStorage.getItem("user"));
    return (
        <>
            <Header />
            <main className="main-user">
                <div className="container">
                    <div className="row">
                        <div className="col col-12">
                            <Divider orientation="left">{user.ho} {user.ten} - {user.maNdt}</Divider>
                            <MenuUser path={props.history.match.path} />
                            <div>
                                <Route path='/khach-hang/lich-su-dat-lenh' component={HistoryPurchasedPage} />
                                <Route path='/khach-hang/chung-khoan-hien-co' component={StockPage} />
                                <Route path='/khach-hang/lich-su-khop-lenh' component={HistoryOrderPage} />
                                <Route path='/khach-hang/so-du-tien-ngan-hang' component={ChargeInBankAccount} />
                                <Route path='/khach-hang/lenh-trong-ngay' component={PurchasedOneDayPage} />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}

export default UserPage
