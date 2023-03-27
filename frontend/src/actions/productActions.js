import { 
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
 } from '../constants/productConstants'
import axios from 'axios'

export const listProducts = () => async (dispatch) => {

    // const userInfo = JSON.parse(localStorage.getItem('userInfo'))

    try{
        dispatch({type: PRODUCT_LIST_REQUEST})

        const {data}  =  await axios.get('http://134.122.102.161:3006/api/products')

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })

    }catch (error){
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.detail 
                ? error.response.data.detail
                : error.message,
        })
    }
 }

 