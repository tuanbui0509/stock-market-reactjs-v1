import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import reqwest from 'reqwest';



function HistoryPurchasedPage() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
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

    let getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
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
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex]
                    .toString()
                    .toLowerCase()
                    .includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(
                    () => searchInput && searchInput.current && searchInput.current.select(), 100
                )
            }
        },
        render: text =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
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
            title: 'Mã lệnh',
            dataIndex: 'nat',
            key: 'nat',
            width: 120,
            fixed: 'center',
            ...getColumnSearchProps('nat'),
        },
        {
            title: 'Mã CK',
            dataIndex: 'id',
            key: 'id',
            width: 200,
            fixed: 'center',
        },
        {
            title: 'Mua/Bán',
            dataIndex: 'phone',
            key: 'phone',
            width: 200,
            fixed: 'center',
        },
        {
            title: 'Đặt từ',
            dataIndex: 'mack',
            key: 'mack',
            width: 200,
            fixed: 'center',
        },
        {
            title: 'Ngày',
            dataIndex: '',
            key: '',
            width: 100,
            fixed: 'center',
        },
        {
            title: 'Thông tin cổ phiếu',
            children: [
                {
                    title: 'Khối lượng',
                    dataIndex: '',
                    key: '',
                    width: 150,

                },
                {
                    title: 'Giá',
                    dataIndex: '',
                    key: '',
                    width: 150,
                },
                {
                    title: 'Khối lượng khớp',
                    dataIndex: '',
                    key: '',
                    width: 150,
                }
                ,
                {
                    title: 'Giá khớp',
                    dataIndex: '',
                    key: '',
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
            dataIndex: 'mack',
            key: 'mack',
            width: 200,
            fixed: 'center',
        }
    ]

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

export default HistoryPurchasedPage
