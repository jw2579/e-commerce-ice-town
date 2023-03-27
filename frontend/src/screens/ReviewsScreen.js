import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'

function ReviewsScreen() {
    

    const [reviews, setReviews] = useState([])
    useEffect(() => {

        async function fetchReviews() {
          const {data}  =  await axios.get(`http://134.122.102.161:3006/api/reviews/`)
          setReviews(data)
        }
    
        fetchReviews()
      }, [])

    return (
        <div>
            <Row>
                <Col>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>The Colorful Winter</h2>

                            <p>
                                Explore the world of skating now!
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Recent News</h2>
                                    <ListGroup variant='flush'>
                                        {reviews.map(item => (
                                            <ListGroup.Item key={item._id}>
                                                <Row>
                                                    <Col md={2}>
                                                        <Image src={item.image} alt={item.name} fluid rounded />
                                                    </Col>

                                                    <Col md={10}>
                                                        <Row><p> </p></Row>
                                                        <Row>
                                                            <Link to={`/reviews/${item._id}`}>{item.name}</Link>
                                                        </Row>
                                                        <Row><p> </p></Row>
                                                        <Row>
                                                            <p> </p>{item.comment}
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                        </ListGroup.Item>

                    </ListGroup>

                </Col>
            </Row>
        </div>
    )
}

export default ReviewsScreen