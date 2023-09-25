import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import moebius from "../images/moebius-loop.png";

const Account = () => {
    return (
        <Card sx={{ maxWidth: 300 }}>
      <div
        style={{
          backgroundColor: '#F06292', // Pink color for the header
          padding: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
        }}
      >
        <Typography variant="h5" component="div" sx={{ color: 'white' }}>
          My Cute Profile
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
        <Avatar
          src="https://via.placeholder.com/150"
          alt="Profile"
          sx={{
            width: 100,
            height: 100,
            margin: '0 auto',
            backgroundColor: 'white',
            border: '4px solid #F06292', // Pink border for the avatar
          }}
        />
        <Typography variant="h6" gutterBottom>
          Cute Name
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Job Title
        </Typography>
        <Typography variant="body2" component="p" mt={2}>
          Hello! I'm your friendly, cute profile. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>
      </CardContent>
    </Card>
    ) 
  };
  
  export default Account;
  