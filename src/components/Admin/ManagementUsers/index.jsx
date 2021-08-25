import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import UserList from './UserList'
import UserItem from './UserItem'
import * as types from '../../../constants/Admin/ActionType';
import apiCaller from '../../../utils/apiCaller'
import callApi from '../../../utils/apiCaller';
import { openNotificationSuccess } from 'components/Notification';
import { openNotificationError } from 'components/Notification';


export default function ManagementUsers() {
    const listUser = useSelector(state => state.ManagementUser);
    const dispatch = useDispatch();
    useEffect(() => {
        const FetchListUser = async () => {
            try {
                const res = await apiCaller('NhaDauTu', 'GET', null);
                dispatch({ type: types.FETCH_LIST_USER, payload: res.data });
            } catch (err) {
            }
        }

        FetchListUser()
    }, [])



    const showListUser = () => {
        let result = null
        if (listUser) {
            result = listUser.map((order, index) => {
                return (
                    <UserItem
                        key={index}
                        user={order}
                        index={index}
                    />
                )
            })
        }
        return result
    }
    return (
        <>
            <UserList >{showListUser()}</UserList>
        </>
    )
}
