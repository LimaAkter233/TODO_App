import React, { useState, useEffect } from 'react'
import { Grid, TextField, MenuItem } from '@mui/material'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Todo = () => {

        const [date, setDate] = useState(new Date())
        const [title, setTitle] = useState('')
        const [description, setDescription] = useState('')
        const [priority, setPriority] = useState('')

        // const [taskItem, setTaskItem] = useState({
        //         date: new Date(),
        //         title: "",
        //         description: "",
        //         confirmPassword: "",
        //        // priority: ""
        //     })

        //     const [priority, setPriority] = useState('');
        //     useEffect(() => {
        //       localStorage.setItem("priority", priority ? priority : '')
        //     }, [priority]);

        //const [todoData,setTodoData] = useState([]);

        let today = new Date()


        const addTasks = async (e) => {
                e.preventDefault();

                // const { date, title, description, priority} = taskItem;

                if (title === '') {
                        toast.error("Please enter a title")
                        return


                } else if (description ==='') {
                        toast.error("Please enter a description")
                        return

                } else if (priority === '') {
                        toast.error("Please select a priority")
                        return


                } else if (date === '') {
                        toast.error("Please select a date")
                        return


                } else if (date < today) {
                        toast.error("Please select deadline at least one day above current date")
                        return
                }
                else {
                        console.log("To do data added succesfully");
                        let task = { title, description, priority, date }
                        let tasks = []
                        tasks.push(task)
                        localStorage.setItem("tasks", JSON.stringify(tasks));
                        toast.success('Task added successfully')
                        handleClose()

                }

        }
        const [open, setOpen] = useState(false);
        //console.log(title, date, description, priority)


        const handleClickOpen = () => {
                setOpen(true);
        };

        const handleClose = () => {
                setOpen(false);
        };
        return (
                <div>
                        <Button variant="contained" onClick={handleClickOpen}>
                                Add Tasks
                        </Button>
                        <Dialog open={open} onClose={handleClose} fullWidth disableEscapeKeyDown={true}>
                                <DialogTitle>Create Task</DialogTitle>
                                <DialogContent>
                                        <Grid container spacing={3} justifyContent='center' alignItems='space-around' flexDirection='column'>
                                                <Grid item md={12}>
                                                        <TextField
                                                                id="outlined-required"
                                                                label="Task Title"
                                                                fullWidth
                                                                variant='outlined'
                                                                name='title'
                                                                value={title}
                                                                onChange={(e) => setTitle(e.target.value)}

                                                        />
                                                </Grid>
                                                <Grid item md={12}>
                                                        <TextField
                                                                id="outlined-required"
                                                                label="Task Deskcription"
                                                                fullWidth
                                                                variant='outlined'
                                                                multiline
                                                                maxRows={10}
                                                                value={description}
                                                                onChange={(e) => setDescription(e.target.value)}

                                                        />
                                                </Grid>
                                                <Grid item md={12}>
                                                        <TextField
                                                                id="outlined-required"
                                                                label="Task Priority"
                                                                fullWidth
                                                                select
                                                                variant='outlined'
                                                                value={priority}
                                                                onChange={(e) => setPriority(e.target.value)}

                                                        >
                                                                <MenuItem value='High'>High</MenuItem>
                                                                <MenuItem value='Medium'>Medium</MenuItem>
                                                                <MenuItem value='Low'>Low</MenuItem>
                                                        </TextField>
                                                </Grid>
                                                <Grid item md={12}>
                                                        <LocalizationProvider dateAdapter={AdapterMoment}>
                                                                <DesktopDatePicker
                                                                        label="Deadline"
                                                                        inputFormat="MM/DD/YYYY"
                                                                        value={date}
                                                                        onChange={(newValue) => setDate(newValue)}
                                                                        renderInput={(params) => <TextField {...params} fullWidth />}
                                                                        minDate={date}
                                                                />
                                                        </LocalizationProvider>


                                                </Grid>

                                        </Grid>
                                </DialogContent>
                                <DialogActions>
                                        <Button onClick={handleClose} variant="outlined" color="error">Cancel</Button>
                                        <Button onClick={addTasks} variant="outlined" color="primary">Submit</Button>
                                </DialogActions>
                        </Dialog>
                        <ToastContainer />
                </div>
        )
}

export default Todo
