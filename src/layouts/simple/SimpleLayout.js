import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
// @mui
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { handleAlert } from '../../redux/user/actions';


// ----------------------------------------------------------------------

const Alert = React.forwardRef((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SimpleLayout() {

  const dispatch = useDispatch();
  const userModule = useSelector((state) => state.userModule);
  const msg = userModule.msg;
  const handleClose = () => {
    dispatch(handleAlert())
  }

  return (
    <>
      <Outlet/>

      <Snackbar open={msg.show} autoHideDuration={60000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={msg.type} sx={{ width: '100%' }}>
          {msg.content}
        </Alert>
      </Snackbar>
    </>
  );
}
