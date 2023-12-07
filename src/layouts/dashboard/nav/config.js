// component
import HomeIcon from '@mui/icons-material/Home';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import RateReviewIcon from '@mui/icons-material/RateReview';
import DiamondIcon from '@mui/icons-material/Diamond';

// ----------------------------------------------------------------------

const navConfig = [
  {
    title: 'Home',
    path: '/dashboard/app',
    icon: <HomeIcon />,
    auth: false,
  },
  {
    title: 'Posts',
    path: '/dashboard/post',
    icon: <LocalPostOfficeIcon />,
    auth: false,
  },
  {
    title: 'Reviews',
    path: '/dashboard/review',
    icon: <RateReviewIcon />,
    auth: false,
  },
  {
    title: 'Promotions',
    path: '/dashboard/promo',
    icon: <DiamondIcon />,
    auth: false,
  }
];

export default navConfig;
