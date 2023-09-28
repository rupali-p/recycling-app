import React, {useState} from 'react';
import {
    TextField,
} from '@mui/material';

//Method to show result


//Figure out dummy page layout
const Result = () => {
return (
  <div>
     <TextField
                            type="text"
                            variant='outlined'
                            color='secondary'
                            label="Result"
                            value="testing"
                            required
                        />
  </div>
)
}
export default Result;
