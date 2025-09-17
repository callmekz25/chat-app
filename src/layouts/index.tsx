import Logo from '@/assets/logo.png';
import { useGetMe } from '@/features/profile/profile.hooks';

import { Outlet, useLocation } from 'react-router-dom';
import MenuItem from '@/shared/components/ui/menu-item';
import { useState } from 'react';
import CreatePostModal from '@/features/create-post/components/create-post.modal';
import { getMenu } from '@/shared/constants/menu';
const Layout = () => {
  const { data } = useGetMe();
  const menu = getMenu(data?.user.user_name ?? '');
  const { pathname } = useLocation();
  const [openModal, setOpenModal] = useState('');

  return (
    <div className='flex'>
      <div className='flex flex-col px-3 pb-5 pt-2 sticky top-0   h-[100dvh] max-w-[250px] w-[250px] border-r border-gray-800'>
        <div className='h-[73px] mb-[19px] pt-[25px] pb-4 '>
          <img src={Logo} alt='logo' className='w-auto object-cover size-10' />
        </div>
        <ul className='flex flex-col h-full'>
          {menu.map((item) => {
            const isActive = item.exact
              ? pathname === item.url
              : pathname.startsWith(item.url ?? '');

            return (
              <li
                key={item.id}
                className={`${item.id === 'more' ? 'mt-auto' : ''}`}
              >
                <MenuItem
                  item={item}
                  isActive={isActive}
                  onOpenModal={setOpenModal}
                />
              </li>
            );
          })}
        </ul>
      </div>
      <main className='w-full flex-1'>
        <Outlet />
      </main>
      {openModal === 'create' && (
        <CreatePostModal
          open={openModal === 'create'}
          onClose={() => setOpenModal('')}
        />
      )}
    </div>
  );
};

export default Layout;
