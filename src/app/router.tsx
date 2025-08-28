import Layout from '@/layouts';
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
