import React, { useState, useEffect } from "react"
import UrlForm from '../components/UrlForm'
import Result from '../components/Result'

const ProcessorContainer = () => {
  const [processedText, setProcessedText] = useState([])

  const token = localStorage.getItem("token")

  const handleSubmit = (event, urlPath) => {
    event.preventDefault()
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