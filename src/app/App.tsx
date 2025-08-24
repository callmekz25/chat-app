import { RouterProvider } from 'react-router-dom';
import '@/app/App.css';
import router from '@/app/router';

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
