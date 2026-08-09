import React from 'react'
import HeroHome from '../components/home/HeroHome'
import FeaturedProperties from '../components/home/FeaturedProperties'
import WhyChooseUs from '../components/home/WhyChooseUs'
import AboutSection from '../components/home/AboutSection'
import HomeServices from '../components/home/HomeServices'
import HowItWorks from '../components/home/HowItWorks'
import Testimonials from '../components/home/Testimonials'
import HomeFaq from '../components/home/HomeFaq'

const Home = () => {
  return (
    <div>
      <HeroHome />
      <FeaturedProperties />
      <HomeServices />
      <AboutSection />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
      <HomeFaq />
    </div>
  )
}

export default Home
