import React, { useState } from 'react';
import axios from 'axios';
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login=()=>{

    const history = useNavigate();

    const [inpval, setInpval] = useState({
        email: "",
        password: ""
    })

    const [data, setData] = useState([]);
    console.log(inpval);

    const getdata = (e) => {
        // console.log(e.target.value);


        const { value, name } = e.target;
        // console.log(value,name);


        setInpval(() => {
            return {
                ...inpval,
                [name]: value
            }
        })

    }

    const addData = (e) => {
        e.preventDefault();

        const getuserArr = localStorage.getItem("usertodo");
        console.log(getuserArr);

        const { email, password } = inpval;
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

            if (getuserArr && getuserArr.length) {
                const userdata = JSON.parse(getuserArr);
                console.log(userdata[0].name);
              
if(userdata[0].email === email  && userdata[0].password === password ) {

    alert("Login Successfully");
    history("/details")
}
                // if (userlogin.length === 0) {
                //     alert("invalid details")
                // } else {
                //     console.log("user login succesfulyy");

                //     localStorage.setItem("user_login", JSON.stringify(userlogin))

                //     history("/details")
                // }
            }
        }

    }

    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");

    // const LoginHandler = async () => {

    //  const response= await axios.post('https://1534-103-62-140-118.in.ngrok.io/api/user/login',{
    //         email,
    //         password
    //         })
       
    //         console.log(response);
    //  };

    const paperStyle={padding: '30px 20px', width: 300, margin: "20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}
    const marginStyle = { marginTop: 10 }
    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                {/* <TextField label='Username' placeholder='Enter username' fullWidth required value={email} onChange={(e)=>{setEmail(e.target.value)}} style={marginStyle}/> */}
                <TextField label='Username' placeholder='Enter username' fullWidth required name='email' onChange={getdata} style={marginStyle}/>
                <TextField label='Password' placeholder='Enter password' type='password' name='password' onChange={getdata} fullWidth required style={marginStyle}/>
                <FormControlLabel
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Remember me"
                 />
                <Button type='submit' onClick={addData} color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
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