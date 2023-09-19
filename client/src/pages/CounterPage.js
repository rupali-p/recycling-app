import React from "react";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

const CounterPage = () => {
    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
                <Typography component="h1"variant="h5">
                    Score
                </Typography>
            </Grid>
        </ThemeProvider>
    );
};

export default CounterPage