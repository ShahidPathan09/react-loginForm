import React from 'react';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import './header.css'

function Header() {
  const user = JSON.parse(localStorage.getItem('user-info'))
  const history = useHistory()

  function logout() {
    localStorage.clear()
    history.push('./login')
  }

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Link className='navbar navbar-brand' to="/">LOGO</Link>
          <Nav className="me-auto nav_bar">
            {
              localStorage.getItem('user-info') ?
                <>
                  <Link to="/">Home</Link>
                  <Link to="/about">About</Link>
                  <Link to='/new-entry'>New User</Link>
                  <Link to='/search'>Search data</Link>
                </>
                :
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/register">Register</Link>
                </>
            }
          </Nav>
          {
            localStorage.getItem('user-info') ?
              <Nav>
                <NavDropdown title={user && user.username}>
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              :
              null
          }
        </Container>
      </Navbar>
    </div>
  )
}

export default Header