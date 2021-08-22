import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import RegisterFormList from './RegisterFormList'
import RegisterFormItem from './RegisterFormItem'
import * as action from '../../../actions/Admin/RegisterForm/index';
import apiCaller from '../../../utils/apiCaller'
import callApi from '../../../utils/apiCaller';
import { openNotificationSuccess } from 'components/Notification';
import { openNotificationError } from 'components/Notification';


export default function ViewRegisterForm() {
    const listFormRegister = useSelector(state => state.RegisterForm);
    const dispatch = useDispatch();
    useEffect(() => {
        const FetchListRegisterForm = async () => {
            try {
                const res = await apiCaller('DonDangKy', 'GET', null);
                console.log(res.data);
                dispatch({ type: 'FETCH_LIST_REGISTER_FORM', listFormRegister: res.data });
            } catch (err) {

            }
        }

        FetchListRegisterForm()
    }, [])

    const handleConfirmChange = async (id) => {
        try {
            const res = await callApi(`DonDangKy/${id}`, 'PUT', null)
            console.log(res);
            openNotificationSuccess('Thành công', 'Xác nhận đơn thành công', 2)
        } catch (err) {
            openNotificationError('Thất bại', 'Lỗi dữ liệu trong máy chủ', 2);
        }
    }
    const handleDeleteChange = (id) => {
        console.log(id);
    }

    const showListFormRegister = () => {
        let result = null
        if (listFormRegister) {
            result = listFormRegister.map((order, index) => {
                return (
                    <RegisterFormItem
                        key={index}
                        formRegister={order}
                        index={index}
                        handleConfirmChange={handleConfirmChange}
                        handleDeleteChange={handleDeleteChange}
                    />
                )
            })
        }
        return result
    }
    return (
        <>
            <RegisterFormList >{showListFormRegister()}</RegisterFormList>
        </>
    )
}
