import React from 'react'
import { Product } from '../models/ProductModel'
import SmallProductGridSection from './SmallProductGridSection'

interface ProductGridType {
  offer: string
  products: Product[]
}

const FlashSaleTopSection: React.FC<ProductGridType> = ({offer, products}) => {

  return (
    <section className="flash-top">
      <div className="container1">
        <h1>{offer}</h1>
        <div className="flash-topBtn">
          <button className="btn-white">FLASH SALE</button>
        </div>
      </div>
      <div className="flash-top-product">
        <div className="flash-product"><SmallProductGridSection products={products.slice(0, 4)} title={''} /></div>
      </div>
    </section>
  )
}

export default FlashSaleTopSection