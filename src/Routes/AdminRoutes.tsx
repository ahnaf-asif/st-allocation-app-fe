import { RouteType } from './Types';
import {
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
  }
];
