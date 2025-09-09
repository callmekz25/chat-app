import Logo from '@/assets/logo.png';
import { useGetMe } from '@/features/profile/profile.hooks';
import { getMenu } from '@/shared/constants';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Avatar from '@/shared/components/ui/avatar';
import React from 'react';
const Layout = () => {
  const { data } = useGetMe();
  const menu = getMenu(data?.user.user_name ?? '');
  const { pathname } = useLocation();

  return (
    <div className='flex'>
      <div className='flex flex-col px-3 pb-5 pt-2 sticky top-0   h-[100dvh] max-w-[250px] w-[250px] border-r border-gray-800'>
        <div className='h-[73px] mb-[19px] pt-[25px] pb-4 '>
          <img src={Logo} alt='logo' className='w-auto object-cover size-10' />
        </div>
        <ul className='flex flex-col h-full'>
          {menu.map((item) => {
            const isActive =
              item.url === '/'
                ? pathname === '/'
                : pathname.startsWith(item.url);
            return (
              <li
                key={item.title}
                className={`${item.title === 'More' ? 'mt-auto' : ''}`}
              >
                <Link
                  to={item.url}
                  className='flex p-3 w-full hover:bg-[#262626] transition-all duration-200 rounded-lg my-1 font-normal text-[16px] items-center'
                >
                  {item.title === 'Profile' ? (
                    <Avatar className='size-6' />
                  ) : (
                    item.icon &&
                    React.cloneElement(item.icon as React.ReactElement, {
                      fill: isActive,
                    })
                  )}
                  <span className={`pl-4 ${isActive ? ' font-bold' : ''}`}>
                    {item.title}
                  </span>
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
