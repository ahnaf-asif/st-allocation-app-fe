import { useLocation } from 'react-router-dom';
import { Box, Center, Divider, Text, Title } from '@mantine/core';

import { sidebarMenu, adminSidebarMenu } from './SidebarConstants';
import { StyledSidebarLink, StyledSidebarLinkWrapper } from './Sidebar.styles';
import { COLOR_PALETTE } from '@/Shared/Constants';
import { useAppSelector } from '@/Redux/hooks';
import { IconHome } from '@tabler/icons-react';

export const Sidebar = ({ admin }: any) => {
  const { pathname } = useLocation();
  const auth = useAppSelector((state) => state.auth);
  const menu = admin ? adminSidebarMenu : sidebarMenu;

  return (
    <Box mt={20}>
      {auth?.user?.isSuperAdmin && (
        <Box sx={{ overflow: 'auto' }}>
          <StyledSidebarLinkWrapper>
            <StyledSidebarLink
              to={'/admin/super'}
              active={pathname === '/admin/super' ? 'active' : 'inactive'}
            >
              <IconHome size={20} stroke={1.5} style={{ marginBottom: '-4px' }} />
              &nbsp;Super Admin
            </StyledSidebarLink>
          </StyledSidebarLinkWrapper>
        </Box>
      )}
      {menu.map(({ title, link, icon }, index) => (
        <Box key={index} sx={{ overflow: 'auto' }}>
          <StyledSidebarLinkWrapper>
            <StyledSidebarLink to={link} active={link === pathname ? 'active' : 'inactive'}>
              {icon}
              &nbsp;{title}
            </StyledSidebarLink>
          </StyledSidebarLinkWrapper>
        </Box>
      ))}
    </Box>
  );
};
