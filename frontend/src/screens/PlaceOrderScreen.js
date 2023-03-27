import React, { useState, useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import axios from 'axios'
import {orderCreate} from '../actions/orderActions'
import { useDispatch, useSelector } from 'react-redux'

function PlaceOrderScreen() {

    const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress'))
    const id = shippingAddress.productWant
    const [item, setItem] = useState([])
    const dispatch = useDispatch()
    const orderStatus = useSelector(state => state.orderCreate)
    const {error, loading, isPlaced} = orderStatus

    useEffect(() => {

        async function fetchItem() {
            const {data}  =  await axios.get(`http://134.122.102.161:3006/api/products/${id}`)
            setItem(data)
        }

        fetchItem()
    }, [])

    const product_id = id

    const placeOrder = (e) => {
        e.preventDefault()
        dispatch(orderCreate(product_id, shippingAddress.address, 
            shippingAddress.city, shippingAddress.postalCode, shippingAddress.country))
    }

    return (
        <div>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>

                            <p>
                                <strong>Shipping: </strong>
                                {shippingAddress.address},  {shippingAddress.city}
                                {'  '}
                                {shippingAddress.postalCode},
                                {'  '}
                                {shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                Paypal
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                                    <ListGroup variant='flush'>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>

                                                <Col>
                                                    {item.name}
                                                </Col>

                                                <Col md={4}>
                                                    ${item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    </ListGroup>
                        </ListGroup.Item>

                    </ListGroup>

                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Items:</Col>
                                    <Col>${item.price}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>$0.00</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>$0.00</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>${item.price}</Col>
                                </Row>
                            </ListGroup.Item>

                            {loading ? <ListGroup.Item>
                                        <Row>
                                            <Col>Order Status:</Col>
                                            <Col>Placing</Col>
                                        </Row>
                                </ListGroup.Item>
                                : error ? <ListGroup.Item>
                                <Row>
                                    <Col>Order Status:</Col>
                                    <Col>{error}</Col>
                                </Row>
                                </ListGroup.Item>  
                                : isPlaced? <ListGroup.Item>
                                <Row>
                                    <Col>Order Status:</Col>
                                    <Col>Placed</Col>
                                </Row>
                                </ListGroup.Item> 
                                : <ListGroup.Item>
                                <Row>
                                    <Col>Order Status:</Col>
                                    <Col>Not placed</Col>
                                </Row>
                                </ListGroup.Item> 
                            }

                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn-block'
                                    onClick={placeOrder}
                                >
                                    Place Order
                                </Button>
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default PlaceOrderScreen
