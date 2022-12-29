import React, { useState } from 'react'
import { Grid, TextField, MenuItem } from '@mui/material'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

const Todo = () => {

        const [date, setDate] = useState(new Date())
        return (
                <div>
                        <Grid container spacing={3} justifyContent='center' alignItems='center'>
                                <Grid item md={12}>
                                        <TextField
                                                id="outlined-required"
                                                label="Task Title"
                                                fullWidth
                                                variant='outlined'

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

                                        />
                                </Grid>
                                <Grid item md={12}>
                                        <TextField
                                                id="outlined-select-currency"
                                                select
                                                label="Priority"
                                                fullWidth

                                        >

                                                <MenuItem value='High'>High</MenuItem>
                                                <MenuItem value='Medium'>Medium</MenuItem>
                                                <MenuItem value='Low'>Low</MenuItem>

                                        </TextField>
                                </Grid>
                                <Grid item md={12}>
                                        <LocalizationProvider dateAdapter={AdapterMoment}>
                                                <DesktopDatePicker
                                                        label="Date desktop"
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
