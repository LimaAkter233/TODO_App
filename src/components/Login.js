import { useState } from 'react';
import axios from 'axios';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSignIn } from 'react-auth-kit';


const Login = () => {

    const navigate  = useNavigate()
    const signIn = useSignIn()

    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    })


    console.log(credentials);

    const handleCredentials = (e) => {

        const { value, name } = e.target;

        setCredentials(() => {
            return {
                ...credentials,
                [name]: value
            }
        })

    }

    const login = async (e) => {
        e.preventDefault();

        const { email, password } = credentials;
        if (email === "") {
            toast.error('email field is requred', {
                position: "top-center",
            });
        } else if (!email.includes("@")) {
            toast.error('plz enter valid email addres', {
                position: "top-center",
            });
        } else if (password === "") {
            toast.error('password field is requred', {
                position: "top-center",
            });
        } else if (password.length < 5) {
            toast.error('password length greater five', {
                position: "top-center",
            });
        } else {

            try {
                const res = await axios.post(' https://ac35-103-62-140-116.in.ngrok.io/api/user/login', {
                    email,
                    password
                })

                console.log(res);
                if(res.data.email){
                    signIn(
                        {
                            token: res.data.token,
                            expiresIn:3600,
                            tokenType: "Bearer",
                            authState: res.data,
                            
                        }
                    )
                    console.log('success')
                    navigate ('/')
                    console.log('after navigate')
                }else {
                    toast.error('Invalid redentials', {
                        position: "top-center",
                    });
                }
            } catch (err) {
                 alert(err.message);
            }



        }

    }


    const paperStyle = { padding: '30px 20px', width: 300, margin: "20px auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: '8px 0' }
    const marginStyle = { marginTop: 10 }
    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                {/* <TextField label='Username' placeholder='Enter username' fullWidth required value={email} onChange={(e)=>{setEmail(e.target.value)}} style={marginStyle}/> */}
                <TextField label='Username' placeholder='Enter username' fullWidth required name='email' onChange={handleCredentials} style={marginStyle} />
                <TextField label='Password' placeholder='Enter password' type='password' name='password' onChange={handleCredentials} fullWidth required style={marginStyle} />
                <FormControlLabel
                    control={
                        <Checkbox
                            name="checkedB"
                            color="primary"
                        />
                    }
                    label="Remember me"
                />
                <Button type='submit' onClick={login} color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
                <Typography >
                    <Link href="#" >
                        Forgot password ?
                    </Link>
                </Typography>
                <Typography > Do you have an account ?
                    <Link href="/Signup" >
                        Sign Up
                    </Link>
                </Typography>
            </Paper>
            <ToastContainer />
        </Grid>
    )
}

export default Login