import React, { useEffect, useState } from 'react'
import './CategoryList.css'
import { categoryDelete, getAllCategories } from '../services'
import { NavLink, useNavigate } from 'react-router-dom'
import  Table  from 'react-bootstrap/Table'
import { Button } from 'react-bootstrap'
import { alertDeleted } from '../app/utils/alerts'
function CategoryList() {
    const [categories,setCategories] = useState([])
    const navigate = useNavigate();
    useEffect(()=>{
        getAllCategories().then(res => setCategories(res)).catch(err => console.log(err))
    },[])


    const createCategoryClicked = () => {
        navigate('/category');
    }
   

    const deleteCategory = (id) =>
    {
        categoryDelete(id)
        .then((res)=>
        {
            if(res.isOk)
            alertDeleted()

            window.location.reload(true)
        })
        .catch((err)=>console.log('deleteCategory error',err))
    }

  return (
    <div className='categoryList'>
     
        <h2>Kategori Listesi</h2>
        <Button  onClick={createCategoryClicked} style={{width:'200px',marginBottom:'10px'}}>Kategori oluştur</Button>
        {
            categories.length > 0 ? 
            (
                <Table  bordered hover striped>
                    <thead>
                        <td>İsim</td>
                        <td>Açıklama</td>
                        <td style={{width: '250px'}}></td>
                    </thead>
                    <tbody>
                    {
                        categories.map((category) =>{
                            return (
                            <tr key={category.id}>
                                
                                <td>{category.name}</td>
                                <td>{category.description}</td>
                                <td>
                                    <Button className='me-3' onClick={()=>{navigate(`/category/id=${category.id}`)}}>Düzenle</Button>
                                    <Button variant='danger' onClick={()=>deleteCategory(category.id)}>Sil</Button>
                                </td>
                            </tr>
                        )})
                    }   
                    </tbody>
                 </Table>
            ) 
            :
            <p>Kategori bulunamadı</p>
        }
       
       
    </div>
  )
}

export default CategoryList
