import * as React from "react";
import "../css/Common.css";
import Grid from "@mui/material/Grid";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Checklist = () => {
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <div>
      <div className="gradient_background">
        <div>
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

          <h1>Recycling Checklist</h1>
          <hr />

          <div className="left-align-text">
            <p>Before you put it in the recycling bin . . .</p>
          </div>

          <List
            sx={{
              width: "100%",
              maxWidth: "90%",
              padding: 5,
              color: "white",
            }}
          >
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

          <div className="center-lower-text ">
            <i>
              For items that are conditionally recyclable, follow the
              instructions on the ARL label.
            </i>
          </div>

          <div className="center-lower-CTA">
          <Button
            variant="contained"
            color="grey"
            href={"./PICResult1"}
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
            Next
          </Button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checklist;
