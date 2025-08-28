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
  },
  {
    title: 'Search',
    icon: <SearchIcon />,
  },
  {
    title: 'Explore',
    icon: <ExploreIcon />,
  },
  {
    title: 'Reels',
    icon: <ReelIcon />,
  },
  {
    title: 'Messages',
    icon: <MessageIcon />,
  },
  {
    title: 'Notifications',
    icon: <HeartIcon />,
  },
  {
    title: 'Create',
    icon: <CreateIcon />,
  },
  {
    title: 'Profile',
    icon: '',
  },
  {
    title: 'More',
    icon: <MoreIcon />,
  },
];
