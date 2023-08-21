import React, { memo, useEffect, useState } from 'react'

import './shared/forms.css'
import { getAllCategories, getProductById, productCreate, productUpdate } from '../services';
import { useAuth } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { alertCreated, alertUpdated } from '../app/utils/alerts';


function ProductCreate() {
  const [name,setName] = useState("");
  const [description,setDescription] = useState("");
  const [quantity,setQuantity] = useState('');
  const [price,setPrice] = useState('');
  const [unit,setUnit] = useState("");
  const [imageUrl,setImageUrl] = useState("");
  
  const [categoryId,setCategoryId] = useState("");
  const [categories,setCategories] = useState([])
  const [productId,setProductId] = useState(false)
  const [product,setProduct] = useState(false)
  
  const location = useLocation();
  const {token} = useAuth();
  const navigate = useNavigate();

  useEffect(()=>
  {
    getAllCategories()
    .then(res => setCategories(res))
    .catch(err => console.log(err))
  },[])

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
            setProductId(id)  
            getProductById(id)
            .then((res) => 
            {
              setProduct(res) ;
              setName(res.name);
              setDescription(res.description);
              setQuantity(res.quantity);
              setPrice(res.price);
              setUnit(res.unit);
              setImageUrl(res.imageUrl);
              setCategoryId(res.categoryId)
            })
           .catch((err)=>console.log('errrr',err))
          }
        }
      }
    }
    catch( exc)
    {
    console.log('category create error',exc)
    }
  },[location])
  

  const validateStates = () =>
  {
    if(!categoryId)
    {
      alert('Lütfen kategori seçiniz')
      return false;
    }

    if(!imageUrl  )
    {
      alert('Lütfen resim url seçiniz')
      return false;
    }
    return true
  }

  const createObjectFromStates = () =>
  {
    if(!product)
    {
      const creteProductObject = {
        "name": `${name}`,
        "description":`${description}`,
        "quantity":`${quantity}`,
        "unit": `${unit}`,
        "imageUrl": `${imageUrl}`,
        "price": `${price}`,
        "categoryId": `${categoryId}`
      };
      return creteProductObject;
    }
    else{
      const editProductObject = {
        "name": `${name}`,
        "description":`${description}`,
        "quantity":`${quantity}`,
        "unit": `${unit}`,
        "imageUrl": `${imageUrl}`,
        "price": `${price}`,
        "categoryId": `${categoryId}`,
        "id":`${productId}`
      };
      return editProductObject;
    }
  }

  const handleSubmit = (e)=>
  {
    e.preventDefault();

    if(validateStates())
    {
      const dtoObject = createObjectFromStates();
      if(!product)
      {      
        productCreate(dtoObject)
        .then((res)=>{
          if(res.isOk)
            alertCreated();
          
            navigate('/');
        }).catch((err)=>console.log('productCreate error',err));
      }
      else{
        productUpdate(dtoObject)
        .then((res)=>{
          if(res.isOk)
            alertUpdated()
          navigate('/');
        })
        .catch((err)=>
        console.log('productUpdate error',err));
      }
    }

    
  }
  return (
    <div className='form__container'>
      <h2>Ürün oluştur</h2>
       <form>
        
        <input required value={name} onChange={e => setName(e.target.value)} type='text' placeholder='İsim'/>
        <input required value={description} onChange={e => setDescription(e.target.value)} type='text' placeholder='Açıklama'/>
        <input required value={quantity} onChange={e => setQuantity(e.target.value)} type='number' placeholder='Stok Adedi'/>
        <input required value={price} onChange={e => setPrice(e.target.value)} type='number' placeholder='Fiyat'/>
        <input required value={unit} onChange={e => setUnit(e.target.value)} type='text' placeholder='Birim'/>
        
        <Form.Select value={imageUrl} onChange={(e)=>setImageUrl(e.target.value)} >
        <option value="all"  >Resim URL seç</option>
        <option value="1.jpg"  >1.jpg</option>
        <option value="2.jpg"  >2.jpg</option>
        <option value="3.jpg"  >3.jpg</option>
        <option value="4.jpg"  >4.jpg</option>
        <option value="5.jpg"  >5.jpg</option>
        <option value="6.jpg"  >6.jpg</option>
        
      </Form.Select>
        
        <Form.Select value={categoryId} onChange={(e)=>setCategoryId(e.target.value)} className='mt-2'>
        <option value="all"  >Kategori seç</option>
        {
          categories.map((category,index) => <option key={index} value={category.id} >{category.name}</option>)
        }
      </Form.Select>
        <Button className='mt-3' type='submit' onClick={handleSubmit}>Ürünü Kaydet</Button>
        
      </form>
    </div>
  )
}

export default memo(ProductCreate)
