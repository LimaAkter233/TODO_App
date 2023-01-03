import React, { useState } from 'react'
import Header from '../components/Header'
import Todo from './Todo'
import Todos from './Todos'
import { Typography } from '@mui/material'
import { useAuthUser } from 'react-auth-kit'
import { Grid } from '@mui/material'
const Home = () => {

  const auth = useAuthUser()

  console.log(auth())

  let tasks = JSON.parse(localStorage.getItem('tasks'))

  console.log(tasks)

  return (
    <>
  
      <Header />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 'auto' }}>
        <Typography variant='h4' sx={{ margin: '2rem' }}>
          Welcome to Dashbaord {auth().name}
        </Typography>

      </div>
      <Grid  container
  direction="row"
  justifyContent="space-between"
  alignItems="center">
        <Todo />
      </Grid>
      <br/><br/>
      {tasks && tasks.length > 0 ? <div style={{ margin:'0 1rem'}}>

        {tasks.map((task, i) =>
          <Todos
            key={i}
            task={task}
            index={i}
          />
        )}
      </div> : <div style={{ margin: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <Typography variant='h5'>
          No Posts Available
        </Typography>
      </div>}
    </>
  )
}

export default Home;