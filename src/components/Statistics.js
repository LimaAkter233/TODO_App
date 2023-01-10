import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuthUser } from 'react-auth-kit'
import PieChart from './PieChart'
import TaskTable from './TaskTable'
import moment from 'moment'

const Statistics = () => {

  const auth = useAuthUser()
  const [tasks, setTasks] = useState([])
  const [query, setQuery] = useState('')

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

  const ongoing = tasks.filter((val) => (val.isComplete == false && (new Date(val.deadline) > new Date()))).length

  const completed = tasks.filter((val) => val.isComplete == true).length

  const failed = tasks.filter((val) => (val.isComplete == false && (new Date(val.deadline) < new Date()))).length

  console.log(tasks)

  // let curr = tasks.filter((val) => (val.isComplete == false && (new Date(val.deadline) > new Date())))

  // console.log(curr)

  function handleSearch(query) {
    // update search value
    console.log(query)

    if (query) {
      const filtered = tasks.filter(
        task =>
          task.title.toLowerCase().includes(query.toLowerCase()) ||
          task.description.toLowerCase().includes(query.toLowerCase()) ||
          task.priority.toLowerCase().includes(query.toLowerCase()) ||
          moment(task.deadline).format('DD-MM-YYYY').includes(query)
      );

      return filtered

    }
    return tasks
  }

  const handleQuery = (e) => {
    setQuery(e.target.value)
  }




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


  const option = {
   datalabels:{
    
   }
  }


  return (
    <div>
      <PieChart

        data={data}
        option={option}
      />
      <TaskTable
        query={query}
        tasks={tasks}
        handleSearch={handleSearch}
        handleQuery={handleQuery}
      />
    </div>
  )
}

export default Statistics
