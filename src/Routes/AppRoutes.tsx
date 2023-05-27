import { useRoutes } from 'react-router-dom';

import { AdminRoutes } from './AdminRoutes';
import { CommonRoutes } from './CommonRoutes';
import { stRouts } from './StRouts';
import { NotFound } from '@/Pages';

export const AppRoutes = () => {
  return useRoutes([
    ...CommonRoutes,
    ...AdminRoutes,
    ...stRouts,
    {
      path: '*',
      element: <NotFound />
    }
  ]);
};
