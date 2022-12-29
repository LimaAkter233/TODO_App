import React, { useState } from 'react'
import { Grid, TextField, MenuItem } from '@mui/material'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Todo = () => {

        const [date, setDate] = useState(new Date())
        const [title, setTitle] = useState('')
        const [description, setDescription] = useState('')
        const [priority, setPriority] = useState('')

        console.log(title, date, description, priority)

        // if (title === '') {
        //         toast.error("Please enter a title")
        //         return

        // }else if(description==='') {
        //         toast.error("Please enter a description")
        //         return
        // }else if(priority==='') {
        //         toast.error("Please select a priority")
        //         return

        // }else if(date==='') {
        //         toast.error("Please select a date")
        //         return

        // }

        return (
                <div>
                        <Grid container spacing={3} justifyContent='center' alignItems='space-around' flexDirection='column'>
                                <Grid item md={12}>
                                        <TextField
                                                id="outlined-required"
                                                label="Task Title"
                                                fullWidth
                                                variant='outlined'
                                                value={title}
                                                onChange={(e) => { setTitle(e.target.value) }}
                                                sx={{"& .MuiOutlinedInput-root": {
                                                        "&.Mui-focused fieldset": {
                                                          borderColor: "black"
                                                        }
                                                      }}}

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
                                                onChange={(e) => { setDescription(e.target.value) }}

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
                                                onChange={(e) => { setPriority(e.target.value) }}

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
                                                        renderInput={(params) => <TextField {...params} />}
                                                        minDate={date}
                                                />
                                        </LocalizationProvider>


                                </Grid>

                        </Grid>
                </div>
        )
}

export default Todo
