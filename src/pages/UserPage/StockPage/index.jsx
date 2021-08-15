import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import reqwest from 'reqwest';
function StockPage() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState(0);
    const searchInput = useRef();
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
            console.log(data.results);
            setLoading(false)
            setData(data.results)
            setPagination({ ...pagination, current: data.info.page, total: 50, pageSize: data.info.results })

        });
    };
    let getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={searchInput}
                    placeholder={`Tìm kiếm ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}>
                        Reset
                    </Button>

                </Space>

            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    });

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0])
        setSearchedColumn(dataIndex)
    };

    const handleReset = clearFilters => {
        clearFilters()
        setSearchText('')
    };
    const columns = [
        {
            title: 'Mã CK',
            dataIndex: 'nat',
            key: 'nat',
            width: 120,
            fixed: 'center',
            ...getColumnSearchProps('nat'),
        },
        {
            title: 'Tổng',
            dataIndex: 'id',
            key: 'id',
            width: 200,
            fixed: 'center',
        },
        {
            title: 'Khả dụng',
            dataIndex: 'phone',
            key: 'phone',
            width: 200,
            fixed: 'center',
        },
        {
            title: 'Chờ về',
            children: [
                {
                    title: 'T0',
                    dataIndex: 'T0',
                    key: 'T0',
                    width: 150,

                },
                {
                    title: 'T1',
                    dataIndex: 'T1',
                    key: 'T1',
                    width: 150,
                },
                {
                    title: 'T2',
                    dataIndex: 'T2',
                    key: 'T2',
                    width: 150,
                }
            ],
        },
        {
            title: 'Giá TT',
            dataIndex: 'mack',
            key: 'mack',
            width: 200,
            fixed: 'center',
        },
        {
            title: 'Giá trị TT',
            dataIndex: 'email',
            key: 'email',
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
                onChange={handleTableChange}
                columns={columns}
            />
        </>
    )
}

export default StockPage