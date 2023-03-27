import axios from 'axios'
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
} from '../constants/orderConstants'

export const orderCreate = (product_id, address, city, postalCode, country) => async (dispatch) => {
    
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
        })

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post(
            'http://134.122.102.161:3006/api/orders/create/',
            { 'product_id': product_id, 'address': address, 
            'city': city, 'postalCode': postalCode, 'country': country },
            config
        )

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

