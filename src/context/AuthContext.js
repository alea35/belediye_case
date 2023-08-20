import { createContext, useContext, useEffect, useState } from 'react'

export const Context = createContext()

export const AuthProvider = ({children}) => 
{
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('user') ||false));
    const [token,setToken] = useState(localStorage.getItem('token') ||false);

    useEffect(()=>{
        localStorage.setItem('user',JSON.stringify(user));
    },[user])

    useEffect(()=>{
        localStorage.setItem('token',token);
    },[token])
    const data = 
    {
        user,
        setUser,token,setToken
    }
    return (
        <Context.Provider value={data}>
        {children}
        </Context.Provider>
    )
}


export const useAuth = () => useContext(Context);
