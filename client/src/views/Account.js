import React from 'react';
import moebius from "../images/moebius-loop.png";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import { Button } from '@mui/material'

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

const tabStyle = {
  margin: '10px', 
  color: 'black', 
  minWidth: '40rem',
  backgroundColor: '#d9d9d9',
  borderRadius: '10px',
};

const Account = () => {
  const [council, setCouncil] = React.useState('');
  const [tabValue, setTabValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        // Align children components to the start of the column
        height: '100vh', // Set the height of the container to the full viewport height
        background: 'linear-gradient(to right, #12271e, #1a4d39)',
        position: 'relative', // Add position relative to allow z-index to work
        padding: '20px', // Add some padding for better spacing
      }}
    >
      <Typography variant="h2" style={{ marginBottom: '20px', color: 'white', fontSize: '8rem' }}>
        Hamlet.
      </Typography>
      <Tabs value={tabValue} onChange={handleChange}>
        <Tab label="Tab 1"
          style={{
            color: 'white',
            minWidth: '20rem'
          }} />
        <Tab label="Tab 2"
          style={{
            color: 'white',
            minWidth: '20rem'
          }} />
      </Tabs>
      {tabValue === 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
          <TextField label="Name" variant="outlined" style={tabStyle} InputLabelProps={{ style: { color: 'black' } }}/>
          <TextField label="Email" variant="outlined" style={tabStyle} InputLabelProps={{ style: { color: 'black' } }} />
          <TextField label="Password" variant="outlined" style={tabStyle} InputLabelProps={{ style: { color: 'black' } }} />
          <TextField label="Postcode" variant="outlined" style={tabStyle} InputLabelProps={{ style: { color: 'black' } }} />
          <Button style={{
            borderRadius: '50px',
            textTransform: 'none',
            padding: '10px 20px',
            borderColor: 'blue',
            backgroundColor: '#d9d9d9',
            color: 'black',
            margin: '10px',
            minWidth: '30rem'
          }}>Edit</Button>
          <Button> Sign Out </Button>
        </div>
      )}
      {tabValue === 1 && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TextField label="Name" variant="outlined" style={{ margin: '10px', color: 'white' }} InputLabelProps={{ style: { color: 'black' } }} />
          <TextField label="Emaissssssl" variant="outlined" style={{ margin: '10px', color: 'white' }} InputLabelProps={{ style: { color: 'white' } }} />
          <TextField label="Password" variant="outlined" style={{ margin: '10px', color: 'white' }} InputLabelProps={{ style: { color: 'white' } }} />
          <TextField label="Postcode" variant="outlined" style={{ margin: '10px', color: 'white' }} InputLabelProps={{ style: { color: 'white' } }} />
        </div>
      )}
    </div>
  )
};

export default Account;
