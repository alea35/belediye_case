import React, { useState } from 'react'
import './shared/forms.css'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { register } from '../services';
import { alertException } from '../app/utils/alerts';
function Register() {
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const {setUser,setToken} = useAuth()
    const navigate = useNavigate();
    

    const navigateLoginClicked=()=>
    {
        navigate('/login')
    }


    const validateStates = ()=>
    {
      if(!firstName)
      {
        alert('lütfen isim giriniz');return false;
      }
  
      if(!lastName)
      {
        alert('lütfen soyisim giriniz');return false;
      }
  
      if(!email)
      {
        alert('lütfen email giriniz');return false;
      }
  
      if(!password)
      {
        alert('lütfen şifre giriniz');return false;
      }
      return true;
    }
  const handleSubmit=(e)=>
  {
    e.preventDefault();
    
    if(validateStates())
    {

      
      const userDto = {
        firstName,
        lastName,
        email,
        password
      }
      
      register(userDto)
      .then((res)=>
      {
        if(res.isOk)
        {

          setUser(res.user);
          setToken(res.token);
          navigate('/')
        }
        else{
          alertException(res.errors);
        }
      })
      .catch(err => console.log('handleSubmit register',err));
    }
      
  }


  return (
    <div className='form__container'>
      <h2>Kayıt Ol</h2>
       <form action='post'>
         <input value={firstName} onChange={e => setFirstName(e.target.value)} type='text' placeholder='İsim'/>
        <input value={lastName} onChange={e => setLastName(e.target.value)} type='text' placeholder='Soyisim'/>
        <input value={email} onChange={e => setEmail(e.target.value)} type='email' placeholder='Email'/>
        <input value={password} onChange={e => setPassword(e.target.value)} type='password' placeholder='Şifre'/>
        <Button type='submit'  onClick={handleSubmit}  >Kaydet</Button>
      </form>

        <Button className='mt-3 border-none' onClick={navigateLoginClicked} variant='outline-dark'>Giriş Yap</Button>
    </div>
  )
}

export default Register
