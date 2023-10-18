import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { setAuthToken } from '../Auth';
import axios from 'axios';

const defaultTheme = createTheme();

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginResult, setLoginResult] = useState('');
  const [loginResultSeverity, setLoginResultSeverity] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Check if the form is valid before attempting to log in
    if (validateForm()) {
      try {
        await loginUser();
      } catch (error) {
        console.error('Error during login:', error);
      }
    }
  };

  const validateForm = () => {
    // Basic validation: Check if email and password are not empty
    if (email.trim() === '' || password.trim() === '') {
      setLoginResultSeverity('error');
      setLoginResult('Please enter both email and password.');
      return false; // Form is not valid
    }

    // Additional validation logic if needed

    return true; // Form is valid
  };

  const loginUser = async () => {
    try {
      await fetch("/api/login", {
        method: "POST",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "email": email,
          "password": password,
        })
      }).then(res => {
        res.json().then(data => {
          console.log(data)
          const { result, access_token } = data;
          if (result === 'Login successful') {
            setAuthToken(access_token);
            setLoginResultSeverity('success');
            setLoginResult(`${result} Redirecting to Home page...`);
            setTimeout(() => {
              navigate('/Account');
            }, 2000);
          } else if (result === 'failed') {
            setLoginResultSeverity('error');
            setLoginResult('Login error: Invalid username or password');
          }


        })

      })
      // const response = await axios.post('http://localhost:5000/login', {
      //   email: email,
      //   password: password,
      // });

    } catch (error) {
      console.error('Login error:', error);
      setLoginResultSeverity('error');
      setLoginResult('Login error: Something went wrong');
    }
  };

  return (
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                'url(https://source.unsplash.com/random?wallpapers)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light'
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  onChange={(e) => setPassword(e.target.value)}
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
                  // onClick={handleSubmit}
                >
                  Sign In
                </Button>
                <Typography variant="body2" color={loginResultSeverity}>
                  {loginResult}
                </Typography>
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
  );
};

export default Login;
