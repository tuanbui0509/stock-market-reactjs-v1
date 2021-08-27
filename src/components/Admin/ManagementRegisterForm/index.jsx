import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import RegisterFormList from './RegisterFormList'
import RegisterFormItem from './RegisterFormItem'
import * as types from '../../../constants/Admin/ActionType';
import apiCaller from '../../../utils/apiCaller'
import callApi from '../../../utils/apiCaller';
import { openNotificationSuccess } from 'components/Notification';
import { openNotificationError } from 'components/Notification';


export default function ManagementRegisterForm() {
    const listFormRegister = useSelector(state => state.RegisterForm);
    const dispatch = useDispatch();
    useEffect(() => {
        const FetchListRegisterForm = async () => {
            try {
                const res = await apiCaller('DonDangKy', 'GET', null);
                dispatch({ type: types.FETCH_LIST_REGISTER_FORM, payload: res.data });
            } catch (err) {

            }
        }

        FetchListRegisterForm()
    }, [])

    const handleConfirmChange = async (id) => {
        try {
            const res = await callApi(`DonDangKy/${id}`, 'PUT')
            console.log(res);
            if(res.data.status == 0){
                openNotificationSuccess('Thành công', res.data.message, 2)
                dispatch({ type: types.CONFIRM_REGISTER_FORM, id: id });
            }
            else{
                openNotificationError('Thất bại', res.data.message, 2);
            }
        } catch (err) {
            openNotificationError('Thất bại', 'Lỗi dữ liệu trong máy chủ', 2);
        }
    }
    const handleDeleteChange = async (id) => {
        try {
            const res = await callApi(`DonDangKy/${id}`, 'DELETE')
            console.log(res);
            if(res.data.status == 0){
                openNotificationSuccess('Thành công', res.data.message, 2)
                dispatch({ type: types.DELETE_REGISTER_FORM, id: id });
            }
            else{
                openNotificationError('Thất bại', res.data.message, 2);
            }
        } catch (err) {
            openNotificationError('Thất bại', 'Lỗi dữ liệu trong máy chủ', 2);
        }
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
