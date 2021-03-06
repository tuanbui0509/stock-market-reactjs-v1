import * as signalR from "@microsoft/signalr";
import { Button } from "antd";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import callApi from 'utils/apiCaller';
import * as actionList from '../../../actions/LightningTable/index';
import * as Config from '../../../constants/Config';
import * as Gia from '../../../constants/LightningTable/index';
import FormOrder from '../FormItem/FormOrder';
import LightningTableItem from '../LightningTableItem';

function LightningTable(props) {
    const LightningTableList = useSelector(state => state.LightningTableList);
    const [stocks, setStocks] = useState([]);
    const [bankList, setBankList] = useState([]);
    const [macp, setMacp] = useState('');

    const history = useHistory();
    const [isOpenFormOrder, setIsOpenFormOrder] = useState(false)
    const [keyWord, setKeyWord] = useState('');
    const [filteredStocks, setFilteredStocks] = useState(LightningTableList);
    const User = useSelector(state => state.User);
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

    useEffect(() => {
        setFilteredStocks(
            LightningTableList.filter((stock) =>
                stock.macp.toLowerCase().includes(keyWord.toLowerCase())
            )
        );
    }, [keyWord, LightningTableList, isOpenFormOrder]);


    const onHandleOrder = (macp) => {
        if (User === null)
            history.replace("/login");
        else {
            callApi('TaiKhoanNganHang', 'GET', null).then(res => {
                setBankList(res.data)
                setIsOpenFormOrder(true)
                setMacp(macp)
            })
        }
    }

    let element = filteredStocks.map((value, index) => {
        return <LightningTableItem
            key={index}
            macp={value.macp}
            giaTC={value.giaTC === null ? null : value.giaTC / Gia.GIA}
            giaTran={value.giaTran === null ? null : value.giaTran / Gia.GIA}
            giaSan={value.giaSan === null ? null : value.giaSan / Gia.GIA}
            ktTong={value.ktTong}
            giaMua3={value.giaMua3 === null ? null : value.giaMua3 / Gia.GIA}
            klMua3={value.klMua3}
            giaMua2={value.giaMua2 === null ? null : value.giaMua2 / Gia.GIA}
            klMua2={value.klMua2}
            giaMua1={value.giaMua1 === null ? null : value.giaMua1 / Gia.GIA}
            klMua1={value.klMua1}
            gia={value.gia === null ? null : value.gia / Gia.GIA}
            kl={value.kl}
            giaBan1={value.giaBan1 === null ? null : value.giaBan1 / Gia.GIA}
            klBan1={value.klBan1}
            giaBan2={value.giaBan2 === null ? null : value.giaBan2 / Gia.GIA}
            klBan2={value.klBan2}
            giaBan3={value.giaBan3 === null ? null : value.giaBan3 / Gia.GIA}
            klBan3={value.klBan3}
            onHandleOrder={onHandleOrder}
        />
    })

    const checkUser = async () => {
        if (User === null)
            history.replace("/login");
        else {
            callApi('TaiKhoanNganHang', 'GET', null).then(res => {
                setBankList(res.data)
                setIsOpenFormOrder(true)
            })
        }
    }

    return (
        <>
            <main class="content-wp">
                <section className="content">
                    <div className="content__search">
                        <input
                            type="text"
                            placeholder="Nh???p m?? CK ..."
                            className="content__search-input"
                            name='keyWord'
                            value={keyWord}
                            onChange={(e) => setKeyWord(e.target.value)}
                            style={{ textTransform: 'uppercase' }}
                        />
                        <i className=" content__search-icon fas fa-search" />

                        <div className="wp-list-stock">
                            <ul className="list-stock">
                                <li className="stock-item"><span>
                                    ABC <br />  <br /> C??ng ty C??? ph???n M?? thu???t v?? Truy???n th??ng
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
                                    Tr???n
                                </th>
                                <th rowSpan={2}>
                                    S??n
                                </th>
                                <th rowSpan={2}>
                                    TC
                                </th>
                                <th rowSpan={1} colSpan={6}>
                                    B??n mua
                                </th>
                                <th rowSpan={1} colSpan={2}>
                                    Kh???p l???nh
                                </th>
                                <th rowSpan={1} colSpan={6}>
                                    B??n b??n
                                </th>
                                <th rowSpan={2}>
                                    T???ng KL
                                </th>
                            </tr>
                            <tr className="table-light__header-second">
                                <th>Gi?? 3</th>
                                <th>KL 3</th>
                                <th>Gi?? 2</th>
                                <th>KL 2</th>
                                <th>Gi?? 1</th>
                                <th>KL 1</th>
                                <th>Gi??</th>
                                <th>KL</th>
                                <th>Gi?? 1</th>
                                <th>KL 1</th>
                                <th>Gi?? 2</th>
                                <th>KL 2</th>
                                <th>Gi?? 3</th>
                                <th>KL 3</th>
                            </tr>
                        </thead>
                    </table>
                    <table className="table-light__content" id="HCM">
                        <tbody className="line-stocks"> {/* 1 stock */}
                            {element}
                        </tbody>
                    </table>
                </section>
            </main>
            <Button type="primary" className='btn-match' onClick={checkUser}>
                ?????t l???nh
            </Button>
            {isOpenFormOrder ?
                <FormOrder
                    isOpenFormOrder={isOpenFormOrder}
                    setIsOpenFormOrder={setIsOpenFormOrder}
                    bank_list={bankList}
                    macp={macp}
                    setMacp={setMacp}
                />
                : null
            }
        </>
    );

}
export default LightningTable;