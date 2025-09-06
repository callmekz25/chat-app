import { RouterProvider } from 'react-router-dom';
import '@/app/App.css';
import router from '@/app/router';
import { SocketProvider } from '@/shared/contexts/socket.provider';

function App() {
  return (
    <>
      <SocketProvider>
        <RouterProvider router={router} />
      </SocketProvider>
    </>
  );
}

export default App;
