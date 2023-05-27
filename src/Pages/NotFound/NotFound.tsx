import { Box, Center, Text, Title } from '@mantine/core';

import { notFoundJpg } from '@/Shared/Images';
import { StyledNotFoundImg } from '@/Pages/NotFound/NotFound.styles';
import { StyledLink } from '@/Shared/Components';

export const NotFound = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Box>
        <Center>
          <StyledNotFoundImg src={notFoundJpg} alt="Page Not Found" />
        </Center>
        <Center>
          <Text align="center" size={20}>
            The page you were looking for couldn't be found{' '}
          </Text>
        </Center>
        <Center>
          <Text align="center" mt={20} size={20} weight="bold">
            Please go back to <StyledLink to="/">Home Page</StyledLink>
          </Text>
        </Center>
      </Box>
    </Box>
  );
};
