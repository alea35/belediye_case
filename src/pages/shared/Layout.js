import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

import { Container } from 'react-bootstrap'

function Layout() {
  return (
    <div style={{textAlign:'center',height: '100vh'}}>
      <Container>
        <Navbar/>
        
        <Outlet/>
      </Container>
    </div>
  )
}

export default Layout
