import CreateIcon from './components/icons/create-icon';
import ExploreIcon from './components/icons/explore-icon';
import HomeIcon from './components/icons/home-icon';
import MessageIcon from './components/icons/message-icon';
import MoreIcon from './components/icons/more-icon';
import HeartIcon from './components/icons/heart-icon';
import ReelIcon from './components/icons/reel-icon';
import SearchIcon from './components/icons/search-icon';

export const MENU = [
  {
    title: 'Home',
    icon: <HomeIcon />,
    url: '/',
  },
  {
    title: 'Search',
    icon: <SearchIcon />,
    url: '/',
  },
  {
    title: 'Explore',
    icon: <ExploreIcon />,
    url: '/',
  },
  {
    title: 'Reels',
    icon: <ReelIcon />,
    url: '/',
  },
  {
    title: 'Messages',
    icon: <MessageIcon />,
    url: '/direct/inbox',
  },
  {
    title: 'Notifications',
    icon: <HeartIcon />,
    url: '/',
  },
  {
    title: 'Create',
    icon: <CreateIcon />,
    url: '/',
  },
  {
    title: 'Profile',
    icon: '',
    url: '/1',
  },
  {
    title: 'More',
    icon: <MoreIcon />,
    url: '/',
  },
];
