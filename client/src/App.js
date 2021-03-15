import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from "react"
import { Route, Switch, useHistory, useParams } from 'react-router-dom'
import ProcessorContainer from './containers/ProcessorContainer'
import LoginContainer from './containers/LoginContainer'
import SignupContainer from './containers/SignupContainer'
import HistoryContainer from './containers/HistoryContainer'
import NavMenu from './components/NavMenu'    

function App() {
  const [user, setUser] = useState(null)
  const [invalid, setInvalid] = useState(false)
  const [userExists, setUserExists] = useState(false)
  const history = useHistory()

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (!token) {
      history.push("/login")
    } else {
      getUser(token)
    }
  }, [history])

  const getUser = (token) => {
    fetch("http://localhost:9000/api/auth/getuser", {
        headers: {
          'x-access-token': token
        }
      })
      .then(res => res.json())
      .then(userInfo => setUser(userInfo))
  }

  const signupHandler = (event, email, password) => {
    event.preventDefault()
    if (password.length < 8) {
      setInvalid(true)
    } else {
      setInvalid(false)
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
            setUserExists(false)
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
                getUser(json.accessToken)
                history.push("/")
              })
          }
        })
    }
  }

  const loginHandler = (event, email, password) => {
    event.preventDefault()
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
        if (json.accessToken) {
          localStorage.setItem("token", json.accessToken)
          getUser(json.accessToken)
          history.push('/')
        } else {
          alert('something went wrong')
        }
      })
  }

  const logoutHandler = (event) => {
    event.preventDefault()
    localStorage.removeItem("token")
    setUser(null)
    history.push('/login')
  }

  return (
    <>
      <NavMenu logoutHandler={logoutHandler} user={user} />
      <Switch>
        <Route exact path="/login" render={() => <LoginContainer loginHandler={loginHandler} />} />
        <Route exact path="/signup" render={() => <SignupContainer signupHandler={signupHandler} invalid={invalid} userExists={userExists} />} />
        <Route exact path="/history" render={() => <HistoryContainer />} />
        <Route path="/processor/:slug+" component={ProcessorContainer} />
        <Route path="/" render={routerProps => <ProcessorContainer {...routerProps} />} />
      </Switch>
    </>
  );
}

export default App;
