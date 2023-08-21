import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { categoryCreate, categoryUpdate, getCategoryById } from '../services';
import './shared/forms.css'
import { Button } from 'react-bootstrap';
import { alertCreated, alertInfo, alertUpdated } from '../app/utils/alerts';


function CategoryCreate() {
  const [name,setName] = useState("");
  const [description,setDescription] = useState("");
  
  const [category,setCategory] = useState(false)
  const navigate = useNavigate();
  const location = useLocation();
  
  const [categoryId,setCategoryId] = useState(false)
 

  useEffect(()=>
  {
    try 
    {
      if(location?.pathname)
      {
        
        const regex = /id=([\w-]+)/;
        const match = location.pathname.match(regex);
        if(match)
        {

          const id = match[1]; 
          if(id)
          {
            setCategoryId(id)  
            getCategoryById(id)
            .then((res) => { setCategory(res) ;setName(res.name);setDescription(res.description)})
            .catch((err)=>console.log('getCategoryById error',err))
          }
        }
      }
    }
    catch( ex)
    {
      console.log('location useeffect error categorycreate',ex)
    }
  },[location])
  

  const creteObjectFromStates = ()=>
  {
    if(!category)
    {
      const creteCategoryObject = {
        "name": `${name}`,
        "description":`${description}`
      };
      return creteCategoryObject;
    }
    else
    {
      const editCategoryObject = {
        "name": `${name}`,
        "description":`${description}`,
        "id":`${categoryId}`
      };
      return editCategoryObject;
    }
  }
  const handleSubmit = (e)=>
  {
    e.preventDefault();
    
    const categoryDto = creteObjectFromStates();
    //create
    if(!category)
    {
      categoryCreate(categoryDto)
      .then((res)=>
      {
        if(res.isOk)
         alertCreated() ;
        
         navigate('/categorylist')
        })
      .catch((err)=>console.log('handleSubmit create category error',err));
    }
    //edit
    else{
      categoryUpdate(categoryDto)
      .then((res)=>
      {
        if(res.isOk)
        alertUpdated() ;

        navigate('/categorylist');
      })
      .catch((err)=>
      console.log('handleSubmit update category error',err));
    }
  }
  return (
    <div className='form__container'>
      <h2>{categoryId ? 'Kategori Düzenle' : 'Kategori Oluştur' }</h2>
       <form>
        <input required value={name} onChange={e => setName(e.target.value)}  type='text' placeholder='İsim'/>
        <input required value={description} onChange={e => setDescription(e.target.value)} type='text' placeholder='Açıklama'/>
        <Button type='submit' onClick={handleSubmit}>Kaydet</Button>
      </form>
    </div>
  )
}

export default CategoryCreate
