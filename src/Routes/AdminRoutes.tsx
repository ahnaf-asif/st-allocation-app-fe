import { RouteType } from './Types';
import {
  AccountSettings,
  AdminConfiguration,
  AdminDashboard,
  AdminRoutine,
  RoomManagement,
  StManagement,
  SuperAdmin
} from '@/Pages/AdminPages';

export const AdminRoutes: RouteType[] = [
  {
    path: '/admin',
    element: <AdminDashboard />
  },
  {
    path: '/admin/super',
    element: <SuperAdmin />
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
