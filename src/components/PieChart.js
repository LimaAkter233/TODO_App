import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Grid } from '@mui/material'



const PieChart = ({ data }) => {


        ChartJS.register(ArcElement, Tooltip, Legend);

        return (
                <Grid container justifyContent='center' alignItems='center'>
                        <Grid item>
                                <Pie data={data}
                                        style={{ align: 'center' }}
                                />
                        </Grid>
                </Grid>
        )
}

export default PieChart
