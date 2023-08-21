import React, { memo, useEffect } from 'react'
import { getAllProducts } from '../services'
import Product from '../components/Product'
import { setProducts } from '../features/product/productSlice' 
import { useDispatch ,useSelector} from 'react-redux'
import './ProductList.css'



function ProductList() {
    const dispatch = useDispatch()
    const products = useSelector(state => state.product.products)
    useEffect( () =>{
      getAllProducts()
      .then(res=>{dispatch(setProducts(res))} )
      .catch(err=>{console.log('ProductList getAllProducts error',err)} )
      
    },[])
  return ( 
    <div className='productList container'>
      {
        products.length > 0 ?
        (
          <ul className='list__product'>
            {
              products.map( (product)  => 
              {
                return (            
                  <Product 
                    key={product.id}
                    name={product.name} 
                    quantity={product.quantity} 
                    price ={product.price} 
                    imageUrl={product.imageUrl}
                    unit={product.unit} 
                    id={product.id} 
                    description={product.description}/>
                )
              })
            }
          </ul>
        )
        :
        <p>Ürün bulunamadı</p>
      }
    </div>
  )
}


export default memo(ProductList)