import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

// @mui
import { Box, Drawer, Typography, Stack } from '@mui/material';

// hooks
import useResponsive from '../../../hooks/useResponsive';
// components
import Logo from '../../../components/logo';
import Scrollbar from '../../../components/scrollbar';
import NavSection from '../../../components/nav-section';
//
import navConfig from './config';

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

// ----------------------------------------------------------------------


const Nav = ({ openNav, onCloseNav, role, isLogin }) => {
  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
        backgroundColor:"#232323"
      }}
    >
      <Box sx={{ px: 1, py: 1, display: 'inline-flex', textAlign: 'center', justifyContent: 'left' }}>
        <Logo />
      </Box>

      <NavSection data={navConfig} role={role} isLogin={isLogin}/>

    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
        backgroundColor:"white"
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: 'black',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
            bgcolor: 'black',
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

const mapStateToProps = ({ userModule }) => ({
  isLogin: userModule.userData.auth,
  role: userModule.userData.role
})

export default connect(mapStateToProps, null)(Nav);