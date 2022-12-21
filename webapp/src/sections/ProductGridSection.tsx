import React from 'react'
import ProductCard from '../components/ProductCard'
import { Product } from '../models/ProductModel'

interface ProductGridType {
  title: string
  products: Product[]
}

const ProductGridSection: React.FC<ProductGridType> = ({title, products}) => {

  return (
    <section className="product-grid">
      <div className="container">
          <h1>{title}</h1>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
              {
                products.map(product => <ProductCard key={product.id} product={product} />)
              }
          </div>
      </div>
      </section>
  )
}

export default ProductGridSection