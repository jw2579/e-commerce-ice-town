import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {productListReducer} from './reducers/productReducers'
import  {userLoginReducer, userRegisterReducer}  from './reducers/userReducers'
import {orderCreateReducer} from './reducers/orderReducers'


const reducer = combineReducers({
    productList: productListReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    orderCreate: orderCreateReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo')) 
    : null


const initialState = {
    userLogin: {userInfo: userInfoFromStorage}
}

const midlleware = [thunk]

const store = createStore(reducer, initialState, 
    composeWithDevTools(applyMiddleware(...midlleware)))

export default store 