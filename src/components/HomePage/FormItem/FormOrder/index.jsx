import React, { useState, useEffect } from 'react'
import { Form, InputNumber, Modal, Button, Radio, Select } from 'antd'
import './FormOrder.css'
import { useSelector } from 'react-redux'
function FormOrder(props) {
    // handle event
    const user = useSelector(state => state.User)
    const LightningTableList = useSelector(state => state.LightningTableList)
    const [order, setOrder] = useState({
        idAcc: "",
        stockId: "",
        price: "",
        weight: "",
        pin: "",
        selectedStatus: true,// Trạng thái mua bán mua: true, bán: false
        selectedType: 'ATO'// Trạng thái Loai: ATO, ATC, LO
    });
    const [bank, setBank] = useState({
        nganhang: "",
        sodu: -1
    });
    const [stock, setStock] = useState({ kl: -1, gia: -1 });

    // Handle modal
    const [visibleOrder, setVisibleOrder] = useState(false)
    const [visibleConfirm, setVisibleConfirm] = useState(false)
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const onFinish = (values) => {
        console.log(values)
        setOrder(values)
        setVisibleConfirm(true)
    }
    const handleConfirm = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setVisibleConfirm(false); setVisibleOrder(false)
            setConfirmLoading(false);
        }, 2000);
    };

    // useEffect
    useEffect(() => {
        if (user) {
            let index = findIndex(order.idAcc, user.listTaiKhoan);
            if (index !== -1)
                setBank({
                    nganhang: user.listTaiKhoan[index].nganhang,
                    sodu: user.listTaiKhoan[index].sodu
                });
        }
    }, [order.idAcc]);

    useEffect(() => {

        let index = findIndexStock(order.stockId, LightningTableList);
        console.log(index);
        console.log(order.stockId);

        if (index !== -1)
            setStock(LightningTableList[index]);
    }, [order.stockId, stock.kl, stock.gia]);
    let findIndex = (id, list) => {
        for (let i = 0; i < list.length; i++)
            if (list[i].stk.trim() === id)
                return i;
        return -1;
    }
    let findIndexStock = (id, list) => {
        for (let i = 0; i < list.length; i++)
            if (list[i].macp.trim() === id)
                return i;
        return -1;
    }
    let listBank = user ? user.listTaiKhoan.map((val, index) => {
        return <Select.Option value={val.stk}>{val.stk}</Select.Option>
    }) : null;
    let ListStock = LightningTableList.map((value, index) => {
        return <Select.Option value={value.macp}>{value.macp}</Select.Option>
    })
    return (
        <>
            <Button type="primary" className='btn-match' onClick={() => setVisibleOrder(true)}>
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
                                initialValues={{ priceBank: '1000', selectedType: 'ATC', selectedStatus: false }}>
                                <Form.Item className="form-item" name='idAcc' label="Số tài khoản"
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
                                    >
                                        {/* {listBank} */}
                                        <Select.Option value="1">12222 </Select.Option>
                                        <Select.Option value="2">5555</Select.Option>
                                        <Select.Option value="3">5555</Select.Option>
                                        <Select.Option value="4">6666</Select.Option>
                                        <Select.Option value="5">55555</Select.Option>
                                        <Select.Option value="6">778777</Select.Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item className="form-item" name="stockId" label="Mã chứng khoán"
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
                                    >
                                        {ListStock}
                                    </Select>
                                </Form.Item>
                                <Form.Item className="form-item" name='weight' label="Khối lượng"
                                    rules={[{ required: true, message: "Không được bỏ trống !" }]}>
                                    <InputNumber min={1} max={100000} />
                                </Form.Item>
                                <Form.Item className="form-item" name="price" label="Giá đặt"
                                    rules={[{ required: true, message: "Không được bỏ trống !" }]}>
                                    <InputNumber value='100' />
                                </Form.Item>
                                <Form.Item className="form-item" name='priceBank' label="Tiền trong tài khoản"
                                    rules={[{ required: true, message: "Không được bỏ trống !" }]}>
                                    <InputNumber value={100} disabled value={100} />
                                </Form.Item>
                                <Form.Item className="form-item" name="pin" label="Mã pin"
                                    rules={[{ required: true, message: "Không được bỏ trống !" }]}>
                                    <InputNumber min={1} max={999999} />
                                </Form.Item>
                                <Form.Item className="form-item" name='selectedType' >
                                    <Radio.Group defaultValue='ATC'>
                                        <Radio value='ATC'>ATC</Radio>
                                        <Radio value='ATO'>ATO</Radio>
                                        <Radio value='LO'>LO</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item className="form-item" name='selectedStatus' >
                                    <Radio.Group defaultValue={true} buttonStyle="solid">
                                        <Radio.Button className='radio-btn-type' value={true} >Mua</Radio.Button>
                                        <Radio.Button value={false}>Bán</Radio.Button>
                                    </Radio.Group>
                                </Form.Item>
                            </Form>
                        </div>
                        <div className="modal-show-stock">
                            <div className="modal-order-matching">
                                <p className="order-matching-title">Khớp lệnh</p>
                                <span className="order-matching-price">Giá: 13.4</span>
                                <span>-</span>
                                <span className="order-matching-weight">Số lượng: 1,340</span>
                            </div>
                            <div className="compare-stock">
                                <div className="info-stock info-ceil">
                                    <label>Trần: </label>
                                    <span className="ceil">14.5</span>
                                </div>
                                <div className="info-stock info-standard">
                                    <label>TC: </label>
                                    <span className="standard">13.4</span>
                                </div>
                                <div className="info-stock info-floor">
                                    <label>Sàn: </label>
                                    <span className="floor">12.3</span>
                                </div>
                            </div>
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
                                <p class="modal-info-title">Quý khách có thật sự muốn đặt lệnh <span class="color-green">Mua</span>
                                </p>
                                <div className="modal-info-detail">
                                    <div className="modal-info-item">
                                        <p className="modal-info-label">Mã CK:</p>
                                        <strong className="modal-info-value">BHD</strong>
                                    </div>
                                    <div className="modal-info-item">
                                        <p className="modal-info-label">Khối lượng:</p>
                                        <strong className="modal-info-value">10</strong>
                                    </div>
                                    <div className="modal-info-item">
                                        <p className="modal-info-label">Giá đặt:</p>
                                        <strong className="modal-info-value">100.000</strong>
                                    </div>
                                    <div className="modal-info-item">
                                        <p className="modal-info-label">Tài khoản:</p>
                                        <strong className="modal-info-value color-red">1000201</strong>
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
