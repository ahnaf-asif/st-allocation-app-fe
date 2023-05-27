import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppShell, Navbar, Header, NavLink, Divider } from '@mantine/core';
import { IconLogout, IconSettings, IconUsers } from '@tabler/icons-react';
import { motion } from 'framer-motion';

import { Sidebar, CustomHeader } from './components';

import { StyledMainContainer, StyledSidebarProfileWrapper } from './Layout.styles';
import { COLOR_PALETTE } from '@/Shared/Constants';
import { AuthGuard } from '@/Guards/AuthAccess';
import { useAppDispatch, useAppSelector } from '@/Redux/hooks';
import { notifications } from '@mantine/notifications';
import { ChangePassword } from '@/Shared/Components';
import { clearAuth } from '@/Redux/Slices/AuthSlice';
export const Layout = ({ children, admin, both }: any) => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [smallDevice, setSmallDevice] = useState(false);
  const auth = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [changePasswordModal, setChangePasswordModal] = useState(false);

  useEffect(() => {
    const handleWindowResize = () => {
      setSmallDevice(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  useEffect(() => {
    if (smallDevice) {
      setOpen(false);
    }
  }, [smallDevice]);

  useEffect(() => {
    if (!both) {
      if (admin && auth.user && !auth.user.isAdmin) {
        navigate('/st');
      } else if (!admin && auth.user && auth.user.isAdmin) {
        navigate('/admin');
      }
    }
  }, [admin, auth, both]);

  const changePasswordClicked = () => {
    setChangePasswordModal(true);
  };

  const closeChangePassword = (passwordChanged: boolean) => {
    if (passwordChanged) {
      notifications.show({
        title: 'Success!!!',
        message: 'Successfully updated the password',
        color: 'green'
      });
    }

    setChangePasswordModal(false);
  };

  const signOut = async () => {
    dispatch(clearAuth());
    navigate('/login');
  };

  return (
    <AuthGuard admin>
      <AppShell
        navbarOffsetBreakpoint="md"
        navbar={
          <Navbar width={{ base: 220 }} hidden={!open}>
            <Navbar.Section grow mt="md" sx={{ marginTop: '0 !important' }}>
              <Sidebar admin={admin} />
            </Navbar.Section>
            <Navbar.Section m={-10} p={10}>
              <StyledSidebarProfileWrapper>
                <Divider />
                <NavLink
                  onClick={changePasswordClicked}
                  label="Update Password"
                  icon={<IconSettings size={16} stroke={1.5} />}
                />
                <Divider />
                <NavLink
                  onClick={signOut}
                  label="Logout"
                  icon={<IconLogout size={16} stroke={1.5} />}
                />
              </StyledSidebarProfileWrapper>
            </Navbar.Section>
          </Navbar>
        }
        header={
          <Header sx={{ background: COLOR_PALETTE.blue, color: 'white' }} height={80} p="xs">
            <CustomHeader smallDevice={smallDevice} burgerAction={setOpen} />
          </Header>
        }
      >
        <motion.div
          key={pathname}
          initial="pageInitial"
          animate="pageAnimate"
          variants={{
            pageInitial: {
              opacity: 0
            },
            pageAnimate: {
              opacity: 1,
              transition: {
                delay: 0.06
              }
            }
          }}
        >
          <StyledMainContainer>{children}</StyledMainContainer>
          <ChangePassword
            openChangePassword={changePasswordModal}
            closeChangePassword={closeChangePassword}
            userId={auth.user ? auth.user?.id : -1}
          />
        </motion.div>
      </AppShell>
    </AuthGuard>
  );
};
