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
      method: "GET",
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({  
          "Usernane": email,
          "password": password,
      })
  }).then(res => {
      res.json().then(data => {
          if (res.status === 200) {
            setLoginResultSeverity('success');
              setLoginResult(`${data.result} Redirecting to Home page...`);
              setTimeout(() => {
                  navigate("/Home") //Need to change the redirection
              }, 2000)
          } else if (res.status === 401) {
            setLoginResultSeverity('Login error');
              setLoginResult(data.result);
          }
      })
  })
  }

    return (
      <form onSubmit={handleSubmit} action={<Link to="/"/>}>
      <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
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
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
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
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
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