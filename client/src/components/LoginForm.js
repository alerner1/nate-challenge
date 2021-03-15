import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const LoginForm = ({ loginHandler }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const history = useHistory()

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
      <Button onClick={(e) => loginHandler(e, email, password)} type="submit">Log In</Button>
      <p>New here? <Button onClick={() => history.push('/signup')}>Create Account</Button></p>
    </Form>
  )
}

export default LoginForm