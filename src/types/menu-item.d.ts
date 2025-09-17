import { MenuActionType } from '@/shared/constants';

export type MenuItem = {
  id: string;
  title: string;
  icon: React.ReactNode;
  type: MenuActionType;
  url?: string;
  exact: boolean;
};
