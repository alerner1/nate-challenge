import React from 'react'
import SignupForm from '../components/SignupForm'

const SignupContainer = ({ signupHandler, invalid, userExists }) => {
  return(
    <SignupForm signupHandler={signupHandler} invalid={invalid} userExists={userExists} />
  )
}

export default SignupContainer