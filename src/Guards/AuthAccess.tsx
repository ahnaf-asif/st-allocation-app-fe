import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '@/Redux/hooks';
import { checkJwtExpiration } from './helpers';
import { clearAuth, updateAuth } from '@/Redux/Slices/AuthSlice';
import { LoadingOverlay } from '@mantine/core';

export const AuthGuard = ({ children }: any) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.dispatched) {
      const jwtToken = localStorage.getItem('jwtToken');
      if (!jwtToken && pathname !== '/login') {
        dispatch(clearAuth());
        navigate('/login');
      } else if (jwtToken && !auth.user) {
        const expired = !checkJwtExpiration(jwtToken);
        if (expired && pathname !== '/login') {
          dispatch(clearAuth());
          navigate('/login');
        } else {
          dispatch(updateAuth(jwtToken));
        }
      }
    } else {
      const jwtToken = localStorage.getItem('jwtToken');
      if (!jwtToken) {
        dispatch(clearAuth());
        navigate('/login');
      } else {
        const expired = !checkJwtExpiration(jwtToken);
        if (expired && pathname !== '/login') {
          dispatch(clearAuth());
          navigate('/login');
        }
      }
    }
  }, [pathname]);

  if (auth.loading) {
    return (
      <>
        <LoadingOverlay visible />
      </>
    );
  }
  if (auth.dispatched && !auth.user) {
    return (
      <>
        <LoadingOverlay visible />
      </>
    );
  } else return <>{children}</>;
};
