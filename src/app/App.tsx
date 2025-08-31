import { RouterProvider } from 'react-router-dom';
import '@/app/App.css';
import router from '@/app/router';
import { useNProgress } from '@/shared/hooks/use-progress-loading';

function App() {
  useNProgress();
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
