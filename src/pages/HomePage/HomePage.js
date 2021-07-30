import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router';
// import { useDispatch , useSelector} from 'react-redux';
import * as Acction from '../../actions/User/index';
import Header from '../../components/Common/Header';
import Footer from '../../components/HomePage/Footer';
import LightningTable from '../../components/HomePage/LightningTable';

function HomePage(props){
    
    //const history = useHistory();
    // const StockList = useSelector(state => state.StockList)
    const dispatch = useDispatch();
    // useEffect(()=>{
    //     dispatch(Acction.fectchListAll());
    // });
    const user = useSelector(state => state.User);
    const token = JSON.parse(localStorage.getItem("token"));
    if(user===null && token !== null){
        dispatch(Acction.GetUserFromLocal(token));
    }
    const [, setTick] = useState(0);
    useEffect(()=>{
        setTick(tick => tick + 1);
        console.log(user);
    },[user]);
    return (
        <div className="App">
                <Header></Header>
                <LightningTable></LightningTable>
                <Footer></Footer>
              
        </div>
    );

}

export default HomePage;

