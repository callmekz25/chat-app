import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useGetMe } from '@/features/profile/profile.hook';
import Loading from '@/shared/components/ui/loading';
import { SocketProvider } from '@/shared/contexts/socket.provider';

const ProtectedRoute = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const { data, isLoading, isError } = useGetMe();
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
