import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useGetMe } from '@/modules/profile/profile.hooks';
import Loading from '@/shared/components/ui/loading';
import { SocketProvider } from '@/shared/contexts/socket.provider';

const ProtectedRoute = () => {
  const { pathname } = useLocation();

  const { data, isLoading, isError } = useGetMe();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (isLoading) {
    return <Loading />;
  }

  if (!data || isError) {
    return <Navigate to='/login' />;
  }

  return (
    <SocketProvider>
      <Outlet />
    </SocketProvider>
  );
};

export default ProtectedRoute;
