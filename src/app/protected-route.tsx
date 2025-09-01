import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useGetMe } from '@/features/profile/profile.hook';

const ProtectedRoute = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const { data, isLoading, isError } = useGetMe();
  if (isLoading) {
    return null;
  }
  if (!data || isError) {
    return <Navigate to='/login' />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
