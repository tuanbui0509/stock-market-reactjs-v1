import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import ConfirmForm from './ConfirmForm';
const OrderForm = (props) => {
    
    // const dispatch = useDispatch();
    // const history = useHistory();
    // const user = useSelector(state => state.User);
    // const LightningTableList = useSelector(state => state.LightningTableList);
    // const [order, setOrder] = useState({
    //     idAcc: "",
    //     stockId: "",
    //     price: "",
    //     weight: "",
    //     pin: "",
    //     selectedStatus: true// Trạng thái mua bán mua: true, bán: false
    // });
    // //const [form,setForm] = useState({});
    // const [bank, setBank] = useState({
    //     nganhang: "",
    //     sodu: -1
    // });
    // const [stock, setStock] = useState({ kl: -1, gia: -1 });

    // useEffect(() => {
    //     if (user) {
    //         let index = findIndex(order.idAcc, user.listTaiKhoan);
    //         if (index !== -1)
    //             setBank({
    //                 nganhang: user.listTaiKhoan[index].nganhang,
    //                 sodu: user.listTaiKhoan[index].sodu
    //             });
    //     }
    // }, [order.idAcc]);
    // useEffect(() => {

    //     let index = findIndexStock(order.stockId, LightningTableList);
    //     console.log(index);
    //     console.log(order.stockId);

    //     if (index !== -1)
    //         setStock(LightningTableList[index]);
    // }, [order.stockId, stock.kl, stock.gia]);

    // let findIndex = (id, list) => {
    //     for (let i = 0; i < list.length; i++)
    //         if (list[i].stk.trim() === id)
    //             return i;
    //     return -1;
    // }
    // let findIndexStock = (id, list) => {
    //     for (let i = 0; i < list.length; i++)
    //         if (list[i].macp.trim() === id)
    //             return i;
    //     return -1;
    // }
    // let listbank = user ? user.listTaiKhoan.map((val, index) => {
    //     return <li>{val.stk}</li>
    // }) : null;
    // let element = LightningTableList.map((value, index) => {
    //     return <li>{value.macp}</li>
    // })


    return (
        <>
           
        </>
    );
}

export default OrderForm;
