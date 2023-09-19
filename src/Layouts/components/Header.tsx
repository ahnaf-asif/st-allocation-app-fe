import { Link, useNavigate } from 'react-router-dom';
import { Flex, Box, Menu, Burger, Image, Text } from '@mantine/core';
import {
  IconChevronDown,
  IconChevronRight,
  IconLogout,
  IconSettings,
  IconUsers
} from '@tabler/icons-react';

import {
  StyledBurgerContainer,
  StyledHeaderLink,
  StyledLogoAndBurgerWrapper,
  StyledLogoWrapper,
  StyledProfileWrapper
} from './Header.styles';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/Redux/hooks';
import { clearAuth } from '@/Redux/Slices/AuthSlice';
import { ChangePassword } from '@/Shared/Components';
import { notifications } from '@mantine/notifications';
import { CURRENT_SEMESTER, CURRENT_DEPARTMENT } from '@/Config';

export const Header = ({ burgerAction, smallDevice }: any) => {
  const [menuClicked, setMenuClicked] = useState(false);
  const [burgerOpened, setBurgerOpened] = useState(false);
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [changePasswordModal, setChangePasswordModal] = useState(false);

  const burgerClicked = () => {
    const currentState = burgerOpened;

    burgerAction(!currentState);
    setBurgerOpened(!currentState);
  };

  const signOut = async () => {
    dispatch(clearAuth());
    navigate('/login');
  };

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

  return (
    <Flex justify="space-between" align="center" h="100%" p="10px">
      <StyledLogoAndBurgerWrapper>
        <StyledBurgerContainer>
          <Burger color="white" opened={burgerOpened} onClick={burgerClicked} />
        </StyledBurgerContainer>

        <StyledLogoWrapper>
          <Link to={'/'}>
            <span>
              ST PANEL({CURRENT_DEPARTMENT})
              <span style={{ fontSize: '14px' }}> - {CURRENT_SEMESTER}</span>
            </span>
          </Link>
        </StyledLogoWrapper>
      </StyledLogoAndBurgerWrapper>
      <Box>
        <Menu opened={menuClicked} onChange={setMenuClicked} shadow="md">
          <Menu.Target>
            <StyledProfileWrapper>
              <Flex align="center">
                <Text> {auth.user && auth.user.name}</Text>
                {menuClicked ? <IconChevronDown size={18} /> : <IconChevronRight size={18} />}
              </Flex>
            </StyledProfileWrapper>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>User Menu</Menu.Label>
            <Menu.Item icon={<IconSettings size={14} />} onClick={changePasswordClicked}>
              Change Password
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item color="red" icon={<IconLogout size={14} />} onClick={signOut}>
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
        <ChangePassword
          openChangePassword={changePasswordModal}
          closeChangePassword={closeChangePassword}
          userId={auth.user ? auth.user?.id : -1}
        />
      </Box>
    </Flex>
  );
};
