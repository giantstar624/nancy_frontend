import React from 'react';
import { Helmet } from 'react-helmet-async';
import { connect, useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Container, AppBar, Toolbar, Box, IconButton, FormControlLabel, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import { bgBlur } from '../utils/cssStyles';
import Logo from '../components/logo';
import PostPanel from './adminpanel/post/PostPanel';
import ReviewPanel from './adminpanel/review/ReviewPanel';
import PromotionPanel from './adminpanel/promotion/Promotion';
import UserPanel from './adminpanel/user/UserPanel';
import ManagePanel from './adminpanel/manage/ManagePanel';
import BannerPanel from './adminpanel/banner/BannerPanel';
import GamesPanel from './adminpanel/games/GamesPanel';
import MaqPanel from './adminpanel/maq/MaqPanel';
import PinPanel from './adminpanel/pin/PinPanel';

const HEADER_MOBILE = 64;
const HEADER_DESKTOP = 100;

const StyledRoot = styled(AppBar)(({ theme }) => ({
    ...bgBlur({ color: theme.palette.background.default }),
    boxShadow: 'none',
    backgroundColor:"#232323",
    [theme.breakpoints.up('lg')]: {
        width: `calc(100% - 1}px)`,
    },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    minHeight: HEADER_MOBILE,
    [theme.breakpoints.up('lg')]: {
        minHeight: HEADER_DESKTOP,
        padding: theme.spacing(0, 5),
    },
}));


const AdminPage = (props) => {

    const dispatch = useDispatch();
    const userModule = useSelector((state) => state.userModule);
    const role = userModule.userData.role;


    const [value, setValue] = React.useState('Posts');

    const changeRadio = (e, value) => {
        setValue(value);
    }
    return (
        <>
            <Helmet>
                <title> Home | Nancy Room </title>
            </Helmet>
            <StyledRoot>
                <StyledToolbar>
                    <Logo />
                    <Box sx={{ flexGrow: 1 }} />
                    <NavLink
                        to={'/dashboard/app'}
                        sx={{
                            mr: 1,
                            color: 'text.primary',
                            display: { lg: 'none' },
                        }}
                    >
                        <IconButton>
                            <HomeIcon style={{ color: 'white' }} />
                        </IconButton>
                    </NavLink>
                </StyledToolbar>
            </StyledRoot>
            <Container style={{marginTop: 100}}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        onChange={changeRadio}
                        value={value}
                    >
                        <FormControlLabel value="Posts" control={<Radio />} label="Posts" />
                        <FormControlLabel value="Reviews" control={<Radio />} label="Reviews" />
                        <FormControlLabel value="Promotions" control={<Radio />} label="Promotions" />
                        <FormControlLabel value="Users" control={<Radio />} label="Users" />
                        {(role === 1 || role === "1") && <FormControlLabel value="Manage" control={<Radio />} label="Manage" />}
                        {(role === 1 || role === "1") && <FormControlLabel value="Banner" control={<Radio />} label="Banner" />}
                        {(role === 1 || role === "1") && <FormControlLabel value="Notification" control={<Radio />} label="Notification" />}
                        {(role === 1 || role === "1") && <FormControlLabel value="Games" control={<Radio />} label="Games" />}
                        {/* {(role === 1 || role === "1") && <FormControlLabel value="Pin" control={<Radio />} label="Pin" />} */}
                    </RadioGroup>
                </Box>
                {value === "Posts" && <PostPanel />}
                {value === "Reviews" && <ReviewPanel />}
                {value === "Promotions" && <PromotionPanel />}
                {value === "Users" && <UserPanel />}
                {value === "Manage" && <ManagePanel />}
                {value === "Banner" && <BannerPanel />}
                {value === "Notification" && <MaqPanel />}
                {value === "Games" && <GamesPanel />}
                {value === "Pin" && <PinPanel />}
            </Container>
        </>
    )
}

export default connect(null, null)(AdminPage);