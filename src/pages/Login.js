import React, { useState } from 'react'
import './shared/forms.css'
import { login } from '../services';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { alertException, alertWarning } from '../app/utils/alerts';
function Login() {
  
  const [password,setPassword] = useState("");
  const [email,setEmail] = useState("");
  const {setUser,setToken} = useAuth()
  const navigate = useNavigate();
  
  function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }

  const validateStates = ()=>
  {
    if(!email)
    {
      alert('lütfen email giriniz');return false;
    }

    

    if(!password)
    {
      alert('lütfen şifre giriniz');return false;
    }
    if(!isValidEmail(email))
    {
      alert('lütfen mail adresi girdiğinizden emin olunuz');return false;
    }


    return true;
  }

  const loginToApp=(e)=>
  {
    e.preventDefault();
    
    if(validateStates())
    {
      
      login(email,password).then((res)=>
      {
        if(res.isOk)
        {

          setUser(res.user);
          setToken(res.token);
          navigate('/')
        }
        else{
          alertException(res.errors)
        }
      })
      .catch((err) => console.log('login error',err));
    }
  }

  const register=()=>
  {
    navigate('/register');
  }

  return (
    <div className='form__container'>
      <h2>Giriş Yap</h2>
       <form>
        <input value={email} onChange={e => setEmail(e.target.value)} type='email' placeholder='Email'/>
        <input value={password} onChange={e => setPassword(e.target.value)} type='password' placeholder='Şifre'/>
        <Button type='submit' onClick={loginToApp}>Giriş Yap</Button>
      </form>

      <Button onClick={register} className='mt-3 border-none' variant='outline-dark'>Kayıt Ol</Button>
    </div>
  )
}

export default Login
