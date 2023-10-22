import * as React from 'react';
import {useState} from 'react';
import {useNavigate} from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import hamlet from "../images/hamlet-only.png";
import "../css/Common.css";
import nature from "../images/nature.avif";

const defaultTheme = createTheme();


const Login = () => {

  //Logic for the form
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [setLoginResult] = useState('')
    const [setLoginResultSeverity] = useState('')
    const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    loginUser()
    console.log(email, password)
  }

  const loginUser = async() => {
    console.log(email)
    console.log(password)

    await fetch("/Login", {
      method: "POST",
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          "Usernane": email,
          "password": password,
      })
  }).then(result => {
    result.json().then(data => {
          if (result.status === 200) {
            setLoginResultSeverity('success');
              setLoginResult(`${data.result} Redirecting to Home page...`);
              setTimeout(() => {
                  navigate("/") //Placeholder, need to change the redirection to something suitable.
              }, 2000)


          } else if (result.status === 401) {
            setLoginResultSeverity('Login error');
              setLoginResult(data.result);
          }
      })
  })
  }

    return (
      <form onSubmit={handleSubmit} action={<Link to="/"/>}>
      <ThemeProvider theme={defaultTheme}>
      <Grid container component="main">
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${nature})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item className="gradient_background" xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
              <img src={hamlet} alt="Hamlet" style={{
      margin: '8px',
      width: '40vh', // Default width for phone size
      height: '100px',
      backgroundColor: 'secondary.main',
    }} className="hamlet-image" />
            <Typography component="h1" variant="h5" style={{ color: 'white' }}>
              Login
            </Typography>
            <Box component="form" sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
                autoFocus
                transform="none"
                InputProps={{
                  style: { color: 'white' }, // Set the color of the input text to white
                  classes: {
                    underline: 'white-underline' // Custom CSS class for the input underline
                  }
                }}
                InputLabelProps={{
                  style: { color: 'white' } // Set the color of the label text to white
                }}
                
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={e => setPassword(e.target.value)}
                value={password}
                autoComplete="current-password"
                InputProps={{
                  style: { color: 'white' }, // Set the color of the input text to white
                  classes: {
                    underline: 'white-underline' // Custom CSS class for the input underline
                  }
                }}
                InputLabelProps={{
                  style: { color: 'white' } // Set the color of the label text to white
                }}
              />  
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={loginUser}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>  
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2" align='center'>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    </form>
    )
  };

  export default Login;