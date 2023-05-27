import { RouteType } from './Types';

import { Home } from '@/Pages';
import { Login } from '@/Pages/DefaultPages/Login';

export const CommonRoutes: RouteType[] = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  }
];
