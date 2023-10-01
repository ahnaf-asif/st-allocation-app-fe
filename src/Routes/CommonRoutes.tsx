import { RouteType } from './Types';

import { Home, Login, ForgotPassword, ResetPassword } from '@/Pages';

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
    path: '/forgot-password',
    element: <ForgotPassword />
  },
  {
    path: '/password-reset/:token',
    element: <ResetPassword />
  }
];
