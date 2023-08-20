import React from 'react';
import {Routes,Route} from "react-router-dom"; 
import './App.css';

import Home from './pages/Home';
import Layout from './pages/shared/Layout';
import Login from './pages/Login'
import PrivateRoute from './components/PrivateRoute';
import ProductCreate from './pages/ProductCreate';
import CategoryCreate from './pages/CategoryCreate';
import CategoryList from './pages/CategoryList';
import Profile from './pages/Profile';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Register from './pages/Register';


function App() {
  return (
    <Provider store={store}>
    <Routes>
      <Route path='/' element={<PrivateRoute><Layout/></PrivateRoute>}>
          <Route index={true} element={<Home/>} />
          <Route path='product/:id?' element={<ProductCreate />}/>
          <Route path='category/:id?' element={<CategoryCreate />}/>
          <Route path='categorylist' element={<CategoryList />}/>
          <Route path='profile' element={<Profile />}/>
          
      </Route>
      <Route path='register' element={<Register />}/>
      <Route path='/login' element={<Login />}></Route>
      
    </Routes> 
    </Provider>  
  );
}

export default App;
