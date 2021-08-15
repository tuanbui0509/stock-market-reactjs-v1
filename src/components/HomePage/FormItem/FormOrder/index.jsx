import React, { useState, useEffect } from 'react'
import { Form, InputNumber, Modal, Button, Radio, Select, Input } from 'antd'
import './FormOrder.css'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router';
import * as ActionOrder from '../../../../actions/Order';
import callApi from '../../../../utils/apiCaller';

function FormOrder(props) {
    // handle event
    const user = useSelector(state => state.User)
    const dispatch = useDispatch();
    const history = useHistory();
    const LightningTableList = useSelector(state => state.LightningTableList)
    const [order, setOrder] = useState({
        stk: "",
        maCp: "",
        gia: "",
        soLuong: "",
        mkdatLenh: "",
        loaiGiaoDich: true,// Trạng thái mua bán mua: true, bán: false
        loaiLenh: 'ATO'// Trạng thái Loai: ATO, ATC, LO
    });
    const [bank, setBank] = useState({
        nganhang: "",
        soDu: 0
    });
    const [bankList, setBankList] = useState(null);
    const [stock, setStock] = useState({ gia: null, giaTran: null, giaTC: null, giaSan: null, kl: null });

    // Handle modal
    const [visibleOrder, setVisibleOrder] = useState(false)
    const [visibleConfirm, setVisibleConfirm] = useState(false)
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const onFinish = (values) => {
        if (values.gia * values.soLuong > bank.soDu) {
            alert("Số tiền không đủ");
            return;
        }
        console.log(values)
        setOrder(values)
        console.log(order)
        console.log(bank);
        setVisibleConfirm(true)


    }
    const handleConfirm = () => {

        console.log(order)
        setConfirmLoading(true);
        callApi("lenhdat", 'post', order).then(res => {
            let rec = res.data;
            console.log(rec);
            if (rec.status === 0) {
                setVisibleOrder(false)
                setConfirmLoading(false);
                setVisibleConfirm(false);
            } else {
                alert(rec.message);
                setConfirmLoading(false);
                setVisibleConfirm(false);
            }
        })
        setTimeout(() => {
        }, 2000);
        // dispatch(ActionOrder.MakeOrderRequest(order.pin,{
        //     stk : order.idAcc,
        //     macp : order.stockId,
        //     loaI_GIAODICH : order.selectedStatus,
        //     // loaI_GIAODICH : order.selectedType,
        //     giadat : parseFloat(order.price),
        //     soluongdat : parseInt(order.weight)
        // }));
    };

    const checkUser = () => {
        if (user === null)
            history.replace("/login");
        else {
            callApi('TaiKhoanNganHang', 'GET', null).then(res => {
                setBankList(res.data);

            })
            setVisibleOrder(true)
        }

    }

    // useEffect(() => {

    //     let index = findIndexStock(order.stockId, LightningTableList);
    //     console.log(index);
    //     console.log(order.stockId);

    //     if (index !== -1)
    //         setStock(LightningTableList[index]);
    // }, [order.stockId, stock.kl, stock.gia]);
    let findIndex = (id, list) => {
        for (let i = 0; i < list.length; i++)
            if (list[i].stk.trim() === id.trim())
                return i;
        return -1;
    }
    let findIndexStock = (id, list) => {
        for (let i = 0; i < list.length; i++)
            if (list[i].macp.trim() === id.trim())
                return i;
        return -1;
    }
    // let listBank = user ? user.listTaiKhoan.map((val, index) => {
    //     return <Select.Option value={val.stk}>{val.stk}</Select.Option>
    // }) : null;

    let tempValueStock = (id) => {
        let index = findIndexStock(id, LightningTableList)
        console.log(index);
        if (index === -1)
            return;
        let res = LightningTableList[index];
        setStock(res);
        console.log(stock);
    }
    let tempValueBank = (id) => {
        let index = findIndex(id, bankList)
        if (index === -1)
            return;
        let res = bankList[index];
        console.log(id, index);
        console.log(res);
        setBank(res);
    }
    let stockInformation = () => {
        return <React.Fragment><div className="modal-order-matching">
            <p className="order-matching-title">Khớp lệnh</p>
            <span className="order-matching-price">Giá: {stock.gia}</span>
            <span>-</span>
            <span className="order-matching-weight">Số lượng: {stock.kl}</span>
        </div>
            <div className="compare-stock">
                <div className="info-stock info-ceil">
                    <label>Trần: </label>
                    <span className="ceil">{stock.giaTran}</span>
                </div>
                <div className="info-stock info-standard">
                    <label>TC: </label>
                    <span className="standard">{stock.giaTC}</span>
                </div>
                <div className="info-stock info-floor">
                    <label>Sàn: </label>
                    <span className="floor">{stock.giaSan}</span>
                </div>
            </div></React.Fragment>
    }
    let displayBankList = () => {
        if (bankList !== null)
            return bankList.map((value, index) => {
                return <Select.Option value={value.stk}>{value.stk.trim() + " - " + value.nganHang.tenNganHang}</Select.Option>
            })
    }
    let onChangeListStock = (event) => {
        tempValueStock(event);
    }
    let onChangeListBank = (event) => {
        tempValueBank(event);
    }
    let ListStock = LightningTableList.map((value, index) => {
        return <Select.Option value={value.macp}>{value.macp}</Select.Option>
    })
    return (
        <>
            <Button type="primary" className='btn-match' onClick={() => checkUser()}>
                Đặt lệnh
            </Button>

            {visibleOrder ?
                <Modal
                    title="Đặt lệnh"
                    centered
                    visible={visibleOrder}
                    onOk={() => setVisibleOrder(false)}
                    onCancel={() => setVisibleOrder(false)}
                    width={800}
                    footer={[
                        <Button type="primary" htmlType="submit" form="my_form">Xác nhận</Button>
                    ]}
                >
                    <div className="modal-content">
                        <div className="modal-body">
                            <Form id='my_form'
                                onFinish={onFinish}
                                className="modal-form"
                                initialValues={{ priceBank: '1000', loaiLenh: 'LO', loaiGiaoDich: true }}>
                                <Form.Item className="form-item" name='stk' label="Số tài khoản"
                                    rules={[{ required: true, message: "Không được bỏ trống !" }]}>
                                    <Select
                                        showSearch
                                        style={{ width: 200 }}
                                        placeholder="Chọn số tài khoản"
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        filterSort={(optionA, optionB) =>
                                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                        }
                                        onChange={onChangeListBank}
                                    >
                                        {/* {listBank} */}
                                        {displayBankList()}
                                    </Select>
                                </Form.Item>
                                <Form.Item className="form-item" name="maCp" label="Mã chứng khoán"
                                    rules={[{ required: true, message: "Không được bỏ trống !" }]}>
                                    <Select
                                        showSearch
                                        style={{ width: 200 }}
                                        placeholder="Chọn mã chứng khoán"
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        filterSort={(optionA, optionB) =>
                                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                        }
                                        onChange={onChangeListStock}
                                    >
                                        {ListStock}
                                    </Select>
                                </Form.Item>
                                <Form.Item className="form-item" name='soLuong' label="Khối lượng"
                                    rules={[{ required: true, message: "Không được bỏ trống !" }]}>
                                    <InputNumber min={1} max={100000} />
                                </Form.Item>
                                <Form.Item className="form-item" name="gia" label="Giá đặt"
                                    rules={[{ required: true, message: "Không được bỏ trống !" }]}>
                                    <InputNumber value='100' />
                                </Form.Item>
                                {/* <Form.Item className="form-item" name='priceBank' label="Tiền trong tài khoản"
                                    rules={[{ required: true, message: "Không được bỏ trống !" }]}>
                                    <InputNumber value={bank.soDu} disabled value={bank.soDu} />
                                </Form.Item> */}
                                <Form.Item className="form-item" name="mkdatLenh" label="Mã pin"
                                    rules={[{ required: true, message: "Không được bỏ trống !" }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item className="form-item" name='loaiLenh' >
                                    <Radio.Group defaultValue='LO'>
                                        <Radio value='ATC'>ATC</Radio>
                                        <Radio value='ATO'>ATO</Radio>
                                        <Radio value='LO'>LO</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item className="form-item" name='loaiGiaoDich' >
                                    <Radio.Group defaultValue={true} buttonStyle="solid">
                                        <Radio.Button className='radio-btn-type' value={true} >Mua</Radio.Button>
                                        <Radio.Button value={false}>Bán</Radio.Button>
                                    </Radio.Group>
                                </Form.Item>
                            </Form>
                        </div>
                        <div className="modal-show-stock">
                            {stockInformation()}
                        </div>
                    </div>
                    {visibleConfirm
                        ? <Modal
                            style={{ marginTop: 140, whiteSpace: 'nowrap' }}
                            title="XÁC NHẬN ĐẶT LỆNH"
                            visible={visibleConfirm}
                            onOk={handleConfirm}
                            onCancel={() => setVisibleConfirm(false)}
                            okText="Xác nhận"
                            cancelText="Đóng"
                            confirmLoading={confirmLoading}
                        >
                            <div class="modal-info">
                                <p class="modal-info-title">Quý khách có thật sự muốn đặt lệnh <span className={order.loaiGiaoDich ? "color-green" : "color-red"}>{order.loaiGiaoDich ? 'Mua' : 'Bán'}</span>
                                </p>
                                <div className="modal-info-detail">
                                    <div className="modal-info-item">
                                        <p className="modal-info-label">Mã CK:</p>
                                        <strong className="modal-info-value">{order.maCp}</strong>
                                    </div>
                                    <div className="modal-info-item">
                                        <p className="modal-info-label">Khối lượng:</p>
                                        <strong className="modal-info-value">{order.soLuong}</strong>
                                    </div>
                                    <div className="modal-info-item">
                                        <p className="modal-info-label">Giá đặt:</p>
                                        <strong className="modal-info-value">{order.gia}</strong>
                                    </div>
                                    <div className="modal-info-item">
                                        <p className="modal-info-label">Tài khoản:</p>
                                        <strong className="modal-info-value color-red">{order.stk}</strong>
                                    </div>
                                </div>
                            </div>

                        </Modal> : null
                    }
                </Modal> : null}

        </>

    )
}

export default FormOrder
