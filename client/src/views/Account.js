import React, { useState, useEffect } from "react";
import logo from "../images/hamlet-logo.png";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import { Button } from '@mui/material'
import "../css/Common.css";
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso, TableComponents } from 'react-virtuoso';
import { styled } from '@mui/system';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

import placeholder1 from "../images/dummy photos/placeholder_arl_table_1.jpg"
import placeholder2 from "../images/dummy photos/placeholder_arl_table_2.jpg"
import placeholder3 from "../images/dummy photos/placeholder_arl_table_3.jpg"
import placeholder4 from "../images/dummy photos/placeholder_arl_table_4.jpg"
import placeholder5 from "../images/dummy photos/placeholder_arl_table_5.jpg"
import placeholder6 from "../images/dummy photos/placeholder_arl_table_6.jpg"
import placeholder7 from "../images/dummy photos/placeholder_arl_table_7.jpg"
import placeholder8 from "../images/dummy photos/placeholder_arl_table_8.jpg"
import placeholder9 from "../images/dummy photos/placeholder_arl_table_9.jpg"
import placeholder10 from "../images/dummy photos/placeholder_arl_table_10.jpg"
import { NearMe } from "@mui/icons-material";

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

const WhiteIndicatorTabs = styled(Tabs)({
  '& .MuiTabs-indicator': {
    backgroundColor: 'white',
  },
});

const tabStyle = {
  margin: '10px',
  color: 'black',
  minWidth: '40rem',
  backgroundColor: '#d9d9d9',
  borderRadius: '10px',
};

const tabStylePhone = {
  margin: '10px',
  color: 'black',
  backgroundColor: '#d9d9d9',
  borderRadius: '10px',
};

const Account = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [isEditMode, setIsEditMode] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [postcode, setPostcode] = useState('');

  const [council, setCouncil] = React.useState('');
  const [tabValue, setTabValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  function createData(
    image,
    classification,
    date
  ) {
    return { image, classification, date };
  }

  const items = [
    [<img src={placeholder1}
      alt="plaecholder1"
      className="placeholder-image-container" />, "arl", "2023-02-23"],
    [<img src={placeholder2}
      alt="plaecholder2"
      className="placeholder-image-container" />, "arl", "2023-02-23"],
    [<img src={placeholder3}
      alt="plaecholder3"
      className="placeholder-image-container" />, "arl", "2023-02-23"],
    [<img src={placeholder4}
      alt="plaecholder4"
      className="placeholder-image-container" />, "arl", "2023-02-23"],
    [<img src={placeholder5}
      alt="plaecholder5"
      className="placeholder-image-container" />, "arl", "2023-02-23"],
    [<img src={placeholder6}
      alt="plaecholder6"
      className="placeholder-image-container" />, "arl", "2023-02-23"],
    [<img src={placeholder7}
      alt="plaecholder7"
      className="placeholder-image-container" />, "arl", "2023-02-23"],
    [<img src={placeholder8}
      alt="plaecholder8"
      className="placeholder-image-container" />, "arl", "2023-02-23"],
    [<img src={placeholder9}
      alt="plaecholder9"
      className="placeholder-image-container" />, "arl", "2023-02-23"],
    [<img src={placeholder10}
      alt="plaecholder10"
      className="placeholder-image-container" />, "arl", "2023-02-23"]
  ];

  const columns = [
    {
      width: 200,
      label: 'Image',
      dataKey: 'image',
    },
    {
      width: 100,
      label: 'Classification',
      dataKey: 'classification',
    },
    {
      width: 100,
      label: 'Date',
      dataKey: 'date',
    }
  ];

  const rows = [
    createData(<img src={placeholder1}
      alt="plaecholder1"
      className="placeholder-image-container" />, "arl", "2023-02-23"),
    createData(<img src={placeholder2}
      alt="plaecholder2"
      className="placeholder-image-container" />, "arl", "2023-02-23"),
    createData(<img src={placeholder3}
      alt="plaecholder3"
      className="placeholder-image-container" />, "arl", "2023-02-23"),
    createData(<img src={placeholder4}
      alt="plaecholder4"
      className="placeholder-image-container" />, "arl", "2023-02-23"),
    createData(<img src={placeholder5}
      alt="plaecholder5"
      className="placeholder-image-container" />, "arl", "2023-02-23"),
    createData(<img src={placeholder6}
      alt="plaecholder6"
      className="placeholder-image-container" />, "arl", "2023-02-23"),
    createData(<img src={placeholder7}
      alt="plaecholder7"
      className="placeholder-image-container" />, "arl", "2023-02-23"),
    createData(<img src={placeholder8}
      alt="plaecholder8"
      className="placeholder-image-container" />, "arl", "2023-02-23"),
    createData(<img src={placeholder9}
      alt="plaecholder9"
      className="placeholder-image-container" />, "arl", "2023-02-23"),
    createData(<img src={placeholder10}
      alt="plaecholder10"
      className="placeholder-image-container" />, "arl", "2023-02-23")
  ];

  const VirtuosoTableComponents = {
    Scroller: React.forwardRef((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
    ),
    TableHead,
    TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
    TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
  };

  function fixedHeaderContent() {
    return (
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            variant="head"
            align={column.numeric || false ? 'right' : 'left'}
            style={{ width: column.width }}
            sx={{
              backgroundColor: 'background.paper',
            }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    );
  }

  function rowContent(_index, row) {
    return (
      <React.Fragment>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            align={column.numeric || false ? 'right' : 'left'}
          >
            {row[column.dataKey]}
          </TableCell>
        ))}
      </React.Fragment>
    );
  }

  if (windowWidth >= 1024) { // Laptop size
    return (
      <div
        style={{
          flexDirection: 'column',
          // Align children components to the start of the column
          height: '100vh', // Set the height of the container to the full viewport height
          background: 'linear-gradient(to right, #12271e, #1a4d39)',
          padding: '20px', // Add some padding for better spacing
          width: '100%',
          height: '100vh'
        }}
      >
        <Typography variant="h2" style={{ marginBottom: '20px', color: 'white', fontSize: '8rem' }}>
          Hamlet.
        </Typography>
        <WhiteIndicatorTabs onChange={handleChange}>
          <Tabs value={tabValue} onChange={handleChange}>
            <Tab label="Account details"
              style={{
                color: 'white',
                minWidth: '20rem'
              }}
            />
            <Tab label="Your Journey"
              style={{
                color: 'white',
                minWidth: '20rem'
              }} />
          </Tabs>
        </WhiteIndicatorTabs>
        {tabValue === 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
            <TextField
                    margin="normal"
                    required
                    label="Name"
                    style={tabStyle}
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={!isEditMode} // Disable the input field when not in edit mode
                  />
                  <TextField
                    margin="normal"
                    required
                    label="Email"
                    style={tabStyle}
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={!isEditMode} // Disable the input field when not in edit mode
                  />
                  <TextField
                    margin="normal"
                    required
                    label="Password"
                    style={tabStyle}
                    autoFocus
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={!isEditMode} // Disable the input field when not in edit mode
                  />
                  <TextField
                    margin="normal"
                    required
                    label="Postcode"
                    style={tabStyle}
                    autoFocus
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    disabled={!isEditMode} // Disable the input field when not in edit mode
                  />
            <Button style={{
              borderRadius: '50px',
              textTransform: 'none',
              padding: '10px 20px',
              borderColor: 'blue',
              backgroundColor: '#d9d9d9',
              color: 'black',
              margin: '10px',
              minWidth: '30rem'
            }} onClick={() => setIsEditMode(true)}>Edit</Button>
            {isEditMode && (
                      <React.Fragment>
                        <div display="row" align="center">
                        <Button
                          style={{
                            borderRadius: '50px',
                            textTransform: 'none',
                            padding: '10px 20px',
                            borderColor: 'green',
                            backgroundColor: '#d9d9d9',
                            color: 'black',
                            margin: '10px',
                            textAlign: 'center'
                          }}
                          onClick={() => {
                            // Save changes and disable edit mode
                            setIsEditMode(false);
                            // Implement save logic here
                          }}
                        >
                          Save
                        </Button>
                        <Button
                          style={{
                            borderRadius: '50px',
                            textTransform: 'none',
                            padding: '10px 20px',
                            borderColor: 'red',
                            backgroundColor: '#d9d9d9',
                            color: 'black',
                            margin: '10px',
                            textAlign: 'center'
                          }}
                          onClick={() => setIsEditMode(false)} // Exit edit mode without saving changes
                        >
                          Exit
                        </Button>
                        </div>
                      </React.Fragment>
                      
            )}
            <Button style={{ textDecoration: 'underline', textAlign: 'center' }}> Sign Out </Button>
          </div>
        )}
        {tabValue === 1 && (
          <div style={{ margin: '30px' }}>
            <div style={{ flexGrow: 1 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <div className="section-left">
                    <h1>
                      You've scanned
                    </h1>

                    <br />

                    <p style={{ display: 'inline-block' }}>
                      <strong className="number-of-scans">27</strong> items
                    </p>

                    <br />

                    <p>
                      <strong>Did you know</strong> that’s enough plastic to make
                    </p>
                    <p>
                      exactly 3.52 Kardashians?
                    </p>
                  </div>
                </Grid>
                <Grid item xs={12} md={6}>
                  <div className="section-right">
                    <h1 >
                      Scan History
                    </h1>
                    <div className="table-container">
                      <Paper style={{ height: 350, width: '90%' }}>
                        <TableVirtuoso
                          data={rows}
                          components={VirtuosoTableComponents}
                          fixedHeaderContent={fixedHeaderContent}
                          itemContent={rowContent}
                        />
                      </Paper>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </div>
          </div>
        )}
      </div>
    )
  } else { // Phone size
    return (
      <Grid>
        <Grid container component="main" sx={{ minheight: '100vh' }}>
          <CssBaseline />
          <Grid className="gradient_background" item xs={12} sm={8} md={5} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography variant="h2" style={{ marginBottom: '20px', color: 'white' }}>
                Hamlet.
              </Typography>
              <WhiteIndicatorTabs onChange={handleChange} >
                <Tabs value={tabValue} onChange={handleChange} sx={{ width: '100%', }}>
                  <Tab label="Account details"
                    style={{
                      color: 'white',
                    }}
                  />
                  <Tab label="Your Journey"
                    style={{
                      color: 'white',
                    }} />
                </Tabs>
              </WhiteIndicatorTabs>
              {tabValue === 0 && (
                <Box component="form" sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Name"
                    style={tabStylePhone}
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={!isEditMode} // Disable the input field when not in edit mode
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Email"
                    style={tabStylePhone}
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={!isEditMode} // Disable the input field when not in edit mode
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    style={tabStylePhone}
                    autoFocus
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={!isEditMode} // Disable the input field when not in edit mode
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Postcode"
                    style={tabStylePhone}
                    autoFocus
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    disabled={!isEditMode} // Disable the input field when not in edit mode
                  />
                  <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0', flexDirection: 'column' }}>
                    <Button style={{
                      borderRadius: '50px',
                      textTransform: 'none',
                      padding: '10px 20px',
                      borderColor: 'blue',
                      backgroundColor: '#d9d9d9',
                      color: 'black',
                      margin: '10px',
                      textAlign: 'center'
                    }} onClick={() => setIsEditMode(true)}>
                      Edit</Button> <br />
                    {isEditMode && (
                      <React.Fragment>
                        <div display="row" align="center">
                        <Button
                          style={{
                            borderRadius: '50px',
                            textTransform: 'none',
                            padding: '10px 20px',
                            borderColor: 'green',
                            backgroundColor: '#d9d9d9',
                            color: 'black',
                            margin: '10px',
                            textAlign: 'center'
                          }}
                          onClick={() => {
                            // Save changes and disable edit mode
                            setIsEditMode(false);
                            // Implement save logic here
                          }}
                        >
                          Save
                        </Button>
                        <Button
                          style={{
                            borderRadius: '50px',
                            textTransform: 'none',
                            padding: '10px 20px',
                            borderColor: 'red',
                            backgroundColor: '#d9d9d9',
                            color: 'black',
                            margin: '10px',
                            textAlign: 'center'
                          }}
                          onClick={() => setIsEditMode(false)} // Exit edit mode without saving changes
                        >
                          Exit
                        </Button>
                        </div>
                      </React.Fragment>
                    )}
                    <Button style={{ textDecoration: 'underline', textAlign: 'center' }}> Sign Out </Button>
                  </div>
                </Box>
              )}
              {tabValue === 1 && (
                <Box component="form" sx={{ mt: 1 }}>
                  <div className="section-left">
                    <h1>
                      You've scanned
                    </h1>

                    <p style={{ display: 'inline-block' }}>
                      <strong className="number-of-scans">27</strong> items
                    </p>

                    <p>
                      <strong>Did you know</strong> that’s enough plastic to make
                    </p>
                    <p>
                      exactly 3.52 Kardashians?
                    </p>
                  </div>
                  <div>
                    <div className="section-right">
                      <h1 >
                        Scan History
                      </h1>
                      <div className="table-container">
                        <Paper style={{ height: 350, width: '90%', marginBottom: '20px' }}>
                          <TableVirtuoso
                            data={rows}
                            components={VirtuosoTableComponents}
                            fixedHeaderContent={fixedHeaderContent}
                            itemContent={rowContent}
                          />
                        </Paper>
                      </div>
                    </div>
                  </div>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Grid>
    );
  }
};

export default Account;

