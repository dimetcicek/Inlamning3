import React from 'react'
import ProductCard from '../components/ProductCard'
import { ProductItem } from '../models/ProductModels'

interface ProductGridType {
  title: string
  products: ProductItem[]
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