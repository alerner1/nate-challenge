import React from 'react'
import LoginForm from '../components/LoginForm'

const LoginContainer = ({ loginHandler }) => {
  return(
    <LoginForm loginHandler={loginHandler} />
  )
}

export default LoginContainer