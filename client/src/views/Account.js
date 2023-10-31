import React, {useLayoutEffect, useEffect, useState} from "react";
import logo from "../images/hamlet-logo.png";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import {TextField} from "@mui/material";
import {Button} from "@mui/material";
import "../css/Common.css";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {TableVirtuoso, TableComponents} from "react-virtuoso";
import {styled} from "@mui/system";
import { Navbar } from "../components/Navbar";
import Box from "@mui/material/Box";

import placeholder1 from "../images/dummy photos/placeholder_arl_table_1.jpg";
import placeholder2 from "../images/dummy photos/placeholder_arl_table_2.jpg";
import placeholder3 from "../images/dummy photos/placeholder_arl_table_3.jpg";
import placeholder4 from "../images/dummy photos/placeholder_arl_table_4.jpg";
import placeholder5 from "../images/dummy photos/placeholder_arl_table_5.jpg";
import placeholder6 from "../images/dummy photos/placeholder_arl_table_6.jpg";
import placeholder7 from "../images/dummy photos/placeholder_arl_table_7.jpg";
import placeholder8 from "../images/dummy photos/placeholder_arl_table_8.jpg";
import placeholder9 from "../images/dummy photos/placeholder_arl_table_9.jpg";
import placeholder10 from "../images/dummy photos/placeholder_arl_table_10.jpg";
import {createTheme, responsiveFontSizes, ThemeProvider} from '@mui/material/styles';

let theme = createTheme();
theme = responsiveFontSizes(theme);

const councils = [
    {
        value: "council1",
        label: "Council 1",
    },
    {
        value: "council2",
        label: "Council 2",
    },
    {
        value: "council3",
        label: "Council 3",
    },
];

const WhiteIndicatorTabs = styled(Tabs)({
    "& .MuiTabs-indicator": {
        backgroundColor: "white",
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

    const [council, setCouncil] = useState("");
    const [tabValue, setTabValue] = useState(0);
    const [email, setEmail] = useState();
    const [name, setName] = useState();
    const [postCode, setPostCode] = useState();
    const [scanCount, setScanCount] = useState();

    const setAccountDetails = async (userEmail, isMobile) => {
        if (isMobile === true) {
            var apiPath = `/api/get-accountdetails/${userEmail}`
        } else {
            var apiPath = `http://127.0.0.1:5000/api/get-accountdetails/${userEmail}`
        }
        try {
            const response = await fetch(apiPath, {
                method: "GET",
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setEmail(data["Email"]);
            setName(data["Name"]);
            setPostCode(data["postcode"]);
            setScanCount(data["scan_count"]);
        } catch (error) {
            console.error('Error fetching or parsing data:', error);
            // Handle errors here
        }
    }

    useEffect(() => {
            if (!email) {
                const userName = localStorage.getItem("userName");
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    setAccountDetails(userName, true)
                } else {
                    setAccountDetails(userName, false)
                }
            }

        }
    )

    const handleChange = (event, newValue) => {
        console.log("New Tab Value:", newValue);
        setTabValue(newValue);
    };

    function handleClick(e) {
        console.log("username is " + localStorage.getItem("userName"));
        localStorage.clear();
        console.log("username is now " + localStorage.getItem("userName"));
    }

    function createData(image, classification, date) {
        return {image, classification, date};
    }

    const items = [
        [
            <img
                src={placeholder1}
                alt="plaecholder1"
                className="placeholder-image-container"
            />,
            "arl",
            "2023-02-23",
        ],
        [
            <img
                src={placeholder2}
                alt="plaecholder2"
                className="placeholder-image-container"
            />,
            "arl",
            "2023-02-23",
        ],
        [
            <img
                src={placeholder3}
                alt="plaecholder3"
                className="placeholder-image-container"
            />,
            "arl",
            "2023-02-23",
        ],
        [
            <img
                src={placeholder4}
                alt="plaecholder4"
                className="placeholder-image-container"
            />,
            "arl",
            "2023-02-23",
        ],
        [
            <img
                src={placeholder5}
                alt="plaecholder5"
                className="placeholder-image-container"
            />,
            "arl",
            "2023-02-23",
        ],
        [
            <img
                src={placeholder6}
                alt="plaecholder6"
                className="placeholder-image-container"
            />,
            "arl",
            "2023-02-23",
        ],
        [
            <img
                src={placeholder7}
                alt="plaecholder7"
                className="placeholder-image-container"
            />,
            "arl",
            "2023-02-23",
        ],
        [
            <img
                src={placeholder8}
                alt="plaecholder8"
                className="placeholder-image-container"
            />,
            "arl",
            "2023-02-23",
        ],
        [
            <img
                src={placeholder9}
                alt="plaecholder9"
                className="placeholder-image-container"
            />,
            "arl",
            "2023-02-23",
        ],
        [
            <img
                src={placeholder10}
                alt="plaecholder10"
                className="placeholder-image-container"
            />,
            "arl",
            "2023-02-23",
        ],
    ];

    const columns = [
        {
            width: 200,
            label: "Image",
            dataKey: "image",
        },
        {
            width: 100,
            label: "Classification",
            dataKey: "classification",
        },
        {
            width: 100,
            label: "Date",
            dataKey: "date",
        },
    ];

    const rows = [
        createData(
            <img
                src={placeholder1}
                alt="plaecholder1"
                className="placeholder-image-container"
            />,
            "arl",
            "2023-02-23"
        ),
        createData(
            <img
                src={placeholder2}
                alt="plaecholder2"
                className="placeholder-image-container"
            />,
            "arl",
            "2023-02-23"
        ),
        createData(
            <img
                src={placeholder3}
                alt="plaecholder3"
                className="placeholder-image-container"
            />,
            "arl",
            "2023-02-23"
        ),
        createData(
            <img
                src={placeholder4}
                alt="plaecholder4"
                className="placeholder-image-container"
            />,
            "arl",
            "2023-02-23"
        ),
        createData(
            <img
                src={placeholder5}
                alt="plaecholder5"
                className="placeholder-image-container"
            />,
            "arl",
            "2023-02-23"
        ),
        createData(
            <img
                src={placeholder6}
                alt="plaecholder6"
                className="placeholder-image-container"
            />,
            "arl",
            "2023-02-23"
        ),
        createData(
            <img
                src={placeholder7}
                alt="plaecholder7"
                className="placeholder-image-container"
            />,
            "arl",
            "2023-02-23"
        ),
        createData(
            <img
                src={placeholder8}
                alt="plaecholder8"
                className="placeholder-image-container"
            />,
            "arl",
            "2023-02-23"
        ),
        createData(
            <img
                src={placeholder9}
                alt="plaecholder9"
                className="placeholder-image-container"
            />,
            "arl",
            "2023-02-23"
        ),
        createData(
            <img
                src={placeholder10}
                alt="plaecholder10"
                className="placeholder-image-container"
            />,
            "arl",
            "2023-02-23"
        ),
    ];

    const VirtuosoTableComponents = {
        Scroller: React.forwardRef((props, ref) => (
            <TableContainer component={Paper} {...props} ref={ref}/>
        )),
        Table: (props) => (
            <Table
                {...props}
                sx={{ tableLayout: "fixed"}}
            />
        ),
        TableHead,
        TableRow: ({item: _item, ...props}) => <TableRow {...props} />,
        TableBody: React.forwardRef((props, ref) => (
            <TableBody {...props} ref={ref}/>
        )),
    };

    function fixedHeaderContent() {
        return (
            <TableRow>
                {columns.map((column) => (
                    <TableCell
                        key={column.dataKey}
                        variant="head"
                        align={column.numeric || false ? "right" : "left"}
                        style={{width: column.width}}
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
                        align={column.numeric || false ? "right" : "left"}
                    >
                        {row[column.dataKey]}
                    </TableCell>
                ))}
            </React.Fragment>
        );
    }

    useLayoutEffect(() => {
        document.body.style.background = "linear-gradient(90deg, #12261E, #1A4D39)"
    })

    const AccountInfo = () => {
      return (
          <>
              <Grid container spacing={2}>
                  <Grid item xs={12} align={"center"}>
                      <Grid item xs={12} md={6} m={3}>
                          <TextField
                              value={name}
                              variant="outlined"
                              fullWidth
                              style={tabStyle}
                              InputLabelProps={{style: {color: "black"}}}
                          />
                      </Grid>
                      <Grid item xs={12} md={6} m={3}>
                          <TextField
                              value={email}
                              variant="outlined"
                              style={tabStyle}
                              fullWidth
                              InputLabelProps={{style: {color: "black"}}}
                          />
                      </Grid>
                      <Grid item xs={12} md={6} m={3}>
                          <TextField
                              variant="outlined"
                              value={postCode}
                              autoFocus
                              fullWidth
                              style={tabStyle}
                              InputLabelProps={{style: {color: "black"}}}
                          />

                      </Grid>

                      {/*<Button*/}
                      {/*  style={{*/}
                      {/*    borderRadius: "50px",*/}
                      {/*    textTransform: "none",*/}
                      {/*    padding: "10px 20px",*/}
                      {/*    borderColor: "blue",*/}
                      {/*    backgroundColor: "#d9d9d9",*/}
                      {/*    color: "black",*/}
                      {/*    margin: "10px",*/}
                      {/*    minWidth: "30rem",*/}
                      {/*  }}*/}
                      {/*>*/}
                      {/*  Edit*/}
                      {/*</Button>*/}
                      <Button
                          onClick={handleClick}
                          href="/"
                          style={
                              {
                                  backgroundColor: "white",
                                  color: "Black",
                                  marginRight: 2,
                                  "&:hover": {
                                      backgroundColor: "green",
                                      color: "white",
                                  }
                              }

                          }
                      >
                          {" "}
                          Sign Out{" "}
                      </Button>
                  </Grid>

              </Grid>
          </>

      )
  }

  const ScanHistory = () => {
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} align={"center"}>
                    <Typography variant={"h4"} style={{color: "white"}} mt={2}>You've scanned</Typography>
                    <Typography variant={"h1"} display={"inline"} sx={{fontSize: {xs: "5em", md: "10em"}}}>
                        <strong>{scanCount}</strong>
                    </Typography>
                    <Typography display={"inline"}> items</Typography>
                    <Grid item xs={12} align={"center"} mt={3}>
                        <Typography variant={"h5"} style={{color: "white"}}>
                            <strong>Did you know</strong> that’s enough plastic to make
                        </Typography>
                        <Typography variant={"h6"} style={{color: "white"}}>exactly 3.52 Kardashians?</Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6} align={"center"}>
                    <Grid item xs={12} mb={2} mt={2}>
                        <Typography variant={"h4"} style={{color: "white"}}><strong>
                            Scan
                            History</strong></Typography>
                    </Grid>
                    <Paper style={{height: 320, width: "90%"}}>
                        <TableVirtuoso
                            data={rows}
                            components={VirtuosoTableComponents}
                            fixedHeaderContent={fixedHeaderContent}
                            itemContent={rowContent}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
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
          <Navbar />
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
              <AccountInfo/>
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
        <Grid className="gradient_background">
          <Grid container component="main" sx={{ height: '100vh' }}>
            <Grid className="gradient_background" item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Navbar />
                <WhiteIndicatorTabs onChange={handleChange}>
                  <Tabs value={tabValue} onChange={handleChange} sx={{ width: '100%' }}>
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
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="Email"
                      style={tabStylePhone}
                      autoFocus
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="Password"
                      style={tabStylePhone}
                      autoFocus
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      label="Postcode"
                      style={tabStylePhone}
                      autoFocus
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
                      }}>Edit</Button> <br />
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
