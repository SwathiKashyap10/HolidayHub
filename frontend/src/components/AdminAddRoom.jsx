import React from 'react'
import Header from './Header'
import AddRoomForm from './AddRoomForm'

const AdminAddRoom = () => {
  return (
    <div>
      {/* <Header heading={'Add New Car'} paragraph={'Fill in details to list a new car for booking, including pricing, availability, and car specifications.'}/> */}
      <AddRoomForm/>
    </div>
  )
}

export default AdminAddRoom
