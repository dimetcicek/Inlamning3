import React from 'react'
import ProductCard from '../components/ProductCard'
import { Product } from '../models/ProductModel'

interface ProductGridType {
  title: string
  products: Product[]
}

const SmallProductGridSection: React.FC<ProductGridType> = ({products}) => {

  return (
    <section className="product-grid">
      <div className="container">
          <div className="row row-cols-1 row-cols-md-2 g-4">
              {
                products.map(product => <ProductCard key={product.id} product={product} />)
              }
          </div>
      </div>
      </section>
  )
}

export default SmallProductGridSection