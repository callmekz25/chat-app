import DirectInbox from '@/features/messages/pages';
import Layout from '@/layouts';
import MessageLayout from '@/layouts/message-layout';
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './protected-route';
const Home = lazy(() => import('@/features/home/index'));
const Login = lazy(() => import('@/features/auth/pages/login'));
const Register = lazy(() => import('@/features/auth/pages/register'));
const Profile = lazy(() => import('@/features/profile/pages/index'));
const Direct = lazy(() => import('@/features/messages/pages/direct'));
const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            element: <Home />,
            path: '/',
          },
          {
            element: <Profile />,
            path: '/:user_name',
          },
          {
            element: <MessageLayout />,
            children: [
              {
                element: <DirectInbox />,
                path: '/direct/inbox',
              },
              {
                element: <Direct />,
                path: '/direct/t/:conversation_id',
              },
            ],
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
