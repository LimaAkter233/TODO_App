import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Todo from './Todo'
import Todos from './Todos'
import { Typography } from '@mui/material'
import { useAuthUser } from 'react-auth-kit'
import { Grid } from '@mui/material'
import axios from 'axios'
const Home = () => {

  const auth = useAuthUser()
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('All')


  console.log(auth().token)
  useEffect(() => {
    getTodos()

  }, [])

  const handleFilter = (e) => {
    setFilter(e.target.value)

  }

  const getTodos = async () => {

    const config = {
      headers: {
        'Authorization': `Bearer ${auth().token} `,
        'ngrok-skip-browser-warning': 'any'
      }
    }


    try {
      const res = await axios.get(' https://3118-103-62-140-118.in.ngrok.io/api/todo', config)
      console.log(res.data)
      setTasks(res.data)
    } catch (err) {
      alert('Error: ' + err.message)
    }

    console.log('filter', filter)

  }

  const ongoing = tasks.filter((val) => val.isComplete == false)

  const completed = tasks.filter((val) => val.isComplete == true)

  console.log('Ongoing', ongoing)
  return (
    <>

      <Header />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 'auto' }}>
        <Typography variant='h4' sx={{ margin: '2rem' }}>
          Welcome to Dashbaord {auth().name}
        </Typography>

      </div>
      <Grid container
        direction="row"
        justifyContent="space-between"
        alignItems="center">
        <Todo
          filter={filter}
          handleFilter={handleFilter}
        />
      </Grid>
      <br /><br />
      {tasks && tasks.length > 0 ? <div style={{ margin: '0 1rem' }}>

        {filter === 'All' && tasks.map((task, i) =>
          <Todos
            key={i}
            task={task}
            index={i}
          // filter={filter}
          />
        )}
        {filter === 'Ongoing' && ongoing.map((task, i) =>
          <Todos
            key={i}
            task={task}
            index={i}
          // filter={filter}
          />
        )}
        {filter === 'Completed' && completed.map((task, i) =>
          <Todos
            key={i}
            task={task}
            index={i}
          // filter={filter}
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