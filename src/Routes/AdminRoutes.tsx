import { RouteType } from './Types';
import {
  AccountSettings,
  AdminConfiguration,
  AdminDashboard,
  AdminRoutine,
  RoomManagement,
  StManagement
} from '@/Pages/AdminPages';

export const AdminRoutes: RouteType[] = [
  {
    path: '/admin',
    element: <AdminDashboard />
  },
  {
    path: '/admin/room-management',
    element: <RoomManagement />
  },
  {
    path: '/admin/st-management',
    element: <StManagement />
  },
  {
    path: '/admin/config',
    element: <AdminConfiguration />
  },
  {
    path: '/admin/routine',
    element: <AdminRoutine />
  },
  {
    path: '/admin/account-settings',
    element: <AccountSettings />
  }
];
