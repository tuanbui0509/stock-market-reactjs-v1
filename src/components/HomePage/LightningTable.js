import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as signalR from "@microsoft/signalr";
import * as actionList from '../../actions/LightningTable/index'
import * as actionState from '../../actions/LightningTableState/index'
import * as Config from '../../constants/Config'
import LightningTableItem from './LightningTableItem'
import OrderForm from './FormItem/OrderForm';
import ConfirmForm from './FormItem/ConfirmForm';
function LightningTable(props) {
    const LightningTableState = useSelector(state => state.LightningTableState);
    const LightningTableList = useSelector(state => state.LightningTableList);
    const [isShow, setIsShow] = useState(false);
    const [count, setCount] = useState(-1);
    const [stocks, setStocks] = useState([]);
    const [keyWord, setKeyWord] = useState('');
    //let dumpList = LightningTableState.List;
    const User = useSelector(state => state.User);
    //console.log(User);
    const dispatch = useDispatch();

    useEffect(()=>{
        const hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(Config.BASE_URL + "/signalr")
        .configureLogging(signalR.LogLevel.Information)  
        .build();
        hubConnection.on("message", message => {
            let json = JSON.parse(message);
            json = json[0];
            let e = {
                macp : json.MACP,
                giaTC : json.GiaTC,
                giaTran : json.GiaTran,
                giaSan : json.GiaSan,
                ktTong : json.KTTong,
                giaMua3 : json.GiaMua3,
                klMua3 : json.KLMua3,
                giaMua2 : json.GiaMua2,
                klMua2 : json.KLMua2,
                giaMua1 : json.GiaMua1,
                klMua1 : json.KLMua1,
                gia : json.Gia,
                kl : json.KL,
                giaBan1 : json.GiaBan1,
                klBan1 : json.KLBan1,
                giaBan2 :json.GiaBan2,
                klBan2  : json.KLBan2,
                giaBan3 : json.GiaBan3,
                klBan3 : json.KLBan3
            }
            console.log(e);
            dispatch(actionList.FetchChangeListStocks(e));
        });
        hubConnection.start();
    },[])
    useEffect(() => {
        dispatch(actionState.FetchListStatesRequest(1))
        //setCount(1);
        //dispatch(actionState.ChangeListStates(index));
    }, [User]);

    useEffect(() => {
        //console.log(LightningTableState);
        if (LightningTableState.selected !== -1) {
            if (User !== null && LightningTableState.List[LightningTableState.selected].maSan.trim() === 'FAV') {
                dispatch(actionList.FetchListStocksFaRequest(User.mandt));
                console.log("firing");
            } else {
                dispatch(actionList.FetchListStocksRequest(LightningTableState.List[LightningTableState.selected].maSan));
            }
        }
    }, [LightningTableState.selected]);

    const ClickOnState = (index, value) => {
        return () => {
            dispatch(actionState.ChangeListStates(index));
            setCount(index);
            //console.log(count);
            //LightningTableState.selected = index;
        }
    }
    const selected = (index) => {
        if (LightningTableState.selected === index)
            return "content__tab-pill--active ";
        else
            return "";
    }
    let stateList = "";
    if (LightningTableState.selected !== -1) {
        stateList = LightningTableState.List.map((value, index) => {
            let inside = <div key={index} className={selected(index) + "content__tab-pill"} onClick={ClickOnState(index, value.maSan)}>
                <div className="content__tab-title">{value.maSan.trim()}</div>
            </div>
            return inside;
        })
    }

    let element = LightningTableList.map((value, index) => {
        return <LightningTableItem
            key={index}
            macp={value.macp}
            giaTC={value.giaTC}
            giaTran={value.giaTran}
            giaSan={value.giaSan}
            ktTong={value.ktTong}
            giaMua3={value.giaMua3}
            klMua3={value.klMua3}
            giaMua2={value.giaMua2}
            klMua2={value.klMua2}
            giaMua1={value.giaMua1}
            klMua1={value.klMua1}
            gia={value.gia}
            kl={value.kl}
            giaBan1={value.giaBan1}
            klBan1={value.klBan1}
            giaBan2={value.giaBan2}
            klBan2={value.klBan2}
            giaBan3={value.giaBan3}
            klBan3={value.klBan3}
        />
    })


    let showModalMatching = () => {
        let my_modal = document.getElementById('my-modal');
        my_modal.style.visibility = 'visible';
        my_modal.style.opacity = 1;
    }

    let onSearchStock = (e) => {
        const target = e.target;
        const value = target.value;
        setKeyWord(value);
        let result = null;
        if (LightningTableList.length > 0) {
            result = LightningTableList.filter((stock) => {
                console.log(stock.macp.trim().toLowerCase());
                return stock.macp.trim().toLowerCase().indexOf(value) !== -1;
            });
        }
        setStocks(result)
        // console.log(LightningTableList);
        // console.log(result);
        // console.log(stocks);
    }
    return (
        <div>
            <main class="content-wp">
                <section className="content">
                    <div className="content__search">
                        <input
                            type="text"
                            placeholder="Nhập mã CK ..."
                            className="content__search-input"
                            name='keyWord'
                            value={keyWord}
                            onChange={onSearchStock}
                        />
                        <i className=" content__search-icon fas fa-search" />

                        <div className="wp-list-stock">
                            <ul className="list-stock">
                                <li className="stock-item"><span>
                                    ABC <br />  <br /> Công ty Cổ phần Mĩ thuật và Truyền thông
                                </span>
                                </li>

                            </ul>
                        </div>
                    </div>
                    {stateList}
                </section>
                <section className="table-light-wp">
                    <table className="table-light__header">
                        <thead className="table-light__header--fixed">
                            <tr className="table-light__header-first">
                                <th rowSpan={2}>
                                    CK
                                </th>
                                <th rowSpan={2}>
                                    Trần
                                </th>
                                <th rowSpan={2}>
                                    Sàn
                                </th>
                                <th rowSpan={2}>
                                    TC
                                </th>
                                <th rowSpan={1} colSpan={6}>
                                    Bên mua
                                </th>
                                <th rowSpan={1} colSpan={2}>
                                    Khớp lệnh
                                </th>
                                <th rowSpan={1} colSpan={6}>
                                    Bên bán
                                </th>
                                <th rowSpan={2}>
                                    Tổng KL
                                </th>
                            </tr>
                            <tr className="table-light__header-second">
                                <th>Giá 3</th>
                                <th>KL 3</th>
                                <th>Giá 2</th>
                                <th>KL 2</th>
                                <th>Giá 1</th>
                                <th>KL 1</th>
                                <th>Giá</th>
                                <th>KL</th>
                                <th>Giá 1</th>
                                <th>KL 1</th>
                                <th>Giá 2</th>
                                <th>KL 2</th>
                                <th>Giá 3</th>
                                <th>KL 3</th>
                            </tr>
                        </thead>
                    </table>
                    <div>
                        <table className="table-light__content" id="HCM">
                            <tbody className="line-stocks"> {/* 1 stock */}
                                {element}
                            </tbody>
                        </table>
                    </div>
                </section>
                <section 
                class="order-matching" 
                onClick={showModalMatching}
                // showForm={showForm}
                >
                    <i class="fas fa-cart-plus"></i>
                    <span>Đặt lệnh</span>
                </section>
            </main>
            <OrderForm />

        </div>
    );

}
export default LightningTable;