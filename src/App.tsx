import { Box, Title, Center } from '@mantine/core';
import { AppRoutes } from '@/Routes';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { clearAuth, updateAuth } from '@/Redux/Slices/AuthSlice';
import { checkJwtExpiration } from '@/Guards/helpers';
import { useAppDispatch, useAppSelector } from '@/Redux/hooks';

function App() {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      pathname.includes('static-routine') ||
      pathname.includes('forgot-password') ||
      pathname.includes('password-reset')
    ) {
    } else if (!auth.dispatched) {
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

  return (
    <Box>
      <AppRoutes />
    </Box>
  );
}

export default App;
