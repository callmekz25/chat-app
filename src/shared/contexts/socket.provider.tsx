import { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SocketContext = createContext<Socket | null>(null);
export const useSocket = () => useContext(SocketContext);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);

  const connectSocket = (token: string) => {
    const s = io('http://localhost:8000', {
      transports: ['websocket'],
      auth: { token },
    });
    setSocket(s);
    return () => s.disconnect();
  };

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    let cleanup: (() => void) | undefined;
    if (token) cleanup = connectSocket(token);

    const onTokenUpdate = () => {
      const newToken = localStorage.getItem('access_token');
      if (newToken) cleanup = connectSocket(newToken);
    };

    window.addEventListener('access_token_updated', onTokenUpdate);
    return () => {
      cleanup?.();
      window.removeEventListener('access_token_updated', onTokenUpdate);
    };
  }, []);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
