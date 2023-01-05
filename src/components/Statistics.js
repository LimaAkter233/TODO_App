import {useEffect, useState} from 'react'
import axios from 'axios' 
import { useAuthUser } from 'react-auth-kit'
import PieChart from './PieChart'
import TaskTable from './TaskTable'
import moment from 'moment'

const Statistics = () => {
  
  const auth = useAuthUser()
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    getTodos()

  }, [])

  const getTodos = async () => {

    const config = {
      headers: {
        'Authorization': `Bearer ${auth().token} `,
        'ngrok-skip-browser-warning': 'any'
      }
    }


    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}api/todo`, config)
      // console.log(res.data)
      setTasks(res.data)
    } catch (err) {
      alert('Error: ' + err.message)
    }


  }

  const ongoing = tasks.filter((val) => val.isComplete == false).length

  const completed = tasks.filter((val) => val.isComplete == true).length

  const failed =  tasks.filter((val) => (val.isComplete == false && (new Date(val.deadline) < new Date()))).length

  console.log(failed)
  


  const data = {
    labels: ['Ongoing', 'Completed', 'Failed'],
    datasets: [
      {
        label: '# of tasks',
        data: [ongoing, completed, failed],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }


  return (
    <div>
         <PieChart
         
           data={data}
         />
         <TaskTable/>
    </div>
  )
}

export default Statistics
