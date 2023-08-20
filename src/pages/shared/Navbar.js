import React from 'react'
import './Navbar.css'
import { NavLink } from 'react-router-dom'
import { Container } from 'react-bootstrap'

function Navbar() {
  return (
    
    
      <div className="navbar__container">
        <div className="header__left">
          <NavLink className='header__link brand' to='/'>Ana Sayfa</NavLink>
        </div>
        <div className="header__right">
            <NavLink className='header__link' to='/categorylist'> Kategori Listesi </NavLink>
            <NavLink className='header__link' to='/profile'> Profil </NavLink>
        </div>
      </div>
      
  )
}

export default Navbar
