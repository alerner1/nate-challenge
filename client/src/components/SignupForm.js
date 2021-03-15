import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const SignupForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [invalid, setInvalid] = useState(false)
  const [userExists, setUserExists] = useState(false)

  const history = useHistory()

  const signupHandler = (event, email, password) => {
    event.preventDefault()
    if (password.length < 8) {
      setInvalid(true)
    } else {
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
        .then(data => {
          if (data.error) {
            setUserExists(true)
          } else {
            fetch('http://localhost:9000/api/auth/signin', {
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
              .then(json => {
                localStorage.setItem("token", json.accessToken)
                history.push("/")
              })
          }
        })
    }
  }

  return(
    <Row>
      <Col xs={{ span: 4, offset: 4 }}>
        <h3 className="text-center m-3">Create Account</h3>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control name="email" onChange={e => setEmail(e.target.value)} value={email} type="email" placeholder="Enter email" />
            {userExists ?
              <Form.Text style={{color: 'red'}}>
                User already exists!
              </Form.Text>
            :
              null
            }
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control name="password" onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder="Enter password" />
            {invalid ? 
                <Form.Text style={{color: 'red'}}>
                  Password must be at least 8 characters!
                </Form.Text>
              :
                null
            }
          </Form.Group>
          <Button onClick={e => signupHandler(e, email, password)} type="submit">Create Account</Button>
          <div>
            <Button variant="link" onClick={() => history.push('/login')}>I already have an account</Button>
          </div>
        </Form>
      </Col>
    </Row>
  )
}

export default SignupForm