import { Link } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';

import { COLOR_PALETTE } from '@/Shared/Constants';

const { blue, darkGray, lightHoverBlue } = COLOR_PALETTE;

export const StyledSidebarLink = styled(Link)<{ active: string }>`
  text-decoration: none;
  display: block;
  padding: 15px 20px;
  color: ${({ active }) => (active === 'active' ? blue : darkGray)};

  &:hover {
    background: ${blue};
    color: white;
  }
`;

export const StyledSidebarLinkWrapper = styled.div``;
