import styled from 'styled-components';
import { Box, Card, Center, Grid } from '@mantine/core';

export const StyledLoginWrapperBox = styled(Box)`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

export const StyledLoginGridWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  gap: 0;
  width: 750px;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 36px;
    width: 100%;
  }
`;

export const StyledLoginLeftBox = styled(Box)`
  width: 300px;
  @media screen and (max-width: 768px) {
    width: 80%;
  }
  @media screen and (max-width: 500px) {
    width: 92%;
  }
  @media screen and (max-width: 400px) {
    width: 96%;
  }
`;

export const StyledLoginRightBox = styled(Box)`
  width: 450px;
  @media screen and (max-width: 768px) {
    width: 80%;
  }
  @media screen and (max-width: 500px) {
    width: 92%;
  }
  @media screen and (max-width: 400px) {
    width: 96%;
  }
`;

export const StyledLoginCard = styled(Card)`
  width: 100%;
  @media (max-width: 48em) {
    width: 100%;
  }
`;

export const StyledCenter = styled(Center)`
  width: 85%;
  @media (max-width: 48em) {
    width: 100%;
  }
`;
