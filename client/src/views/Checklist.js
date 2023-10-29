import React, { useLayoutEffect } from "react";
import "../css/Common.css";
import Grid from "@mui/material/Grid";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import {Navbar} from "../components/Navbar";
import {Divider} from "@mui/material";
import {createTheme, responsiveFontSizes, ThemeProvider} from '@mui/material/styles';

let theme = createTheme();
theme = responsiveFontSizes(theme);


const Checklist = () => {
  
  useLayoutEffect(() => {
    document.body.style.background = "linear-gradient(90deg, #12261E, #1A4D39)"
  })

  return (
        <ThemeProvider theme={theme}>
          <Navbar/>
          <p />
            <Grid container spacing={2}>
                <Grid item xs={12}
                      sx={{
                        marginLeft: {md: 12, xs: 3},
                          marginRight: {md: 12, xs: 3},
                        }}
                          >
                    <Typography variant={"h3"} style={{"color": "white"}}>
                        Recycling Checklist
                    </Typography>
                    <Grid item xs={12} md={6} mt={1}>
                        <Divider component="li" sx={{
                            listStyleType: "none",
                            borderColor: 'white',
                            borderBottomWidth: 4
                        }}/>
                    </Grid>
                    <Grid item xs={12} mt={5}>
                        <Typography variant={"h5"} style={{"color": "white"}}>
                            Before you put it in the recycling bin . . .
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12} >
                    <List sx={{
                        marginLeft: {md: 14, xs: 3},
                        marginRight: {md: 14, xs: 3},
                        color: "white",
                    }}>

                        <ListItemButton role={undefined} dense>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    sx={{
                                        color: "white",
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText
                                primary={`Keep your item(s) loose, don’t bag or contain your items.`}
                            />
                        </ListItemButton>
                        <ListItemButton role={undefined} dense>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    sx={{
                                        color: "white",
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText
                                primary={`Flatten containers like cardboard boxes, but avoid squashing bottles or cans.`}
                            />
                        </ListItemButton>
                        <ListItemButton role={undefined} dense>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    sx={{
                                        color: "white",
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    "If your item has been in contact with food, make sure all solid food particles are gone. For Jars, cans, bottles and other containers make sure you rinse (soap optional) to remove excess particles and residues. "
                                }
                            />
                        </ListItemButton>
                    </List>


                </Grid>
                <Grid item xs={12} align={"center"}>
                    <Typography>
                        <i>
                            For items that are conditionally recyclable, follow the
                            instructions on the ARL label.
                        </i>
                    </Typography>
                </Grid>
                <Grid item xs={12} align={"center"}>
                    <Button
                        variant="contained"
                        color="grey"
                        sx={{
                            backgroundColor: "white",
                            color: "Black",
                            marginRight: 2,
                            "&:hover": {
                                backgroundColor: "grey",
                                color: "white",
                            },
                        }}
                    >
                        <Link to="/YellowBinResult" style={{textDecoration: 'none', color: 'black'}}>
                            Next
                        </Link>
                    </Button>

                </Grid>

            </Grid>

        </ThemeProvider>
  );
};

export default Checklist;
