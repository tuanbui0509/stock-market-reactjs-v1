import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router';
// import { useDispatch , useSelector} from 'react-redux';
import * as Action from '../../actions/User/index';
import Footer from '../../components/Common/Footer';
import Header from '../../components/Common/Header';
import LightningTable from '../../components/HomePage/LightningTable';
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import UserPage from '../UserPage'
import LoginPage from '../LoginPage'
import NotFoundPage from '../NotFoundPage'
function HomePage(props) {

    const role = JSON.parse(localStorage.getItem("role"));

    //const history = useHistory();
    // const StockList = useSelector(state => state.StockList)
    const dispatch = useDispatch();
    // useEffect(()=>{
    //     dispatch(Action.fectchListAll());
    // });
    const user = useSelector(state => state.User);
    const token = JSON.parse(localStorage.getItem("user"));
    if (user === null && token !== null) {
        dispatch(Action.GetUserFromLocal(token));
    }
    const [, setTick] = useState(0);
    useEffect(() => {
        setTick(tick => tick + 1);
        console.log(user);
    }, [user]);
    return (
        <>
            <Header></Header>
            <LightningTable/>
            <Footer></Footer>
        </>
    );

}

export default HomePage;

