import React from 'react';
import { useHistory } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';

const UrlPath = ({ urlPath }) => {
  const history = useHistory();

  const processUrl = (event) => {
    event.preventDefault();
    history.push(`/processor/url=${encodeURIComponent(urlPath)}`)
  }

  return(
    <ListGroup.Item action onClick={e => processUrl(e)}>{urlPath}</ListGroup.Item>
  )
}

export default UrlPath;