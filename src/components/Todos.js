import { useState, useEffect } from 'react'
import { Card, CardContent, Typography, Chip, Checkbox, Grid, Button, TextField, MenuItem } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Container from '@mui/material/Container';

import moment from 'moment'
import { ToastContainer, toast } from 'react-toastify'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

const Todos = ({ task, index }) => {
        const styles = {
                card: {
                        margin: '3rem 0',
                        minWidth: '75%'

                },
                header: {
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '2rem',
                        marginBottom: '2rem'
                },
                checkbox: {
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start'

                },
                content: {
                        display: 'flex',
                        justifyContent: 'flex-start',
                        marginLeft: '2.5rem'
                },
                btn: {

                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: '.5rem'

                }
        }


        let tasks = JSON.parse(localStorage.getItem('tasks'))
        let update = tasks.filter((_,i)=>i==index) 
        // console.log(update)
        const [checked, setChecked] = useState(false)
        const [open, setOpen] = useState(false)
        const [date, setDate] = useState(update[0]?.date)
        const [title, setTitle] = useState(update[0]?.title)
        const [description, setDescription] = useState(update[0]?.description)
        const [priority, setPriority] = useState(update[0]?.priority)
        const [openEdit, setOpenEdit] = useState(false)
        
        useEffect(() => {
            
        },[tasks])

        let today = new Date()


        const handleChangeCheck = (event) => {
                setChecked(event.target.checked);
        }

        const handleClickOpen = () => {
                setOpen(true)
        }

        const handleClose = () => {
                setOpen(false)
        }
        const handleClickOpenEdit = () => {
                setOpenEdit(true)
        }

        const handleCloseEdit = () => {
                setOpenEdit(false)
        }

        const deleteTask = (id) => {
                console.log('deleteTask', id)
                // let tasks = JSON.parse(localStorage.getItem('tasks'))

                tasks = tasks.filter((_, i) => id !== i)

                localStorage.setItem('tasks', JSON.stringify(tasks))
                handleClose()
        }

        const updateTask = (id) => {
                console.log('update', id)
                if (title === '') {
                        toast.error("Please enter a title")
                        return


                } else if (description === '') {
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
                        console.log(task)
                        tasks.splice(index,1,task)
                        localStorage.setItem('tasks', JSON.stringify(tasks))
                       
                        toast.success('Task added successfully')
                        handleCloseEdit()

                }
        }


        return (
                <div>
                          <Container maxWidth="xl">
                        <Card style={styles.card}>
                                <CardContent >
                                        <div style={styles.header}>
                                                <Typography variant='h5'>
                                                        {task.title}
                                                </Typography>

                                                <Chip label={task.priority} />

                                        </div>
                                        <div style={styles.checkbox}>
                                                <Checkbox
                                                        checked={checked}
                                                        onChange={handleChangeCheck}
                                                        inputProps={{ 'aria-label': 'controlled' }}
                                                />
                                                <div>
                                                        <Typography variant='h6'>
                                                                {task.description}
                                                        </Typography>
                                                </div>

                                        </div>
                                        <div style={styles.content}>
                                                Task Due At: {moment(task.date).format('MMMM Do YYYY')}
                                        </div>
                                        <div style={styles.btn}>
                                                <Button
                                                        variant='outlined'
                                                        color='error'
                                                        onClick={handleClickOpen}
                                                >
                                                        <DeleteIcon />
                                                </Button>
                                                <Button
                                                        variant='outlined'
                                                        onClick={handleClickOpenEdit}
                                                >
                                                        <EditIcon />
                                                </Button>
                                        </div>
                                </CardContent>
                        </Card>

                       
                        <Dialog open={openEdit} onClose={handleCloseEdit} fullWidth disableEscapeKeyDown={true}>
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
                                                                        renderInput={(params) => <TextField {...params} fullWidth  disabled/>}
                                                                        minDate={date}
                                                                />
                                                        </LocalizationProvider>


                                                </Grid>

                                        </Grid>
                                </DialogContent>
                                <DialogActions>
                                        <Button onClick={handleCloseEdit} variant="outlined" color="error">Cancel</Button>
                                        <Button onClick={()=>updateTask(index)} variant="outlined" color="primary">Submit</Button>
                                </DialogActions>
                        </Dialog>

                        <Dialog open={open} onClose={handleClose} fullWidth disableEscapeKeyDown={true}>
                                <DialogTitle>Delete Task</DialogTitle>
                                <DialogContent>
                                        <Typography variant='h5'>
                                                Are you sure you want to delete this task?
                                        </Typography>
                                </DialogContent>
                                <DialogActions>
                                        <Button onClick={handleClose} variant="outlined" color="error">No</Button>
                                        <Button onClick={()=>deleteTask(index)} variant="outlined" color="primary">Yes</Button>
                                </DialogActions>
                        </Dialog>
                        <ToastContainer/>
                        </Container>
                </div>
        )
}

export default Todos
