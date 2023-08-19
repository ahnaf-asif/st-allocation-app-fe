import { RouteType } from './Types';

import { Home } from '@/Pages';
import { Login } from '@/Pages/DefaultPages/Login';
import { AdminStaticRoutine } from '@/Pages/AdminPages';

export const CommonRoutes: RouteType[] = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/static-routine-cSVWGXHZtAeWibOft54o',
    element: <AdminStaticRoutine />
  }
];
