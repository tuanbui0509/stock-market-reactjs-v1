import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import * as ActionLogin from '../../../actions/User/index';
import { Form, Input, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, DatePicker, Typography } from 'antd';
import '../style.css';
// import './MainRegister.css';
const { Option } = Select;
const { Title } = Typography;
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};
const MainRegister = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    // const { register, setRegister } = useState({
    //     CMND: "",
    //     DiaChi: "",
    //     Email: "@gmail.com",
    //     Ho: "",
    //     NgayCapCMND: '',
    //     NgaySinh: '',
    //     NoiCapCMMD: "",
    //     NoiSinh: "",
    //     Phai: "",
    //     SDT: "",
    //     Ten: "",
    // })
    // const onFinish = (values) => {
    //     console.log('Success:', values);
    //     dispatch(ActionLogin.UserLoginRequest(values.username, values.password, history));
    // };


    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };
    return (
        <main className="main">
            <div className="container">
                <div className="content-login register">
                    <div className="form-login" >
                        <Title level={2} className="form-title">Đăng ký tài khoản</Title>
                        <Form
                            {...formItemLayout}
                            form={form}
                            name="register"
                            onFinish={onFinish}
                            initialValues={{

                            }}
                            scrollToFirstError

                        >
                            <div className='form-register'>
                                <div className="form-child">
                                    <Form.Item
                                        name="Ho"
                                        label="Họ"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập Họ!',
                                                whitespace: true,
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        name="Ten"
                                        label="Tên"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập Tên!',
                                                whitespace: true,
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item style={{ display: 'flex', justifyContent: 'flex-end' }}
                                        name="NgaySinh"
                                        label="Ngày sinh"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập số gày sinh!',
                                            },
                                        ]}
                                    >
                                        <DatePicker label="Ngày sinh" placeholder="Chọn ngày sinh" />
                                    </Form.Item>
                                    <Form.Item
                                        name="SDT"
                                        label="Số điện thoại"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập số điện thoại!',
                                            },
                                        ]}
                                    >
                                        <Input
                                            // addonBefore={prefixSelector}
                                            style={{
                                                width: '100%',
                                            }}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="Email"
                                        label="E-mail"
                                        rules={[
                                            {
                                                type: 'email',
                                                message: 'dữ liệu không phải E-mail!',
                                            },
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập E-mail!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        name="Phai"
                                        label="Giới tính"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng chọn giới tính!',
                                            },
                                        ]}
                                    >
                                        <Select placeholder="Chọn giới tính của bạn">
                                            <Option value="Nam">Nam</Option>
                                            <Option value="Nu">Nữ</Option>
                                            <Option value="Khac">Khác</Option>
                                        </Select>
                                    </Form.Item>


                                </div>
                                <div className="form-child">

                                    <Form.Item
                                        name="NoiSinh"
                                        label="Nơi sinh"
                                        tooltip="Quê quán nơi sinh ra của bạn"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập nơi sinh!',
                                                whitespace: true,
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        name="DiaChi"
                                        label="Địa chỉ"
                                        tooltip="Nơi tạm trú của bạn hiện tại"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập địa chỉ!',
                                                whitespace: true,
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        name="CMND"
                                        label="CMND"
                                        tooltip="CMND hoặc Căn cước công dân (nếu có)"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập CMND!',
                                                whitespace: true,
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        name="NoiCapCMMD"
                                        label="Nơi cấp CMND"
                                        // tooltip="Căn cước công dân hoặc CMND"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập nơi cấp CMND!',
                                                whitespace: true,
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}
                                        name="NgayCapCMND"
                                        label="Ngày cấp CMND"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập số ngày cấp CMND!',
                                            },
                                        ]}
                                    >
                                        <DatePicker placeholder="Ngày cấp CMND" />
                                    </Form.Item>

                                    {/* <Form.Item
                                        name="agreement"
                                        valuePropName="checked"
                                        rules={[
                                            {
                                                validator: (_, value) =>
                                                    value ? Promise.resolve() : Promise.reject(new Error('Bạn nên chấp nhận điều khoản')),
                                            },
                                        ]}
                                        {...tailFormItemLayout}
                                    >
                                        <Checkbox>
                                            Tôi đã đọc <a href="">điều khoản đăng ký</a>
                                        </Checkbox>
                                    </Form.Item> */}
                                    <Form.Item {...tailFormItemLayout}>
                                        <Button type="primary" htmlType="submit">
                                            Tạo tài khoản
                                        </Button>
                                    </Form.Item>

                                </div>
                            </div>


                        </Form>
                    </div>
                </div>
            </div>
        </main>

    );
}

export default MainRegister;
