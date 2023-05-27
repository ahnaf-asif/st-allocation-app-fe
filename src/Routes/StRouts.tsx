import { RouteType } from './Types';

import { StDashboard, StPeriods } from '@/Pages/StPages';

export const stRouts: RouteType[] = [
  {
    path: '/st',
    element: <StDashboard />
  },
  {
    path: '/st/periods',
    element: <StPeriods />
  }
];
