import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import {
    Grid,
    FormLabel,
    Box,
    Button,
    TextField,
    OutlinedInput
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { connect, useSelector, useDispatch } from 'react-redux';

import {
    getMaq,
    chagneMaq,
} from '../../../redux/admin/actions';

const ColorButton = styled(Button)(({ theme }) => ({
    color: "#ffffff",
    backgroundColor: "#9c27b0",
    '&:hover': {
      backgroundColor: "#a242b3",
    },
  }));

const MaqPanel = ({
    getMaq,
    chagneMaq,
}) => {


    const dispatch = useDispatch();
    const adminModule = useSelector((state) => state.adminModule);
    const curMaqData = adminModule.maqText;
    const {_id, text} = curMaqData;

    const [maqText, setMaqText] = useState("");

    const changeMaqText = () => {
        chagneMaq({id:_id, text:maqText}, res=>{
            console.log(res);
        });
    }

    return (
        <>
            <Box 
                sx={{
                    width:"100%",
                    display:"flex",
                    justifyContent: "end",
                    mb: 1,
                    mt: 1
                }}
            >
                <Grid sx={{width:"100%", mt:1, mb:1}}>
                    <Box sx={{mb: 1}}>
                    <Box sx={{mb: 2}}><FormLabel>Current Notification: {text} </FormLabel></Box>

                    <FormLabel sx={{color:"#ffffff"}}>New Notification:</FormLabel>
                    <TextField
                        placeholder="Please enter new notification"
                        variant="outlined"
                        type={"text"}
                        value={maqText}
                        onChange={(e)=>setMaqText(e.target.value)}
                        sx={{ width: "100%" }}
                        multiline
                        maxRows={2}
                    />
                    </Box>
                    <Box
                    sx={{
                        display:"flex",
                        justifyContent:"center",
                        mt: 6
                    }}
                    >
                    <ColorButton onClick={changeMaqText}>Save Changes</ColorButton>
                    </Box>
                </Grid>
            </Box>
        </>
    );
}

const mapDispatchToProps = (dispatch) => ({
    getMaq: () => dispatch(getMaq()),
    chagneMaq: (data, cb) => dispatch(chagneMaq(data, cb)),
})
export default connect(null, mapDispatchToProps)(MaqPanel);