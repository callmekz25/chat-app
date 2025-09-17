import { MenuActionType } from '@/shared/constants/menu';
import { type MenuItem } from '@/types/menu-item';
import React from 'react';
import { Link } from 'react-router-dom';

const MenuItem = ({
  item,
  isActive,
  onOpenModal,
}: {
  item: MenuItem;
  isActive: boolean;
  onOpenModal: (id: string) => void;
}) => {
  switch (item.type) {
    case MenuActionType.LINK:
      if (!item.url) return null;
      return (
        <Link
          to={item.url}
          className='flex p-3 w-full hover:bg-[#262626] transition-all duration-200 rounded-lg my-1 font-normal text-[16px] items-center'
        >
          {isActive
            ? React.cloneElement(item.icon as React.ReactElement, {
                fill: isActive,
              })
            : item.icon}
          <span className={`pl-4 ${isActive ? ' font-bold' : ''}`}>
            {item.title}
          </span>
        </Link>
      );
    case MenuActionType.MODAL:
      return (
        <button
          onClick={() => onOpenModal(item.id)}
          className='flex p-3 w-full hover:bg-[#262626] transition-all duration-200 rounded-lg my-1 font-normal text-[16px] items-center'
        >
          {isActive
            ? React.cloneElement(item.icon as React.ReactElement, {
                fill: isActive,
              })
            : item.icon}
          <span className={`pl-4 ${isActive ? ' font-bold' : ''}`}>
            {item.title}
          </span>
        </button>
      );
    case MenuActionType.DROPDOWN:
      return (
        <button className='flex p-3 w-full hover:bg-[#262626] transition-all duration-200 rounded-lg my-1 font-normal text-[16px] items-center'>
          {isActive
            ? React.cloneElement(item.icon as React.ReactElement, {
                fill: isActive,
              })
            : item.icon}
          <span className={`pl-4 ${isActive ? ' font-bold' : ''}`}>
            {item.title}
          </span>
        </button>
      );
  }
};
export default MenuItem;
