import React, { useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import {listProducts} from '../actions/productActions'
import Product from '../components/Product'


function HomeScreen() {

  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const {error, loading, products} = productList

  useEffect(() => {
    dispatch(listProducts())
    
  }, [dispatch])

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo } = userLogin
  const navigate = useNavigate()
  useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        }
  }, [userInfo])


  return (
    <div>
      <h1>Latest Products</h1>

      {loading ? <h2>Loading...</h2>
        : error ? <h3>{error}</h3>
          : <Row>
              {products.map(product => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                      <Product product={product}/>
                  </Col>
              ))}
            </Row>
      }

      
    </div>
  )
}

export default HomeScreen
