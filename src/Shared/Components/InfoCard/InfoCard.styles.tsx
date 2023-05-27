import React from 'react';
import styled from 'styled-components';
import { Box, Text } from '@mantine/core';

export const StyledInfoCardWrapper = styled.div`
  height: 100%;
  width: 100%;
  border: 1px solid #e1d8d8;
  cursor: default;
  &:hover {
    transform: scale(1.005);
  }
`;

export const StyledCardContent = styled(Box)<{ bgcolor: string; textcolor: string }>`
  background: ${({ bgcolor }) => bgcolor};
  color: ${({ textcolor }) => textcolor};

  padding: 30px;
  width: 100%;
  height: 100%;

  @media (max-width: 550px) {
    padding: 10px 5px;
  }
`;

export const StyledCardData = styled(Text)`
  font-size: 16px;
  font-weight: 600;

  @media (max-width: 550px) {
    font-size: 17px;
  }
`;

export const StyledCardTitle = styled(Text)`
  font-size: 16px;
  text-align: center;
  font-weight: bold;
  @media (max-width: 550px) {
    font-size: 10px;
  }
`;
