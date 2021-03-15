import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

const UrlPath = ({ urlPath }) => {
  return(
    <ListGroup.Item action>{urlPath}</ListGroup.Item>
  )
}

export default UrlPath;