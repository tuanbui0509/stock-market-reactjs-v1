import { CloseSquareTwoTone } from '@ant-design/icons';
import { Button, Col, DatePicker, Form, Input, Row, Select, Table } from 'antd';
import { format } from 'date-fns';
import moment from 'moment-timezone';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../../../constants/Report/ActionType';
import * as type_back from '../../../constants/Common/ActionType';
import callApi from '../../../utils/apiCaller';
const { Option } = Select;
function ChargeInBankAccount() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const reports = useSelector(state => state.Report)
    const bankList = useSelector(state => state.BankAccount)
    const dispatch = useDispatch()
    const date = new Date()

    function getDateCurrent() {
        const dateString = format(date, 'MM/dd/yyyy')
        // var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        // var d = today.getDate();
        // var m = today.getMonth();
        // var y = today.getFullYear();
        return dateString
    }
    const [pagination, setPagination] = useState({
        from: getDateCurrent(),
        to: getDateCurrent(),
        MaCK: '',
        MaTT: 'TC',
        current: 1,
        pageSize: 5,
    })
    useEffect(() => {
        fetchData();
        fetchBackAccount()
    }, [])

    // useEffect(() => {
    //     fetch({ pagination });
    //     fetchBackAccount()
    // }, [pagination])

    // const handleTableChange = (pagination) => {
    //     fetch({
    //         pagination
    //     });
    // };

    const fetchBackAccount = async () => {
        setLoading(true)
        try {
            const res = await callApi('TaiKhoanNganHang', 'GET', null)
            dispatch({ type: type_back.FETCH_BANK_ACCOUNT, payload: res.data })
        } catch (error) {
            console.log(error);
        }
    }
    const fetchData = async () => {
        setLoading(true)
        try {
            console.log(pagination);
            const paramsString = queryString.stringify(pagination);
            const requestUrl = `LichSuLenhDat?${paramsString}`;
            const res = await callApi(requestUrl, 'GET', null)
            dispatch({ type: types.HISTORY_ORDER, payload: res.data })
            console.log(res);
            setLoading(false)
            setData(reports.list)
            let list = reports.list.forEach((e, index) => {
                let value = new Date(e.thoiGian)
                const dateString = format(value, 'dd/MM/yyyy kk:mm:ss')
                e.thoiGian = dateString;
                e.loaiGiaoDich = e.loaiGiaoDich ? 'Mua' : 'Bán'
            })
            setPagination({ ...pagination, current: reports.currentPage, total: reports.totalItem })
        } catch (error) {
            console.log(error);
        }
    };
    const columns = [
        {
            title: 'Mã lệnh',
            dataIndex: 'maLD',
            key: 'maLD',
            width: 120,
            fixed: 'center',
        },
        {
            title: 'Mã CK',
            dataIndex: 'maCP',
            key: 'maCP',
            width: 200,
            fixed: 'center',
        },
        {
            title: 'Mua/Bán',
            dataIndex: 'loaiGiaoDich',
            key: 'loaiGiaoDich',
            width: 100,
            fixed: 'center',
        },
        {
            title: 'Đặt từ',
            dataIndex: 'stk',
            key: 'stk',
            width: 200,
            fixed: 'center',
        },
        {
            title: 'Ngày',
            dataIndex: 'thoiGian',
            key: 'thoiGian',
            width: 300,
            fixed: 'center',
        },
        {
            title: 'Thông tin cổ phiếu',
            children: [
                {
                    title: 'Khối lượng',
                    dataIndex: 'soLuong',
                    key: 'soLuong',
                    width: 150,

                },
                {
                    title: 'Giá',
                    dataIndex: 'gia',
                    key: 'gia',
                    width: 150,
                },
                {
                    title: 'Khối lượng khớp',
                    dataIndex: 'slKhop',
                    key: 'slKhop',
                    width: 150,
                }
                ,
                {
                    title: 'Giá khớp',
                    dataIndex: 'giaKhop',
                    key: 'giaKhop',
                    width: 150,
                },
                {
                    title: 'Giá trị khớp',
                    dataIndex: 'giaTriKhop',
                    key: 'giaTriKhop',
                    width: 150,
                }
            ],
        },
        {
            title: 'Trạng thái',
            dataIndex: 'tenTrangThai',
            key: 'tenTrangThai',
            width: 200,
            fixed: 'center',
        },
        {
            title: 'Hủy lệnh',
            dataIndex: 'tenTrangThai',
            key: 'tenTrangThai',
            width: 100,
            fixed: 'center',
            render: () => <CloseSquareTwoTone style={{ fontSize: '1.5rem', cursor: 'pointer', textAlign: 'center' }} />,
        }
    ]
    const handleTableChange = (pagination) => {
        fetch({
            pagination
        });
    };
    const onFinish = (fieldsValue) => {
        const values = {
            ...fieldsValue,
            'from': fieldsValue['from'].format('MM-DD-YYYY'),
            'to': fieldsValue['to'].format('MM-DD-YYYY'),
        };
        console.log(values.MaCK);
        setPagination({ ...pagination, current: 5, total: 100 })
        console.log(pagination);
        fetchData();
    };

    const worker = {
        stk: 'Chọn tài khoản',
    };
    console.log(bankList);
    const getListBankAccount = bankList.map((acc, index) => {
        return (
            <Option key={index} value={acc.stk}>{acc.stk}-{acc.nganHang.tenNganHang}</Option>
        )
    })
    return (
        <>
            <Row style={{ margin: '1rem' }}  >
                <Col span={6}>
                    <Form onFinish={onFinish} initialValues={worker} >
                        <Form.Item
                            name="stk"
                            label="Số tài khoản"
                            hasFeedback
                            rules={[
                                {
                                    message: 'Chọn trạng thái!',
                                },
                            ]}
                        >
                            <Select placeholder="Trạng thái">
                                {getListBankAccount}
                            </Select>
                        </Form.Item>
                    </Form>
                </Col>

            </Row>

            <Table
                columns={columns}
                dataSource={data}
                pagination={pagination}
                loading={loading}
                onChange={handleTableChange}
            />
        </>
    )
}

export default ChargeInBankAccount
