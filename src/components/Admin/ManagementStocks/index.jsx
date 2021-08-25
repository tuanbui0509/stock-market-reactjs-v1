import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../../../constants/Admin/ActionType';
import apiCaller from '../../../utils/apiCaller';
import StockItem from './StockItem';
import StockList from './StockList';


export default function ManagementStocks() {
    const listStock = useSelector(state => state.ManagementStock);
    const dispatch = useDispatch();
    useEffect(() => {
        const FetchListStock = async () => {
            try {
                const res = await apiCaller('CoPhieu', 'GET', null);
                dispatch({ type: types.FETCH_LIST_STOCK, payload: res.data });
            } catch (err) {

            }
        }

        FetchListStock()
    }, [])


    const showListStock = () => {
        let result = null
        if (listStock) {
            result = listStock.map((order, index) => {
                return (
                    <StockItem
                        key={index}
                        stock={order}
                        index={index}
                    />
                )
            })
        }
        return result
    }
    return (
        <>
            <StockList >{showListStock()}</StockList>
        </>
    )
}
