import { useLocation } from 'react-router-dom';
import { Box, Center, Divider, Text, Title } from '@mantine/core';

import { sidebarMenu, adminSidebarMenu } from './SidebarConstants';
import { StyledSidebarLink, StyledSidebarLinkWrapper } from './Sidebar.styles';
import { CURRENT_SEMESTER } from '@/Config';
import { COLOR_PALETTE } from '@/Shared/Constants';

export const Sidebar = ({ admin }: any) => {
  const { pathname } = useLocation();

  const menu = admin ? adminSidebarMenu : sidebarMenu;

  return (
    <Box mt={20}>
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
