import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const LoginForm = ({ loginHandler }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  return(
    <Row>
      <Col xs={{ span: 4, offset: 4 }}>
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
          <div>
          <Button variant="link" onClick={() => history.push('/signup')}>New Here? Create Account</Button>
          </div>
        </Form>
      </Col>
    </Row>
  )
}

export default LoginForm