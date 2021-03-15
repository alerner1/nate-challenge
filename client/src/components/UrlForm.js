import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const UrlForm = ({ handleSubmit }) => {
  const [urlPath, setUrlPath] = useState('')
  
  return(
    <Form inline>
      <Form.Group controlId="urlForm.urlPathInput">
        <Form.Label>URL:</Form.Label>
        <Form.Control onChange={e => setUrlPath(e.target.value)} placeholder="url to be processed" value={urlPath} />
      </Form.Group>
      <Button type="submit" onClick={e => handleSubmit(e, urlPath)}>
        Submit
      </Button>
    </Form>
  )
}

export default UrlForm