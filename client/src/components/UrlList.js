import React, { useEffect } from 'react'

const UrlList = () => {
  useEffect(() => {
    const token = localStorage.getItem("token")
    fetch('http://localhost:9000/api/user/urls', {
      headers: {
        'x-access-token': token
      }
    })
      .then(res => res.json())
      .then(data => console.log(data))
  }, [])

  return(
    <p>i had a little linky</p>
  )
}

export default UrlList