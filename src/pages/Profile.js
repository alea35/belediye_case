import React from 'react'
import './Profile.css'
import { Button, Container } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
function Profile() {

    const {setUser,setToken,user} = useAuth()

    const handleLogoutClick  =() =>
    {
        setUser(false);
        setToken(false);
    }

  return (
    
        <div className='profile'>
            <h3>{user.firstName.charAt(0).toUpperCase()+ user.firstName.slice(1)} {user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)}</h3>
            <h5>{user.email} </h5>
            
            <Button className='mt-4' style={{width:'150px'}} onClick={handleLogoutClick}>Logout</Button>
        </div>
    
  )
}

export default Profile
