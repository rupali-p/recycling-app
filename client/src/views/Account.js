import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import moebius from "../images/moebius-loop.png";

const councils = [
  {
    value: 'council1',
    label: 'Council 1',
  },
  {
    value: 'council2',
    label: 'Council 2',
  },
  {
    value: 'council3',
    label: 'Council 3',
  },
];

const Account = () => {
  const [council, setCouncil] = React.useState('');

  const handleChange = (event) => {
    setCouncil(event.target.value);
  };
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Set the height of the container to the full viewport height
        background: 'linear-gradient(to right, #12271e, #1a4d39)',
        position: 'relative', // Add position relative to allow z-index to work
      }}
    >
      <div className="moebius-image-container" style={{ position: 'absolute', zIndex: 0, left: -5 }}>
        <img src={moebius} alt="Moebius Loop" style={{ paddingTop: 15 }} />
      </div>
      <Card sx={{ maxWidth: 300, zIndex: 1 }}>
        <div
          style={{
            backgroundColor: '#1a4d39', // Green color for the header
            padding: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
          }}
        >
          <Typography variant="h5" component="div" sx={{ color: 'white' }}>
            Account Details
          </Typography>
          <div>
            <IconButton color="primary" aria-label="Edit">
              <EditIcon />
            </IconButton>
            <IconButton color="error" aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
        <CardContent>
          <TextField
            fullWidth
            label="First Name"
            variant="outlined"
            margin="normal"
            value="Jerome" // Hard coded name value
            InputProps={{ readOnly: true }} // Making the field read-only
          />
          <TextField
            fullWidth
            label="Last Name"
            variant="outlined"
            margin="normal"
            value="Sario" // Hard coded age value
            InputProps={{ readOnly: true }} // Making the field read-only
          />
          <TextField
            select
            fullWidth
            label="Council"
            variant="outlined"
            margin="normal"
            value={council}
            onChange={handleChange}
          >
            {councils.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            value="jerome@gmail.com" // Hard coded email value
            InputProps={{ readOnly: true }} // Making the field read-only
          />
          <Button
            variant="contained"
            fullWidth
            color="primary"
            style={{ marginTop: '20px', width: '100%', justifyContent: 'center', borderRadius: '8px' }}
          >
            Logout
          </Button>
        </CardContent>
      </Card>

    </div>
  )
};

export default Account;
