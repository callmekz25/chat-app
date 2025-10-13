import DirectInbox from '@/modules/directs/pages';
import MessageLayout from '@/layouts/message-layout';
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './protected-route';
const Login = lazy(() => import('@/modules/auth/pages/login'));
const Register = lazy(() => import('@/modules/auth/pages/register'));
const Direct = lazy(() => import('@/modules/directs/pages/direct'));
const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MessageLayout />,
        children: [
          {
            element: <DirectInbox />,
            path: '/direct',
          },
          {
            element: <Direct />,
            path: '/direct/t/:conversationId',
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
