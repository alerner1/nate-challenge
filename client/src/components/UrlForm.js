import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const UrlForm = ({ handleSubmit }) => {
  const [urlPath, setUrlPath] = useState('')

  return(
    <Row className="m-3">
      <Col xs={{ span: 6, offset: 4 }}>
        <Form inline>
          <Form.Group controlId="urlForm.urlPathInput">
            <Form.Label>URL: </Form.Label>
            <Form.Control onChange={e => setUrlPath(e.target.value)} placeholder="url to be processed" value={urlPath} />
          </Form.Group>
          <Button type="submit" onClick={e => {
              setUrlPath('')
              handleSubmit(e, urlPath)
            }}>
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  )
}

export default UrlForm