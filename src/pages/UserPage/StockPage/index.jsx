import { Table } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import queryString from 'query-string';
import callApi from '../../../utils/apiCaller';
import * as types from '../../../constants/Report/ActionType';

function StockPage() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const reports = useSelector(state => state.Report)

    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 5,
    })

    useEffect(() => {
        fetchData({ pagination });
    }, [])

    const fetchData = async () => {
        setLoading(true)
        try {
            // console.log(pagination);
            const paramsString = queryString.stringify(pagination);
            const requestUrl = `ChungKhoanHienCo?${paramsString}`;
            const res = await callApi(requestUrl, 'GET', null)
            console.log(res.data);
            dispatch({ type: types.STOCK_OF_USER, payload: res.data })
            setLoading(false)
            setData(res.data.list)
            setPagination({ ...pagination, current: reports.currentPage, total: reports.totalItem })
        } catch (error) {
            console.log(error);
        }
    };
    console.log(data);
    const columns = [
        {
            title: 'Mã CK',
            dataIndex: 'maCp',
            key: 'maCp',
            width: 120,
            fixed: 'center',
        },
        {
            title: 'Tổng',
            dataIndex: 'tongSo',
            key: 'tongSo',
            width: 200,
            fixed: 'center',
        },
        {
            title: 'Khả dụng',
            dataIndex: 'soLuong',
            key: 'soLuong',
            width: 200,
            fixed: 'center',
        },
        {
            title: 'Chờ về',
            children: [
                {
                    title: 'T0',
                    dataIndex: 'soLuongT0',
                    key: 'soLuongT0',
                    width: 150,

                },
                {
                    title: 'T1',
                    dataIndex: 'soLuongT1',
                    key: 'soLuongT1',
                    width: 150,
                },
                {
                    title: 'T2',
                    dataIndex: 'soLuongT2',
                    key: 'soLuongT2',
                    width: 150,
                }
            ],
        },
        {
            title: 'Giá TT',
            dataIndex: 'giaTT',
            key: 'giaTT',
            width: 200,
            fixed: 'center',
        },
        {
            title: 'Giá trị TT',
            dataIndex: 'giaTriTT',
            key: 'giaTriTT',
            width: 100,
            fixed: 'center',
        }
    ]
    return (
        <>
            <Table
                dataSource={data}
                pagination={pagination}
                loading={loading}
                columns={columns}
            />
        </>
    )
}

export default StockPage