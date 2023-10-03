import React, {useState} from 'react';
import {
    Box,
    IconButton,
    OutlinedInput,
    InputLabel,
    InputAdornment,
    FormHelperText,
    FormControl,
    TextField,
    Button,
    Stack,
    Typography,
    Alert,
} from '@mui/material';
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {Link, useNavigate} from "react-router-dom"


const RegisterForm = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')

    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [passwordError, setPasswordError] = useState('')

    const [registerResult, setRegisterResult] = useState('')
    const [registerResultSeverity, setRegisterResultSeverity] = useState('')
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();

        RegisterUser()

        console.log(firstName, lastName, email, password)
    }

    const RegisterUser = async () => {
        await fetch("/api/register-user", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email": email,
                "password": password,
                "firstName": firstName,
                "lastName": lastName,
            })
        }).then(res => {
            res.json().then(data => {
                if (res.status === 201) {
                    setRegisterResultSeverity('success');
                    setRegisterResult(`${data.result} Redirecting to Login page...`);
                    setTimeout(() => {
                        navigate("/Login")
                    }, 2000)
                } else if (res.status === 200) {
                    setRegisterResultSeverity('error');
                    setRegisterResult(data.result);
                }
            })
        })
    }

    const validateEmail = () => {
        setEmail(email);
        if (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
            setEmailError('');
        } else {
            setEmailError("Email is not valid.");
        }
    }

    const validatePassword = () => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (passwordRegex.test(password)) {
            setPasswordError('');
        } else {
            setPasswordError("Password must have uppercase and lowercase letters, numbers and be at least 8 characters long.")
        }
    }
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }

    return (
        <div>
            <Box sx={{display: 'flex', flexWrap: 'wrap'}}>

                <form onSubmit={handleSubmit} action={<Link to="/login"/>}>
                    <Stack spacing={4}>
                        <Typography variant="h2">Sign Up</Typography>
                        <TextField
                            type="text"
                            variant='outlined'
                            color='secondary'
                            label="First Name"
                            onChange={e => setFirstName(e.target.value)}
                            value={firstName}
                            required
                        />
                        <TextField
                            type="text"
                            variant='outlined'
                            color='secondary'
                            label="Last Name"
                            onChange={e => setLastName(e.target.value)}
                            value={lastName}
                            required
                        />
                        <TextField
                            type="email"
                            variant='outlined'
                            color='secondary'
                            label="Email"
                            onChange={e => setEmail(e.target.value)}
                            onBlur={e => validateEmail()}
                            error={emailError !== ''}
                            value={email}
                            helperText={emailError}
                        />
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                                onChange={e => setPassword(e.target.value)}
                                onBlur={e => validatePassword(e.target.value)}
                                value={password}
                                error={passwordError != ""}
                            />
                            <FormHelperText>{passwordError}</FormHelperText>
                        </FormControl>
                        <Button
                            variant="outlined"
                            color="secondary"
                            type="submit"
                            disabled={
                                firstName == "" || lastName == "" || email == "" || password == ""
                                || (email != "" && emailError != "")
                                || (password != "" && passwordError != "")
                            }
                            fullWidth
                        >
                            Register
                        </Button>
                        {registerResult != "" ? (
                            <Alert severity={registerResultSeverity}>{registerResult}</Alert>
                        ) : <div></div>}
                        <Typography variant="subtitle1">Already have an account? <Link to="/Login">Login
                            Here</Link></Typography>
                    </Stack>
                </form>
            </Box>
        </div>
    )
}
const SignUp = () => {
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
            <Typography component="hea1" variant="h1">
              Hamlet.
            </Typography>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
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
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    ) 
  };
  
  export default SignUp;