import React from 'react';
import styled from 'styled-components';
import { Box } from '@mantine/core';
import { Link } from 'react-router-dom';

import { COLOR_PALETTE } from '@/Shared/Constants';

const { blue, darkGray } = COLOR_PALETTE;

export const StyledLogoAndBurgerWrapper = styled(Box)`
  display: flex;
  column-gap: 10px;
  align-items: center;
`;
export const StyledLogoWrapper = styled(Box)`
  font-weight: bolder;
  letter-spacing: 0.5px;
  font-size: 24px;
  color: white;
  text-transform: uppercase;
  a {
    text-decoration: none;
    color: white;
  }
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const StyledProfileWrapper = styled(Box)`
  cursor: pointer;
  color: white;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const StyledBurgerContainer = styled(Box)`
  @media (min-width: 968px) {
    display: none;
  }
`;

export const StyledHeaderLink = styled(Link)`
  text-decoration: none;
  color: black;
`;
