import React from 'react'
import HeroSection from './HeroSection'
import Category from './Category'
import ShopBetter from './ShopBetter';
import SpecialDay from './SpecialDay';
import ProductsCard from './ProductsCards';

const Home = () => {
  return (
    <div>
      <HeroSection></HeroSection>
      <Category></Category>
      <ShopBetter></ShopBetter>
      <SpecialDay></SpecialDay>
      <ProductsCard></ProductsCard>
    </div>
  )
}

export default Home


