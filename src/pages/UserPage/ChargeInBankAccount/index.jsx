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
    const bankList = useSelector(state => state.BankAccount)
    const dispatch = useDispatch()
    const [filter, setFilter] = useState()

    useEffect(() => {
        fetchBackAccount()
    }, [])

    const fetchBackAccount = async () => {
        setLoading(true)
        try {
            const res = await callApi('TaiKhoanNganHang', 'GET', null)
            dispatch({ type: type_back.FETCH_BANK_ACCOUNT, payload: res.data })
            let temp = []
            temp.push(res.data[0])
            setData(temp)
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }


    const handleChangeBankAccount = (value) => {
        let result = {}
        let temp = []
        bankList.forEach((bank) => {
            if (parseInt(bank.stk) === parseInt(value))
                result = bank
        })
        temp.push(result)
        setData(temp)

    }

    const columns = [
        {
            title: 'Số dư tài khoản',
            dataIndex: 'soDu',
            key: 'soDu',
            width: 120,
            fixed: 'center',
        },
        {
            title: 'Tổng số tiền',
            dataIndex: 'tongSoTien',
            key: 'tongSoTien',
            width: 120,
            fixed: 'center',
        },
        {
            title: 'Tiền mua chờ thanh toán',
            dataIndex: 'choThanhToan',
            key: 'choThanhToan',
            width: 200,
            fixed: 'center',
        },
        {
            title: 'Giá trị giao dịch chờ thanh toán',
            children: [
                {
                    title: 'T0',
                    dataIndex: 'soDuT0',
                    key: 'soDuT0',
                    width: 150,

                },
                {
                    title: 'T1',
                    dataIndex: 'soDuT1',
                    key: 'soDuT1',
                    width: 150,
                },
                {
                    title: 'T2',
                    dataIndex: 'soDuT2',
                    key: 'soDuT2',
                    width: 150,
                }

            ],
        }
    ]

    const getListBankAccount = bankList.map((acc, index) => {
        return (
            <Option key={index} value={acc.stk}>{acc.stk}-{acc.nganHang.tenNganHang}</Option>
        )
    })
    console.log(data[0]);
    return (
        <>
            <Row style={{ margin: '1rem' }}  >
                <Col span={6}>
                    <Select style={{ width: 200 }}
                        onChange={handleChangeBankAccount}
                        value={data[0]?.stk}
                    >
                        {getListBankAccount}

                    </Select>,
                </Col>

            </Row>

            <Table
                columns={columns}
                dataSource={data}
                loading={loading}
            />
        </>
    )
}

export default ChargeInBankAccount
