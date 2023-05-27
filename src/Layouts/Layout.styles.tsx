import { Box, Navbar } from '@mantine/core';
import styled from 'styled-components';

export const StyledMainContainer = styled(Box)`
  margin: 20px;

  @media (max-width: 768px) {
    margin: 0;
  }
`;

export const StyledSidebarProfileWrapper = styled(Box)`
  background: #f5fbff;
  @media (min-width: 768px) {
    display: none;
  }
`;
