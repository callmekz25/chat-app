import DirectInbox from '@/features/messages';
import Layout from '@/layouts';
import MessageLayout from '@/layouts/message-layout';
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
const Home = lazy(() => import('@/features/home/index'));
const Login = lazy(() => import('@/features/auth/pages/login'));
const Register = lazy(() => import('@/features/auth/pages/register'));

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        element: <Home />,
        path: '/',
      },
      {
        element: <MessageLayout />,
        children: [
          {
            element: <DirectInbox />,
            path: '/direct/inbox',
          },
        ],
      },
    ],
  },
  {
    element: <Login />,
    path: '/login',
  },
  {
    element: <Register />,
    path: '/register',
  },
]);
export default router;
