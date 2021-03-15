import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const SignupForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const history = useHistory()

  const signupHandler = (event, email, password) => {
    event.preventDefault()
    fetch('http://localhost:9000/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email": email,
        "password": password
      })
    })
      .then(res => res.json())
      .then(
        fetch('http://localhost:9000/api/auth/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "email": email,
            "password": password
        })
          .then(res => res.json())
          .then(json => localStorage.setItem(json.accessToken))
      }))
  }

  return(
    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control name="email" onChange={e => setEmail(e.target.value)} value={email} type="email" placeholder="Enter email" />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control name="password" onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder="Enter password" />
      </Form.Group>
      <Button onClick={e => signupHandler(e, email, password)} type="submit">Create Account</Button>
      <p>Already have an account? <Button onClick={() => history.push('/login')}>Login</Button></p>
    </Form>
  )
}

export default SignupForm