import * as React from "react";
import "../css/Common.css";
import Card from "../components/Card";
import Grid from "@mui/material/Grid";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import { FormControl } from "@mui/material";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

const Login = () => {
  return (
    <div>
      <div className="gradient_background">
        <Grid container columns={2} sx={{ p: 5 }}>
          <Grid item xs={1}>
            <h>Hamlet.</h>
          </Grid>

          <Grid item xs={1} sx={{ p: 5 }}>
            <Box display="flex" justifyContent="flex-end">
              <MenuIcon style={{ color: "white" }} fontSize="large" />
            </Box>
          </Grid>
        </Grid>
          <Grid container>
            <FormControl fullWidth sx={{ p: 4, pt: 10, minWidth: 120 }}>
              <TextField required fullWidth label="Username" id="fullWidth" />
            </FormControl>
            <FormControl fullWidth sx={{ p: 4, pt: 0, minWidth: 120 }}>
              <TextField required fullWidth label="Password" id="fullWidth" />
            </FormControl>
          </Grid>
      </div>
    </div>
  );
};

export default Login;
