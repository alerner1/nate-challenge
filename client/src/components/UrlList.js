import React, { useEffect, useState } from 'react'
import UrlPath from './UrlPath';
import ListGroup from 'react-bootstrap/ListGroup'
import {v4 as uuidv4} from 'uuid'

const UrlList = () => {
  const [urlHist, setUrlHist] = useState([])

  useEffect(() => {
    const token = localStorage.getItem("token")
    fetch('http://localhost:9000/api/user/urls', {
      headers: {
        'x-access-token': token
      }
    })
      .then(res => res.json())
      .then(data => {
        setUrlHist(data.urls)
      })
  }, [])

  const mapUrls = () => {
    return urlHist.map(urlObj => {
      return <UrlPath key={uuidv4()} urlPath={urlObj.urlPath} />
    })
  }

  return(
    <ListGroup>
      {urlHist.length > 0 ? mapUrls() : 'Loading...'}
    </ListGroup>
  )
}

export default UrlList