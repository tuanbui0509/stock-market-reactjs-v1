import { Button, DatePicker, Form, Input, Select, Typography } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import callApi from '../../../utils/apiCaller';
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
    const { register, setRegister } = useState({
        cmnd: "",
        diaChi: "",
        email: "@gmail.com",
        ho: "",
        ngayCapCMND: '',
        ngaySinh: '',
        noiCapCMMD: "",
        noiSinh: "",
        phai: "",
        sdt: "",
        ten: "",
    })
    const onFinish = (values) => {
        console.log('Success:', values);
        callApi("dangky", 'post', values).then(res => {
            let rec = res.data;
            console.log(rec);
            alert(rec.message);
            if (rec.status === 0) {
                history.replace("/")
            }
        })
        //dispatch(ActionLogin.UserLoginRequest(values.username, values.password, history));
    };


    const [form] = Form.useForm();

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
                                        name="ho"
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
                                        name="ten"
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
                                        name="ngaySinh"
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
                                        name="sdt"
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
                                        name="email"
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
                                        name="phai"
                                        label="Giới tính"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng chọn giới tính!',
                                            },
                                        ]}
                                    >
                                        <Select placeholder="Chọn giới tính của bạn">
                                            <Option value={true}>Nam</Option>
                                            <Option value={false}>Nữ</Option>
                                        </Select>
                                    </Form.Item>


                                </div>
                                <div className="form-child">

                                    <Form.Item
                                        name="noiSinh"
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
                                        name="diaChi"
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
                                        name="cmnd"
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
                                        name="noiCapCMMD"
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
                                        name="ngayCapCMND"
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


                                    <Form.Item {...tailFormItemLayout}>
                                        <Button type="primary" htmlType="submit">
                                            Tạo tài khoản
                                        </Button>
                                    </Form.Item>
                                    <Link to="/login" className='title-login'>Đăng nhập?</Link>

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
