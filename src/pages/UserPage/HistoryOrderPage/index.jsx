import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import reqwest from 'reqwest';
const { Column, ColumnGroup } = Table;
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        render: name => `${name.first} ${name.last}`,
        width: '20%',
    },
    {
        title: 'Gender',
        dataIndex: 'gender',

        width: '20%',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
];



function HistoryOrderPage() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [pagination, setPagination] = useState({
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
    fetch = (params = {}) => {
        console.log(params);
        setLoading(true)
        reqwest({
            url: 'https://randomuser.me/api',
            method: 'get',
            type: 'json',
            data: getRandomuserParams(params),
        }).then(data => {
            console.log(data);
            setLoading(false)
            setData(data.results)
            setPagination({ ...pagination, current: data.info.page, total: 50, pageSize: data.info.results })

        });
    };

    return (
        <>
            <Table
                dataSource={data}
                pagination={pagination}
                loading={loading}
                onChange={handleTableChange}
            >
                <Column title="Mã lệnh" dataIndex="malenh" key="malenh" />
                <Column title="Mã CK" dataIndex="mack" key="mack" />

                <Column title="Mua/Bán" dataIndex="gender" key="gender" />
                <Column title="Đặt từ" dataIndex="email" key="email" />
                <Column title="Ngày" dataIndex="den-ngay" key="den-ngay" />
                <ColumnGroup title="Thông tin cổ phiếu">
                    <Column title="Khối lượng" dataIndex="khoi-luong" key="khoi-luong" />
                    <Column title="Giá" dataIndex="gia" key="gia" />
                    <Column title="Khối lượng khớp" dataIndex="khoi-luong-khop" key="khoi-luong-khop" />
                    <Column title="Giá khớp" dataIndex="gia-khop" key="gia-khop" />
                    <Column title="Giá trị khớp" dataIndex="gia-tri-khop" key="gia-tri-khop" />
                </ColumnGroup>
                <Column title="Trạng thái lệnh" dataIndex="trang-thai-lenh" key="trang-thai-lenh" />
            </Table>


        </>
    )
}

export default HistoryOrderPage
