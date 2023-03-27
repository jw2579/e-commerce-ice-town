import React, { useState, useEffect }from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, ListGroupItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import axios from 'axios'

function ProductScreen() {

  const {id} = useParams()
  const [product, setProduct] = useState([])

  useEffect(() => {

    async function fetchProduct() {
      const {data}  =  await axios.get(`http://134.122.102.161:3006/api/products/${id}`)
      setProduct(data)
    }

    fetchProduct()
  }, [])

  return (
    <div>
      <Link to='/' className="btn btn-light my-3">Go Back</Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid/>
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>

            <ListGroup.Item>
              {product.numReviews} reviews
            </ListGroup.Item>

            <ListGroup.Item>
              Price: ${product.price}
            </ListGroup.Item>

            <ListGroup.Item>
              description: ${product.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0? 'In Stock' : 'Out of Stock'}
                  </Col>
                </Row>
              </ListGroup.Item>

              
              <ListGroup.Item>
                {product.countInStock!==0 
                  ?<Link to={`/shipping?id=${product._id}`}>Buy this</Link>
                    // <Button className='btn-block'  type='button'>
                    //   Buy this
                    // </Button>
                  
                  :<Button className='btn-block' disabled type='button'>
                    Buy this
                  </Button>
                }
                  
              </ListGroup.Item>
              

            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default ProductScreen
