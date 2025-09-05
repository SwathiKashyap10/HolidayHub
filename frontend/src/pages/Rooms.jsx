import React from 'react'
import RoomsHeader from '../components/RoomsHeader'
import RoomsComponent from '../components/RoomsComponent'
import Footer from '../components/Footer'
import FadeInWhenVisible from '../components/FadeInWhenVisible'

const Rooms = ({searchCity,setSearchCity}) => {
  return (
    <div className='bg-bgk'>
      {/* <FadeInWhenVisible><RoomsHeader/></FadeInWhenVisible> */}
      {/* <FadeInWhenVisible><RoomsComponent/></FadeInWhenVisible>
      <FadeInWhenVisible><Footer/></FadeInWhenVisible> */}
      <RoomsComponent searchCity={searchCity} setSearchCity={setSearchCity}/>
      <Footer/>
    </div>
  )
}

export default Rooms
