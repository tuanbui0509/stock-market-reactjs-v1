import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import reqwest from 'reqwest';
const { Column, ColumnGroup } = Table;
function StockPage() {
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
                <Column title="Mã CK" dataIndex="mack" key="mack" />
                <Column title="Tổng" dataIndex="id" key="id" />
                <Column title="Khả dụng" dataIndex="phone" key="phone" />
                <ColumnGroup title="Chờ về">
                    <Column title="T0" dataIndex="" key="" />
                    <Column title="T1" dataIndex="" key="" />
                    <Column title="T2" dataIndex="" key="" />
                </ColumnGroup>
                <Column title="Giá TT" dataIndex="" key="" />
                <Column title="Giá trị TT" dataIndex="" key="" />

            </Table>
        </>
    )
}

export default StockPage
