import CreateIcon from '../components/icons/create-icon';
import ExploreIcon from '../components/icons/explore-icon';
import HeartIcon from '../components/icons/heart-icon';
import HomeIcon from '../components/icons/home-icon';
import MessageIcon from '../components/icons/message-icon';
import MoreIcon from '../components/icons/more-icon';
import ReelIcon from '../components/icons/reel-icon';
import SearchIcon from '../components/icons/search-icon';
import Avatar from '../components/ui/avatar';

export enum MenuActionType {
  LINK = 'link',
  MODAL = 'modal',
  DROPDOWN = 'dropdown',
}

export const getMenu = (user_name: string) => [
  {
    id: 'home',
    title: 'Home',
    icon: <HomeIcon />,
    type: MenuActionType.LINK,
    url: '/',
    exact: true,
  },
  {
    id: 'search',
    title: 'Search',
    icon: <SearchIcon />,
    type: MenuActionType.MODAL,
    exact: true,
  },
  {
    id: 'explore',
    title: 'Explore',
    icon: <ExploreIcon />,
    type: MenuActionType.LINK,
    url: '/explore',
    exact: true,
  },
  {
    id: 'reels',
    title: 'Reels',
    icon: <ReelIcon />,
    type: MenuActionType.LINK,
    url: '/reels',
    exact: true,
  },
  {
    id: 'messages',
    title: 'Messages',
    icon: <MessageIcon />,
    type: MenuActionType.LINK,
    url: '/direct',
    exact: false,
  },
  {
    id: 'notifications',
    title: 'Notifications',
    icon: <HeartIcon />,
    type: MenuActionType.DROPDOWN,
    exact: true,
  },
  {
    id: 'create',
    title: 'Create',
    icon: <CreateIcon />,
    type: MenuActionType.MODAL,
    exact: true,
  },
  {
    id: 'profile',
    title: 'Profile',
    icon: <Avatar className='size-6' />,
    type: MenuActionType.LINK,
    url: `/${user_name}`,
    exact: true,
  },
  {
    id: 'more',
    title: 'More',
    icon: <MoreIcon />,
    type: MenuActionType.DROPDOWN,
    exact: true,
  },
];
