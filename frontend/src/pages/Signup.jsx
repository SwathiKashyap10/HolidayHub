import React from 'react'
import SignupComponent from '../components/SignupComponent'

const Signup = ({setUser}) => {
  return (
    <div>
      <SignupComponent setUser={setUser}/>
    </div>
  )
}

export default Signup
