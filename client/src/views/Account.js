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
import {Navbar} from "../components/Navbar";
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
    color: "black",
    backgroundColor: "#d9d9d9",
    borderRadius: "10px",
};

const Account = () => {
    const [council, setCouncil] = useState("");
    const [tabValue, setTabValue] = useState(0);
    const [email, setEmail] = useState();
    const [name, setName] = useState();
    const [postCode, setPostCode] = useState();
    const [scanCount, setScanCount] = useState();

    const setAccountDetails = async (userEmail) => {
        const apiPath = `/api/get-accountdetails/${userEmail}`
        await fetch(apiPath, {
            method: "GET",
        }).then((resp) => {
            resp.json().then((data) => {
                setEmail(data["Email"]);
                setName(data["Name"]);
                setPostCode(data["postcode"]);
                setScanCount(data["scan_count"])
            })
        })
    }

    useEffect(() => {
            if (!email) {
                const userName = localStorage.getItem("userName");
                setAccountDetails(userName)
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
                sx={{borderCollapse: "separate", tableLayout: "fixed"}}
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
                        sx={{
                            backgroundColor: "background.paper",
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

    return (
        <ThemeProvider theme={theme}>
            <Navbar/>
            <Grid container spacing={2}>
                <Grid item xs={12} align={"center"}>
                    <WhiteIndicatorTabs onChange={handleChange} value={tabValue}>
                        <Tabs value={tabValue} onChange={handleChange}>
                            <Tab
                                label="Account details"
                                value={0}
                                style={{
                                    color: "white",
                                }}
                                sx={{
                                    minWidth: {xs: "10rem", md: "20rem"},
                                }}
                            />
                            <Tab
                                label="Your Journey"
                                value={1}
                                style={{
                                    color: "white",
                                }}
                                sx={{
                                    minWidth: {xs: "10rem", md: "20rem"},
                                }}
                            />
                        </Tabs>

                    </WhiteIndicatorTabs>

                </Grid>
                {tabValue === 0 && email && (
                    <AccountInfo/>
                )}
                {tabValue === 1 && scanCount && (
                    <ScanHistory/>
                )}

            </Grid>
        </ThemeProvider>
    );
};

export default Account;
