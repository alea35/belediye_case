import React, { useEffect, useState } from 'react'
import './Filter.css'
import { Button } from 'react-bootstrap'
import {  useNavigate } from 'react-router-dom'
import { filterProducts, getAllCategories } from '../services'
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux'
import { setProducts } from '../features/product/productSlice'

function Filter() {
  const [categories,setCategories] = useState([])
  const [selectedCategory,setSelectedCategory]= useState('all');
  const [selectedOrder,setSelectedOrder]= useState('default');
  const navigate = useNavigate('')
  const dispatch = useDispatch()

  useEffect(()=>{
    getAllCategories()
    .then(res => setCategories(res))
    .catch(err => console.log(err))
  },[])

  const handleSubmit = (e)=>
  {
    e.preventDefault();
        
    filterProducts(selectedOrder,selectedCategory)
    .then((res)=>{ dispatch(setProducts(res))})
  }

  return (
    <div className='filter'>
      <Button onClick={()=>{navigate('/product')}} >Ürün oluştur</Button>

      <form action='post'>
        <Form.Select value={selectedCategory} onChange={(e)=>setSelectedCategory(e.target.value)} className='mt-3'>
        <option value="all"  >Kategori seçin</option>
        {
          categories.map((category,index) => <option key={index} value={category.id} >{category.name}</option>)
        }
      </Form.Select>

      <Form.Select value={selectedOrder} onChange={(e)=>setSelectedOrder(e.target.value)} className='mt-3'>
        <option value="default"  >Sıralama seçin</option>
        <option value="price_asc" >Fiyat (artan fiyat)</option>
        <option value="price_desc" >Fiyat (azalan fiyat)</option>
        
      </Form.Select>

      <Button style={{width:'200px'}} variant='success' className='mt-5'onClick={handleSubmit}>Filtrele</Button>
      </form>
    </div>
  ) 
}

export default Filter
