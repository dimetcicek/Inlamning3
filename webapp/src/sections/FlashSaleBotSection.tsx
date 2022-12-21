import React from 'react'
import { Product } from '../models/ProductModel'
import SmallProductGridSection from './SmallProductGridSection'

interface ProductGridType {
  offer: string
  products: Product[]
}

const FlashSaleBotSection: React.FC<ProductGridType> = ({offer, products}) => {
  return (
    <section className="flash-bot">
        <div className="flash-bot-product">
        <div className="flash-product"><SmallProductGridSection products={products.slice(0, 4)} title={''} /></div>
      </div>
      <div className="container2">
        <h1>{offer}</h1>
        <div className="flash-botBtn">
          <button className="btn-white">FLASH SALE</button>
        </div>
      </div>

    </section>
  )
}

export default FlashSaleBotSection