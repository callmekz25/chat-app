import { RouterProvider } from 'react-router-dom';
import '@/app/App.css';
import router from '@/app/router';
import { useGetProfile } from '@/features/profile/profile.hook';

function App() {
  const { data, isLoading } = useGetProfile();
  console.log(data);

  if (isLoading) {
    return <p>loading....</p>;
  }
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
