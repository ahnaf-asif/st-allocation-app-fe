import { Box, Center } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

import { IInfoCardProps } from './InfoCardTypes';
import {
  StyledCardContent,
  StyledCardData,
  StyledCardTitle,
  StyledInfoCardWrapper
} from './InfoCard.styles';

export const InfoCard = ({
  logo,
  data,
  title,
  order,
  bgColor,
  pageRoute,
  textColor
}: IInfoCardProps) => {
  const navigate = useNavigate();

  const handleJumpToThePage = (route: any) => {
    if (route) {
      navigate(route);
    }
  };

  return (
    <StyledInfoCardWrapper onClick={() => handleJumpToThePage(pageRoute)}>
      {/*@ts-ignore*/}
      <StyledCardContent bgcolor={bgColor as string} textcolor={textColor as string}>
        <Box>
          <Center>{logo}</Center>
          <Center>
            <StyledCardData>{data}</StyledCardData>
          </Center>
          <Center>
            <StyledCardTitle>{title}</StyledCardTitle>
          </Center>
        </Box>
      </StyledCardContent>
    </StyledInfoCardWrapper>
  );
};
