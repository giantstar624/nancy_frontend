import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import Promo from './pages/Promo';
import Post from './pages/Post';
import Page404 from './pages/Page404';
import Review from './pages/Review';
import DashboardAppPage from './pages/DashboardAppPage';
import AdminPage from './pages/AdminPage';
import AdminChat from './pages/adminchat/AdminChat';
import Profile from './pages/Profile';
import ResetPassword from './pages/ResetPassword';
// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage confirmed={false}/> },
        { path: 'app/mail-confirmed', element: <DashboardAppPage confirmed/> },
        { path: 'post', element: <Post /> },
        { path: 'review', element: <Review /> },
        { path: 'promo', element: <Promo /> },
        { path: 'chat', element: <AdminChat /> },
        { path: 'profile', element: sessionStorage.getItem('username') ? <Profile /> : <Page404 /> },
      ],
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '/admin',  element: sessionStorage.getItem('role') > 0 ? <AdminPage /> : <Navigate to="/404" />},
        { path: '/reset-password',  element: <ResetPassword /> },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
