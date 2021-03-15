import React, { useState, useEffect } from "react"
import qs from 'query-string';
import UrlForm from '../components/UrlForm'
import Result from '../components/Result'
import { useParams } from 'react-router-dom';

const ProcessorContainer = () => {
  const [processedText, setProcessedText] = useState([])
  let [urlPath, setUrlPath] = useState('')
  let { slug } = useParams();

  const token = localStorage.getItem("token")
  
  useEffect(() => {
    if (slug) {
      const encodedPath = slug.split('=')[1]
      const decodedPath = decodeURIComponent(encodedPath)
      handleSubmit(null, decodedPath)
    }
  }, [slug])



  const handleSubmit = (event, urlPath) => {
    if (event) {
      event.preventDefault()
    }
    setUrlPath(urlPath)
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

        // TO AVOID CALLSTACK SIZE EXCEEDED ERROR WHEN ARRAY IS EXTREMELY LARGE
        // turn into nested array where each element is an array of the next 1000 results
        // a little unwieldy, but it works
        const largeData = []
        let i = 0
        while (data['result'].length > i) {
          largeData.push(data['result'].slice(i, i + 1000))
          i += 1000
        }
        setProcessedText(largeData)
      })
  }

  return(
    <>
      <h3 className="text-center m-3">Check Frequency of Words in DOM</h3>
      <UrlForm handleSubmit={handleSubmit} />
      <Result processedText={processedText} urlPath={urlPath} /> 
    </>
  )
}

export default ProcessorContainer