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
import { ThemeProvider, createTheme, responsiveFontSizes  } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
function App() {

  const darkTheme = createTheme({
    palette: {
      mode: 'light',
      action:{
        hover:'#fff'
      }
    },
  });

  let theme = createTheme()
  
  theme = responsiveFontSizes(theme)

  return (

    <ThemeProvider  theme={theme} sx={{background:"#fafafa"}} >
   <Box    sx={{ bgcolor: '#fafafa'}}
   >
      <CssBaseline />
      <Routes>
        <Route path='/' element={<RequireAuth loginPath='/login'>
          <Home />
        </RequireAuth>} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/details' element={<Details />} />
        {/* <Route path='*' element={<Errror />} /> */}
      </Routes>
      </Box>
    </ThemeProvider>



  );
}

export default App;
