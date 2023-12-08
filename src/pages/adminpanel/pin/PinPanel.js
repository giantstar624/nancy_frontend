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

import SecurityIcon from '@mui/icons-material/Security';

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

const PinPanel = ({
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
            // console.log(res);
        });
    }

    const [profileData, setProfileData] = useState({
        avatar: null,
        username: "",
        oldPin: "",
        newPin: "",
        confirmPin: "",
    });

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
                    <Box>
                        <Box sx={{display:"flex", alignItems:"center"}}>
                            <SecurityIcon sx={{mr:1}}/> <h2>Pin Security</h2>
                        </Box>

                        <FormLabel>You can change pin here</FormLabel>
                        <Grid container>
                            <Grid item md={4} xs={12} sm={12} sx={{p: 1}}>
                            <FormLabel sx={{color:"#ffffff"}}>Old Pin:</FormLabel>
                            <TextField
                                placeholder="Enter your old pin"
                                type={"pin"}
                                value={profileData.oldPin}
                                onChange={(e)=>setProfileData({...profileData, oldPin: e.target.value})}
                                sx={{ width: "100%" }}
                            />
                            </Grid>
                            <Grid item md={4} xs={12} sm={12} sx={{p: 1}}>
                            <FormLabel sx={{color:"#ffffff"}}>New Pin:</FormLabel>
                            <OutlinedInput
                                placeholder="Create a strong new pin"
                                type={"pin"}
                                value={profileData.newPin}
                                onChange={(e)=>setProfileData({...profileData, newPin: e.target.value})}
                                sx={{ width: "100%" }}
                            />
                            </Grid>
                            <Grid item md={4} xs={12} sm={12} sx={{p: 1}}>
                            <FormLabel sx={{color:"#ffffff"}}>Confirm Pin:</FormLabel>
                            <TextField
                                placeholder="Confirm your new pin"
                                type={"pin"}
                                value={profileData.confirmPin}
                                onChange={(e)=>setProfileData({...profileData, confirmPin: e.target.value})}
                                sx={{ width: "100%" }}
                            />
                            </Grid>
                        </Grid>
                        <Box
                            sx={{
                            display:"flex",
                            justifyContent:"center",
                            mt: 6
                            }}
                        >
                            <ColorButton>SAVE CHANGES</ColorButton>
                        </Box>
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
export default connect(null, mapDispatchToProps)(PinPanel);