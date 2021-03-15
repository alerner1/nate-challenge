import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

const NavMenu = ({ user, logoutHandler }) => {
  const history = useHistory()

  const viewHistory = (event) => {
    event.preventDefault()
    history.push('/history')
  }

  return(
    <Navbar bg="light" expand="lg">
      <Nav>
        {user ? 
        <>
          <Nav.Link onClick={e => viewHistory(e)} href="#urls">My History</Nav.Link>
          <Nav.Link onClick={e => logoutHandler(e)} href="#logout">Logout</Nav.Link>
        </>
        : null
        }
      </Nav>
    </Navbar>
  )
}

export default NavMenu