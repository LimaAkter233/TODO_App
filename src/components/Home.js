import React, { useState } from 'react'
import { useSignOut } from 'react-auth-kit'
import { useNavigate } from 'react-router-dom'


const Home=()=>{
  const signOut = useSignOut()
  const navigate = useNavigate()
  const handleSignOut=()=>{
    signOut()
    navigate('/login')
  }
  
    return (
       <div style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
         <h2>
          Welcome to Dashbaord 
         </h2>
         <button onClick={handleSignOut}>Sign Out</button>
       </div>
      
    )
}

export default Home;