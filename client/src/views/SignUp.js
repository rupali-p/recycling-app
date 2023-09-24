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

export default RegisterForm;