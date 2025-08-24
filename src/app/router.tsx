import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
const Home = lazy(() => import('@/features/home/index'));

const router = createBrowserRouter([
  {
    element: <Home />,
    path: '/',
  },
]);
export default router;
