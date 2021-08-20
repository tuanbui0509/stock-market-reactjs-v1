import { Button, Col, DatePicker, Form, Input, Row, Select, Table } from 'antd';
import { format } from 'date-fns';
import moment from 'moment-timezone';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../../../constants/Report/ActionType';
import * as type_status from '../../../constants/Common/ActionType';
import callApi from '../../../utils/apiCaller';
const { Option } = Select;
function HistoryPurchasedPage() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const status = useSelector(state => state.Status)
    const dispatch = useDispatch()
    const date = new Date()

    function getDateCurrent() {
        // const dateString = format(date, 'MM/dd/yyyy')
        var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        var d = today.getDate();
        var m = today.getMonth();
        var y = today.getFullYear();
        return `${m + 1}/${d}/${y}`
    }
    function getDateBeforeWeek() {
        var nextweek = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7);
        var d = nextweek.getDate();
        var m = nextweek.getMonth();
        var y = nextweek.getFullYear();
        return `${m + 1}/${d}/${y}`
    }
    const [pagination, setPagination] = useState({
        from: getDateBeforeWeek(),
        to: getDateCurrent(),
        MaCK: '',
        MaTT: 'TC',
    })
    const [page, setPage] = useState({
        current: 1,
        pageSize: 5,
    })
    useEffect(() => {
        fetchStatus()

    }, [])

    useEffect(() => {
        fetchData();
    }, [pagination])

    const fetchStatus = async () => {
        setLoading(true)
        try {
            const res = await callApi('TrangThai', 'GET', null)
            dispatch({ type: type_status.FETCH_STATUS, payload: res.data })
        } catch (error) {
            console.log(error);
        }
    }
    const handleTableChange = (page) => {
        fetchData();
    };
    const fetchData = async () => {
        try {
            setLoading(true)
            const paramsString = queryString.stringify(pagination);
            const requestUrl = `LichSuLenhDat?${paramsString}`;
            const res = await callApi(requestUrl, 'GET', null)
            console.log(res.data);
            setLoading(false)
            if (res.data.list) {
                res.data.list.forEach((e) => {
                    let value = new Date(e.thoiGian)
                    const dateString = format(value, 'dd/MM/yyyy kk:mm:ss')
                    e.thoiGian = dateString;
                    e.loaiGiaoDich = e.loaiGiaoDich ? 'Mua' : 'Bán'
                })
                setPage({ ...page, current: res.data.currentPage, total: res.data.totalItem })
            }
            console.log(page);
            setData(res.data.list)
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
            width: 200,
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
            title: 'Trạng thái lệnh',
            dataIndex: 'tenTrangThai',
            key: 'tenTrangThai',
            width: 200,
            fixed: 'center',
        }
    ]

    const onFinish = (fieldsValue) => {
        const values = {
            ...fieldsValue,
            'from': fieldsValue['from'].format('MM-DD-YYYY'),
            'to': fieldsValue['to'].format('MM-DD-YYYY'),
        };
        console.log(values);
        console.log(pagination);
        setPagination(
            {
                ...pagination,
                MaTT: values.MaTT,
                MaCK: values.MaCK,
                from: values.from,
                to: values.to,
            }
        )
        fetchData();
    };

    const worker = {
        from: moment(new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7)),
        to: moment(new Date()),
        MaTT: 'TC',
        MaCK: ''
    };
    const dateFormat = "DD/MM/YYYY";

    const getListStatus = status.map((sta, index) => {
        return (
            <Option value={sta.maTt}>{sta.tenTrangThai}</Option>
        )
    })
    return (
        <>
            <Row style={{ margin: '1rem' }}  >
                <Col span={24}>
                    <Form onFinish={onFinish} initialValues={worker} >
                        <Row gutter={40}>
                            <Col span={5}>
                                <Form.Item name="from" label="Từ ngày"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng chọn ngày',
                                        },
                                    ]}
                                >
                                    <DatePicker placeholder='Chọn ngày' format={dateFormat} />
                                </Form.Item>
                            </Col>
                            <Col span={5}>
                                <Form.Item name="to" label="Đến ngày"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng chọn ngày',
                                        },
                                    ]}
                                >
                                    <DatePicker placeholder='Chọn ngày' format={dateFormat} />
                                </Form.Item>
                            </Col>
                            <Col span={5}>

                                <Form.Item
                                    name="MaTT"
                                    label="Trạng thái"
                                    hasFeedback
                                    rules={[
                                        {
                                            message: 'Chọn trạng thái!',
                                        },
                                    ]}
                                >
                                    <Select placeholder="Trạng thái">
                                        {getListStatus}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Form.Item
                                    name='MaCK'
                                    label='MaCK'
                                >
                                    <Input placeholder="Nhập MaCK" />
                                </Form.Item>
                            </Col>
                            <Col span={1}>
                                <Form.Item
                                    wrapperCol={{
                                        xs: {
                                            span: 24,
                                            offset: 0,
                                        },
                                        sm: {
                                            span: 16,
                                            offset: 8,
                                        },
                                    }}
                                >
                                    <Button type="primary" htmlType="submit">
                                        Cập nhật
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Col>

            </Row>
            <Table
                columns={columns}
                dataSource={data}
                pagination={page}
                loading={loading}
                onChange={handleTableChange}
            />
        </>
    )
}

export default HistoryPurchasedPage
