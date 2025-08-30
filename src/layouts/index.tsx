import Logo from '@/assets/logo.png';
import { useGetProfile } from '@/features/profile/profile.hook';
import { MENU } from '@/shared/constants';
import { Link, Outlet } from 'react-router-dom';
import UserNone from '@/assets/user.png';
const Layout = () => {
  const { data, isLoading } = useGetProfile();
  console.log(data);

  if (isLoading) {
    return <p>loading...</p>;
  }
  return (
    <div className='flex'>
      <div className='flex flex-col px-3 pb-5 pt-2 sticky top-0   h-[100dvh] max-w-[250px] w-[250px] border-r border-gray-800'>
        <div className='h-[73px] mb-[19px] pt-[25px] pb-4 '>
          <img src={Logo} alt='logo' className='w-auto object-cover size-10' />
        </div>
        <ul className='flex flex-col h-full'>
          {MENU.map((item) => {
            return (
              <li
                key={item.title}
                className={`${item.title === 'More' ? 'mt-auto' : ''}`}
              >
                <Link
                  to={``}
                  className='flex p-3 w-full hover:bg-white/10 transition-all duration-200 rounded-lg my-1 font-normal text-[16px] items-center'
                >
                  {item.title === 'Profile' ? (
                    <img
                      src={UserNone}
                      alt=''
                      className='  size-6 aspect-square rounded-full object-contain'
                    />
                  ) : (
                    item.icon
                  )}
                  <span className='pl-4'>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <main className='w-full flex-1'>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
