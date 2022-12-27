import React, { useState } from 'react'
import Header from '../components/Header'

const Home=()=>{
  // const signOut = useSignOut()
  // const navigate = useNavigate()
  // const handleSignOut=()=>{
  //   signOut()
  //   navigate('/login')
  // }
  
    return (
      <>
      <Header/>
        <div style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
          <h2>
            Welcome to Dashbaord 
          </h2>

 
        </div>
       </>
    )
}

export default Home;