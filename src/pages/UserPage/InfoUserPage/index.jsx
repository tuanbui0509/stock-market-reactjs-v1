import { Form, Input, InputNumber, Button, Row, Col } from 'antd';
import Layout, { Content } from 'antd/lib/layout/layout'
import React from 'react'
import './infoUser.css'
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

export default function InfoUserPage() {
    let user = JSON.parse(localStorage.getItem('user'))
    return (
        <div className='container' style={{ position: 'relative' }}>
            <Content style={{ backgroundColor: '#e6f7ff', margin: '100px auto', position: 'absolute' }}>
                <Row>
                    <Col span={6} offset={4}>
                        <Form {...layout} >
                            <Form.Item
                                className='label-info-user'
                                label="Họ"
                            >
                                <label className='info-user'>{user.ho}</label>
                            </Form.Item>
                            <Form.Item
                                className='label-info-user'
                                label="Tên"
                            >
                                <label className='info-user'>{user.ten}</label>
                            </Form.Item>
                            <Form.Item
                                className='label-info-user'
                                label="Nơi sinh">
                                <label className='info-user'>{user.noiSinh}</label>
                            </Form.Item>
                            <Form.Item
                                className='label-info-user'
                                label="Địa chỉ">
                                <label className='info-user'>{user.diaChi}</label>
                            </Form.Item>
                            <Form.Item
                                className='label-info-user'
                                label="Ngày sinh">
                                <label className='info-user'>{user.ngaySinh}</label>
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col span={6} offset={4}>
                        <Form {...layout} >
                            <Form.Item
                                className='label-info-user'
                                label="Giới tính">
                                <label className='info-user'>{user.phai ? 'Nam' : 'Nữ'}</label>
                            </Form.Item>
                            <Form.Item
                                className='label-info-user'
                                label="Email"
                            >
                                <label className='info-user'>{user.email}</label>
                            </Form.Item>
                            <Form.Item
                                className='label-info-user'
                                label="Số điện thoại"
                            >
                                <label className='info-user'>{user.sdt}</label>

                            </Form.Item>
                            <Form.Item
                                className='label-info-user'
                                label="CMND">
                                <label className='info-user'>{user.cmnd}</label>
                            </Form.Item>
                            <Form.Item
                                className='label-info-user'
                                label="Ngày cấp CMND">
                                <label className='info-user'>{user.ngayCapCmnd}</label>
                            </Form.Item>
                            <Form.Item
                                className='label-info-user'
                                label="Nơi cấp CMND">
                                <label className='info-user'>{user.noiCapCmmd}</label>
                            </Form.Item>

                        </Form>
                    </Col>
                </Row>
            </Content>
        </div>
    )
}
