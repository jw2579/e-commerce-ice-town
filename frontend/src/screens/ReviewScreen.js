import React, { useState, useEffect }from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, ListGroupItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import axios from 'axios'

function ReviewScreen() {

  const {id} = useParams()
  const [review, setReview] = useState([])

  useEffect(() => {

    async function fetchReview() {
      const {data}  =  await axios.get(`http://134.122.102.161:3006/api/reviews/${id}`)
      setReview(data)
    }

    fetchReview()
  }, [])

  return (
    <div>
      <Link to='/reviews' className="btn btn-light my-3">Go Back</Link>
      <Row>
        <Col md={6}>
          <Image src={review.image} alt={review.name} fluid/>
        </Col>
        <Col md={6}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{review.name}</h3>
            </ListGroup.Item>

            <ListGroup.Item>
              {review.details}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </div>
  )
}

export default ReviewScreen
