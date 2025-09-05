import React, { useState } from 'react'
import Hero from '../components/Hero'
import FeaturedSection from '../components/FeaturedSection'
import Banner from '../components/Banner'
import CustomersReview from '../components/CustomersReview'
import Footer from '../components/Footer'
import FadeInWhenVisible from '../components/FadeInWhenVisible'
import {toast,Toaster} from 'react-hot-toast'

const Home = ({searchCity,setSearchCity}) => {
  
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false}/>
      <FadeInWhenVisible><Hero searchCity={searchCity} setSearchCity={setSearchCity}/></FadeInWhenVisible>
      <FadeInWhenVisible><FeaturedSection/></FadeInWhenVisible>
      <FadeInWhenVisible><Banner/></FadeInWhenVisible>
      <FadeInWhenVisible><CustomersReview/></FadeInWhenVisible>
      <FadeInWhenVisible><Footer/></FadeInWhenVisible>
    </div>
  )
}

export default Home
