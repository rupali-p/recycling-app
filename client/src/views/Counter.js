import * as React from "react";
import "../css/Common.css";
import Grid from "@mui/material/Grid";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso, TableComponents } from 'react-virtuoso';

//dummy photo inserts
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



const Counter = () => {
    function createData(
        image,
        classification,
        date
      ) 
      {
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

    return (
        <div>
        <div className="gradient_background">
            <div>
                <Grid container columns={2} sx={{ p: 5 }}>
                <Grid item xs={1}>
                    <h>Hamlet.</h>
                </Grid>

                <Grid item xs={1} sx={{ p: 5}}>
                    <Box display="flex" justifyContent="flex-end">
                    <MenuIcon style={{ color: "white" }} fontSize="large" />
                    </Box>
                </Grid>
                </Grid>

                <Grid container columns={2}>
                    <Grid item xs={1}>
                        <div className="section-left">
                            <h1>
                            You've scanned
                            </h1>

                            <br />

                            <p style={{display: 'inline-block'}}>
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

                    <Grid item xs={1}>
                        <div className="section-right">
                            <h1 >
                                Scan History
                            </h1>

                            <div className="table-container">
                                <Paper style={{ height: 350, width: '90%'}}> 
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
        <div></div>
    </div>
    );
};

export default Counter;