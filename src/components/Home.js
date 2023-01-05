import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Todo from './Todo'
import Todos from './Todos'
import { Typography,Box, Divider,MenuItem,Container } from '@mui/material'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useAuthUser } from 'react-auth-kit'
import { Grid } from '@mui/material'
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import AppBar from '@mui/material/AppBar';
import axios from 'axios'
const Home = () => {

  const auth = useAuthUser()
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('All')

  const [open, setOpen] = useState(false);
  console.log(auth().token)
  useEffect(() => {
    getTodos()
    document.title="TODO App";
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
      const res = await axios.get(`${process.env.REACT_APP_API_URL}api/todo`, config)
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

  const handleClickOpen = () => {
    setOpen(true);
};

const handleClose = () => {
    setOpen(false);
};

  return (
    <>

      <Header />

      <Grid position="static" sx={{ bgcolor: 'background.paper',}}>
        <Container maxWidth="xl">

        <Box sx={{
         
         display: 'flex', 
         justifyContent: 'space-between',
         alignItems: 'center',
         margin: 'auto',
        
     
         }}>

         <FormControl style={{minWidth: 130}}>
                   <InputLabel id="demo-simple-select-label" shrink>Filter Tasks</InputLabel>
                   <Select
                   labelId="demo-simple-select-label"
                   id="demo-simple-select"
                   label="Status"
                   value={filter}
                   onChange={handleFilter}
                   >
                           
                   <MenuItem value='Ongoing'>Ongoing </MenuItem>
                   <MenuItem value='Completed'>Completed</MenuItem>
                   {/* <MenuItem value='Pending'>Pending Tasks</MenuItem> */}
                   <MenuItem value='All'>All</MenuItem>
                   </Select>
           </FormControl>
         <div>
           <Typography variant='h4' sx={{ margin: '2rem' }}>
             Welcome to Dashbaord {auth().name}
           </Typography>

         </div>
         <Button variant="contained" onClick={handleClickOpen} sx={{ m: 2 }}>
                                                   Add Tasks
         </Button>
     </Box>

          </Container>
          </Grid>


      <Divider/>
        <Todo
      handleClickOpen={handleClickOpen}
          filter={filter}
          handleFilter={handleFilter}
        />
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