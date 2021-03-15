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

  const goToProcessor = (event) => {
    event.preventDefault();
    history.push('/processor')
  }

  return(
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>
        Nate Challenge!
      </Navbar.Brand>
      <Nav>
        {user ? 
        <>
          <Nav.Link onClick={e => goToProcessor(e)}>Process URL</Nav.Link>
          <Nav.Link onClick={e => viewHistory(e)}>My History</Nav.Link>
          <Nav.Link onClick={e => logoutHandler(e)}>Logout</Nav.Link>
        </>
        : null
        }
      </Nav>
    </Navbar>
  )
}

export default NavMenu