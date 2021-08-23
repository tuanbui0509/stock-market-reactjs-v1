import * as signalR from "@microsoft/signalr";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actionList from '../../../actions/LightningTable/index';
import * as Config from '../../../constants/Config';
import FormOrder from '../FormItem/FormOrder/';
import LightningTableItem from '../LightningTableItem';

function LightningTable(props) {
    const LightningTableList = useSelector(state => state.LightningTableList);
    const [stocks, setStocks] = useState([]);
    const [keyWord, setKeyWord] = useState('');
    //let dumpList = LightningTableState.List;
    const User = useSelector(state => state.User);
    //console.log(User);
    const dispatch = useDispatch();

    useEffect(() => {
        const hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(Config.BASE_URL + "/signalr")
            .configureLogging(signalR.LogLevel.Information)
            .build();
        hubConnection.on("message", message => {
            let json = JSON.parse(message);
            console.log(json);
            dispatch(actionList.FetchChangeListStocks(json));
        });
        hubConnection.start();
    }, [])

    useEffect(() => {
        dispatch(actionList.FetchListStocksRequest());
    }, []);

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
    }
    return (
        <>
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
                    <table className="table-light__content" id="HCM">
                        <tbody className="line-stocks"> {/* 1 stock */}
                            {element}
                        </tbody>
                        {/* <div className="table-light__body">
                        </div> */}
                    </table>
                </section>
            </main>
            <FormOrder />

            {/* <FormOrder/> */}

        </>
    );

}
export default LightningTable;