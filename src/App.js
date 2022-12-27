import React from 'react';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Details from './components/Details';
// import Errror from './components/Errror';
// import SignInOutContainer from './containers/index';
import { Routes, Route } from "react-router-dom"
import { RequireAuth } from 'react-auth-kit'

function App() {
  return (


    <Routes>
      <Route path='/' element={<RequireAuth loginPath='/login'>
              <Home/>
      </RequireAuth>} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/details' element={<Details />} />
      {/* <Route path='*' element={<Errror />} /> */}
    </Routes>



  );
}

export default App;
