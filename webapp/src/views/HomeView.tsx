import React, { useEffect, useState } from 'react'
import BannerSection from '../sections/BannerSection'
import FlashSaleBotSection from '../sections/FlashSaleBotSection'
import FlashSaleTopSection from '../sections/FlashSaleTopSection'
import FooterSection from '../sections/FooterSection'
import MainMenuSection from '../sections/MainMenuSection'
import ProductGridSection from '../sections/ProductGridSection'
import ShowcaseSection from '../sections/ShowcaseSection'
import SiteInfoSection from '../sections/SiteInfoSection'
import { IProductContext, ProductContext } from '../contexts/ProductContext'
import { Product } from '../models/ProductModel'


const HomeView: React.FC = () => {
  const { products, getAll } = React.useContext(ProductContext) as IProductContext
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [flashSaleTopProducts, setFlashSaleTopProducts] = useState<Product[]>([])
  const [flashSaleBotProducts, setFlashSaleBotProducts] = useState<Product[]>([])

  useEffect(() => {
    if (!products || products.length === 0)
      getAll()

      setFeaturedProducts(products.filter(p => p.rating === 5.0))
      setFlashSaleTopProducts(products.filter(p => p.price < 50))
      setFlashSaleBotProducts(products.filter(p => p.price > 50 && p.price < 100))
  }, [getAll, products])

  return (
    <>
    <div style={{backgroundColor: "#E6E6E6"}}>
      <MainMenuSection />
    </div>
      <ShowcaseSection />
      <ProductGridSection title="HIGHEST RATED PRODUCTS" products={featuredProducts} />
      <BannerSection />
      <FlashSaleTopSection offer="UNDER 50" products={flashSaleTopProducts} />
      <FlashSaleBotSection offer="UNDER 100" products={flashSaleBotProducts} />
      <SiteInfoSection />
      <FooterSection />
    </> 
  )
}

export default HomeView