import { Button, Col, DatePicker, Form, Input, Row, Select, Table } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import reqwest from 'reqwest';
import callApi from '../../../utils/apiCaller';
import queryString from 'query-string';
import { useDispatch } from 'react-redux';
import *as types from '../../../constants/Report/ActionType'
const { Option } = Select;
function HistoryPurchasedPage() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const reports = useSelector(state => state.Report)
    const dispatch = useDispatch()
    function getDateCurrent() {
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();
        return `${m + 1}/${d}/${y}`
    }
    function getDateBeforeWeek() {
        var date = new Date();
        date.setDate(date.getDate() - 7);
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();
        return `${m + 1}/${d}/${y}`
    }
    const [pagination, setPagination] = useState({
        from: getDateBeforeWeek(),
        to: getDateCurrent(),
        MaTC: '',
        MaTT: 'TC',
        current: 1,
        pageSize: 5,
    })

    useEffect(() => {
        fetch({ pagination });
    }, [])

    const handleTableChange = (pagination) => {
        fetch({
            pagination
        });
    };
    const getRandomuserParams = params => ({
        results: params.pagination.pageSize,
        page: params.pagination.current,
        ...params,
    });
    fetch = async (params = {}) => {
        console.log(params);
        setLoading(true)
        
        try {
            const paramsString = queryString.stringify(pagination);
            const requestUrl = `LichSuLenhDat?${paramsString}`;
            const res = await callApi(requestUrl, 'GET', null)
            console.log(res);
            dispatch({ type: types.HISTORY_ORDER, payload: res.data })
            setLoading(false)
            setData(reports.list)
            setPagination({ ...pagination, current: reports.currentPage, total: reports.totalItem })
        } catch (error) {
            console.log(error);
        }
    };
    console.log(reports);
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
            width: 100,
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
                    dataIndex: '',
                    key: '',
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
            'to': fieldsValue['to'].format('MM-DD-YYYY')
        };
        console.log('Received values of form: ', values);
    };
    return (
        <>
            <Row style={{ margin: '1rem' }}  >
                <Col span={24}>
                    <Form onFinish={onFinish}>
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
                                    <DatePicker placeholder='Chọn ngày' />
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
                                    <DatePicker placeholder='Chọn ngày' />
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
                                        <Option value="china">China</Option>
                                        <Option value="usa">U.S.A</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Form.Item
                                    name='MaCT'
                                    label='MaTC'

                                >
                                    <Input placeholder="Nhập MaTC" />
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
                pagination={pagination}
                loading={loading}
                onChange={handleTableChange}
            />
        </>
    )
}

export default HistoryPurchasedPage
