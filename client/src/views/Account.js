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
    margin: "10px",
    color: "black",
    minWidth: "40rem",
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

    // const AccountInfo = () => {
    //   <>
    //     <Grid container spacing={2}>
    //       <Grid item xs={12}>
    //         <Grid item xs={2}>
    //
    //         </Grid>
    //       </Grid>
    //
    //     </Grid>
    //   </>
    //
    // }

    return (
        <div
            style={{
                flexDirection: "column",
                // Align children components to the start of the column
                height: "100vh", // Set the height of the container to the full viewport height
                background: "linear-gradient(to right, #12271e, #1a4d39)",
                padding: "20px", // Add some padding for better spacing
                width: "100%",
            }}
        >
            <Typography
                variant="h2"
                style={{marginBottom: "20px", color: "white", fontSize: "8rem"}}
            >
                Hamlet.
            </Typography>
            <WhiteIndicatorTabs onChange={handleChange} value={tabValue}>
                <Tabs value={tabValue} onChange={handleChange}>
                    <Tab
                        label="Account details"
                        value={0}
                        style={{
                            color: "white",
                            minWidth: "20rem",
                        }}
                    />
                    <Tab
                        label="Your Journey"
                        value={1}
                        style={{
                            color: "white",
                            minWidth: "20rem",
                        }}
                    />
                </Tabs>
            </WhiteIndicatorTabs>
            {tabValue === 0 && email && (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginTop: "50px",
                    }}
                >

                    <TextField
                        value={name}
                        variant="outlined"
                        style={tabStyle}
                        InputLabelProps={{style: {color: "black"}}}
                    />
                    <TextField
                        value={email}
                        variant="outlined"
                        style={tabStyle}
                        InputLabelProps={{style: {color: "black"}}}
                    />
                    <TextField
                        variant="outlined"
                        value={postCode}
                        autoFocus
                        style={tabStyle}
                        InputLabelProps={{style: {color: "black"}}}
                    />
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
                </div>
            )}
            {tabValue === 1 && (
                <div style={{margin: "30px"}}>
                    <div style={{flexGrow: 1}}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <div className="section-left">
                                    <h1>You've scanned</h1>

                                    <br/>

                                    <p style={{display: "inline-block"}}>
                                        <strong className="number-of-scans">27</strong> items
                                    </p>

                                    <br/>

                                    <p>
                                        <strong>Did you know</strong> that’s enough plastic to make
                                    </p>
                                    <p>exactly 3.52 Kardashians?</p>
                                </div>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <div className="section-right">
                                    <h1>Scan History</h1>
                                    <div className="table-container">
                                        <Paper style={{height: 350, width: "90%"}}>
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
    );
};

export default Account;
