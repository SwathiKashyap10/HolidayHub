import React from 'react'
import RoomInDetailComponent from '../components/RoomInDetailComponent'
import Footer from '../components/Footer'
import FadeInWhenVisible from '../components/FadeInWhenVisible'

const RoomInDetail = () => {
  return (
    <div>
      <FadeInWhenVisible><RoomInDetailComponent/></FadeInWhenVisible>
      <FadeInWhenVisible><Footer/></FadeInWhenVisible>
    </div>
  )
}

export default RoomInDetail
