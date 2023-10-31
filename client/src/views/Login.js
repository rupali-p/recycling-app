import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import MuiAlert from "@mui/material/Alert";
import nature from "../images/nature.avif";
import hamlet from "../images/hamlet-logo-white.png";

const defaultTheme = createTheme();

const Login = () => {
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginResult, setLoginResult] = useState("");
  const [loginResultSeverity, setLoginResultSeverity] = useState("");

  const navigate = useNavigate();
  const [redirectionDestination, setRedirectionDestination] =
    useState("/Account");

  let destinationPath;
  if (localStorage.getItem("selectedRoute") !== null) {
    destinationPath = "/" + localStorage.getItem("selectedRoute").substring(1);
  } else {
    // Handle the case when selectedRoute is null, maybe set a default path
    destinationPath = "/Account";
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  function handleSubmit(event) {
    event.preventDefault();
    loginUser();
    console.log(email, password);
  }

  const loginUser = async () => {
    console.log(email);
    console.log(password);

    await fetch("/Login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Usernane: email,
        password: password,
      }),
    }).then((result) => {
      result.json().then((data) => {
        if (result.status === 200) {
          setLoginResultSeverity("success");
          localStorage.setItem("userName", email);
          localStorage.removeItem("selectedRoute");
          console.log("username is " + localStorage.getItem("userName"));
          console.log("destination is " + destinationPath);
          setLoginResult(`${data.result} Redirecting...`);
          setTimeout(() => {
            navigate(destinationPath);
          }, 2000);
        } else if (result.status === 401) {
          setLoginResultSeverity("Login error");
          setLoginResult(data.result);
          setSnackbarOpen(true);
          setSnackbarMessage("Login Failed. Please Try Again");
          setSnackbarSeverity("error");
        } else {
          console.log("unexpected error");
          setSnackbarOpen(true);
          setSnackbarMessage("Unexpected error, please try again.");
          setSnackbarSeverity("warning");
        }
      });
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${nature})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          className="gradient_background"
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
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={hamlet}
              alt="Hamlet"
              style={{
                margin: "8px",
                width: "40vh", // Default width for phone size
                height: "115px",
                backgroundColor: "secondary.main",
              }}
              className="hamlet-image"
            />
            <Typography component="h3" variant="h5" style={{ color: "white" }}>
              Login
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
                transform="none"
                InputProps={{
                  style: { color: "white" }, // Set the color of the input text to white
                  classes: {
                    underline: "white-underline", // Custom CSS class for the input underline
                  },
                }}
                InputLabelProps={{
                  style: { color: "white" }, // Set the color of the label text to white
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
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                autoComplete="current-password"
                InputProps={{
                  style: { color: "white" }, // Set the color of the input text to white
                  classes: {
                    underline: "white-underline", // Custom CSS class for the input underline
                  },
                }}
                InputLabelProps={{
                  style: { color: "white" }, // Set the color of the label text to white
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "white",
                  color: "Black",
                  marginRight: 2,
                  "&:hover": {
                    backgroundColor: "grey",
                    color: "white",
                  },
                }}
              >
                Login
              </Button>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item style={{colour: 'white'}}>
                  <Link href="/SignUp" variant="body2" sx={{colour: "white"}}>
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
