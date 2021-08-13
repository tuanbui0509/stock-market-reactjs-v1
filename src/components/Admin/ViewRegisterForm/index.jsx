import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import RegisterFormList from './RegisterFormList'
import RegisterFormItem from './RegisterFormItem'
import * as action from '../../../actions/Admin/RegisterForm/index';
import apiCaller from '../../../utils/apiCaller'


export default function ViewRegisterForm() {
    const listFormRegister = useSelector(state => state.RegisterForm);
    const dispatch = useDispatch();
    // dispatch(action.FetchListRegisterFormRequest);
    useEffect(() => {
        const FetchListRegisterForm = async () => {
            try {
                const res = await apiCaller('DonDangKy', 'GET', null);
                console.log(res.data.data);
                dispatch({ type: 'FETCH_LIST_REGISTER_FORM', listFormRegister: res.data.data });
            } catch (err) {

            }
        }

        FetchListRegisterForm()
    }, [])
    const showListFormRegister = () => {
        let result = null
        if (listFormRegister) {
            result = listFormRegister.map((order, index) => {
                return (
                    <RegisterFormItem
                        key={index}
                        formRegister={order}
                        index={index}
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
