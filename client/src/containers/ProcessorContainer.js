import React, { useState, useEffect } from "react"
import qs from 'query-string';
import UrlForm from '../components/UrlForm'
import Result from '../components/Result'
import { useParams } from 'react-router-dom';

const ProcessorContainer = () => {
  const [processedText, setProcessedText] = useState([])
  let { slug } = useParams();

  const token = localStorage.getItem("token")

  // const parsed = qs.parse(props.location.search)
  
  useEffect(() => {
    let urlPath = slug.split('=')[1]
    urlPath = decodeURIComponent(urlPath)
    handleSubmit(null, urlPath)
  }, [])

  const handleSubmit = (event, urlPath) => {
    if (event) {
      event.preventDefault()
    }
    fetch("http://localhost:9000/api/url/create", {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'urlPath': urlPath
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log('fetching')
        setProcessedText(data['result'])
      })
  }

  return(
    <>
      <UrlForm handleSubmit={handleSubmit} />
      {processedText.length > 0 ? 
      <Result processedText={processedText} /> 
      : null}
    </>
  )
}

export default ProcessorContainer