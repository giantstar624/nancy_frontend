import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Backdrop() {
  return {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: alpha('#090a34ad', 0.8),
        },
        invisible: {
          background: 'transparent',
        },
      },
    },
  };
}
