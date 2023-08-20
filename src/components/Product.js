import React from 'react'
import './Product.css'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { productDelete } from '../services';
import { alertDeleted } from '../app/utils/alerts';
function Product({id,name,quantity,unit,imageUrl,price,description}) {


	const navigate = useNavigate()

	const deleteProduct = (id) =>
    {
		productDelete(id)
		.then((res)=>
		{
			if(res.isOk)
				alertDeleted();

			window.location.reload(true)
		})
		.catch((err)=>console.log('product delete error',err))
    }

  return (
	<div className="product">
		<img src={imageUrl} alt=""/>
		<h6 className='mt-3'>{name}</h6>
		<p>{description}</p>
		<p className="price">{price} TL</p>
		<p>Son {quantity} {unit}</p>
		<div className=''>
			<Button onClick={()=>{navigate(`/product/id=${id}`)}}>Düzenle</Button>
			<Button variant='danger' className='ms-2' onClick={()=>deleteProduct(id)}>Sil</Button>
		</div>
	</div>
  )
}

export default Product
