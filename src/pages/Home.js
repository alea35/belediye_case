import React, { memo } from 'react'
import ProductList from './ProductList'

import Filter from '../components/Filter'
import { Container } from 'react-bootstrap'
function Home() {
  return (
       
      <div style={{display:'flex'}}>
        <Filter/>
        <ProductList />
      </div>
      
  )
}

export default memo(Home)
