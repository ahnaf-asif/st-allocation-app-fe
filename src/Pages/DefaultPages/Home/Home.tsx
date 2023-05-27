import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '@/Redux/hooks';
import { LoadingOverlay } from '@mantine/core';

const Home = () => {
  const navigate = useNavigate();
  const auth = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (auth.dispatched) {
      if (auth.user) {
        if (auth.user.isAdmin) {
          return navigate('/admin');
        } else {
          return navigate('/st');
        }
      }
    } else {
      return navigate('/login');
    }
  }, [auth]);

  return <LoadingOverlay visible />;
};

export default Home;
