import { CloseSquareTwoTone } from '@ant-design/icons';
import { Table } from 'antd';
import { openNotificationError, openNotificationSuccess } from 'components/Notification';
import { format } from 'date-fns';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as types from '../../../constants/Report/ActionType';
import callApi from '../../../utils/apiCaller';
function PurchasedOneDayPage() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const date = new Date()

    function getDateCurrent() {
        const dateString = format(date, 'MM/dd/yyyy')
        return dateString
    }
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 5,
    })
    useEffect(() => {
        fetchData(pagination);
    }, [])


    const fetchData = async (pagination) => {
        setLoading(true)
        try {
            const paramsString = queryString.stringify(pagination);
            const requestUrl = `LenhDat/trongngay?${paramsString}`;
            const res = await callApi(requestUrl, 'GET', null)
            dispatch({ type: types.HISTORY_ORDER, payload: res.data })
            console.log(res);
            setTimeout(() => {
                setLoading(false)
            }, 300);
            setData(res.data.list)
            res.data.list.forEach((e) => {
                let value = new Date(e.thoiGian)
                const dateString = format(value, 'dd/MM/yyyy kk:mm:ss')
                e.thoiGian = dateString;
                e.loaiGiaoDich = e.loaiGiaoDich ? 'Mua' : 'Bán'
            })
            setPagination({ ...pagination, current: res.data.currentPage, total: res.data.totalItem })
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
            title: 'Từ tài khoản',
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
                    width: 100,

                },
                {
                    title: 'Giá',
                    dataIndex: 'gia',
                    key: 'gia',
                    width: 100,
                },
                {
                    title: 'Khối lượng khớp',
                    dataIndex: 'slKhop',
                    key: 'slKhop',
                    width: 100,
                }
                ,
                {
                    title: 'Giá khớp',
                    dataIndex: 'giaKhop',
                    key: 'giaKhop',
                    width: 100,
                },
                {
                    title: 'Giá trị khớp',
                    dataIndex: 'giaTriKhop',
                    key: 'giaTriKhop',
                    width: 100,
                }
            ],
        },
        {
            title: 'Trạng thái',
            dataIndex: 'tenTrangThai',
            key: 'tenTrangThai',
            width: 300,
            fixed: 'center',
        },
        {
            title: 'Hủy lệnh',
            dataIndex: 'maTT',
            key: 'maTT',
            width: 100,
            fixed: 'center',
            render: (maTT, maLD) => (
                <>
                    {maTT.trim() === 'CK' ? <CloseSquareTwoTone onClick={() => handleCancel(maLD.maLD)}
                        style={{ fontSize: '1.5rem', cursor: 'pointer', textAlign: 'center' }}
                    /> : null}
                </>
            ),
        }
    ]

    const handleCancel = async (maLD) => {
        console.log(maLD);
            const res = await callApi(`Lenhdat/${maLD}`, 'PUT')
            console.log(res);
            if (res.data.status === 0) {
                dispatch({ type: types.CANCEL_STOCK_TODAY, id: maLD });
                openNotificationSuccess('Thành công', res.data.message, 2)
            }
            else {
                openNotificationError('Thất bại', res.data.message, 2);
            }
    }
    const handleTableChange = (pagination) => {
        setPagination({ ...pagination, current: pagination.current })
        fetchData(pagination);
    };

    return (
        <>
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

export default PurchasedOneDayPage
