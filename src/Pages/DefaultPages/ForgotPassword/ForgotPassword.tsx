import { Box, Button, Card, Center, LoadingOverlay, Text, Title } from '@mantine/core';
import {
  StyledLoginCard,
  StyledLoginGridWrapper,
  StyledLoginLeftBox,
  StyledLoginRightBox,
  StyledLoginWrapperBox
} from '@/Pages/DefaultPages/Login/Login.styles';
import { logo } from '@/Shared/Images';
import { StyledLink, StyledTextInput } from '@/Shared/Components';
import { IconMail } from '@tabler/icons-react';
import { useAppSelector } from '@/Redux/hooks';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isEmail, useForm } from '@mantine/form';
import { axios } from '@/Config';
export const ForgotPassword = () => {
  const auth = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (auth.dispatched && auth.user) {
      if (auth.user.isAdmin) {
        navigate('/admin');
      } else {
        navigate('/st');
      }
    }
  }, [auth]);

  const form = useForm({
    initialValues: {
      email: ''
    },
    validate: {
      email: isEmail()
    }
  });

  const handleSubmit = async (values: any) => {
    try {
      const resp = await axios.post('/auth/forgot-password', values);
      setSent(true);
      form.reset();
    } catch (e) {
      form.setErrors({ email: 'Unexpected Error happened. Please contact Admins.' });
    }
  };

  return (
    <StyledLoginWrapperBox>
      <StyledLoginGridWrapper>
        <StyledLoginLeftBox>
          <Box>
            <Center>
              <img width={250} src={logo} alt={'logo'}></img>
            </Center>
          </Box>
        </StyledLoginLeftBox>
        <StyledLoginRightBox>
          {/* @ts-ignore */}
          {sent ? (
            // @ts-ignore
            <StyledLoginCard p={20} withBorder>
              <Box>
                <Text>
                  Email Sent. Go back to &nbsp; <StyledLink to={'/login'}>login page</StyledLink>.
                  (You might have to wait a few minutes for the email to arrive.)
                </Text>
                <Text mt={10}>
                  <small>
                    If you haven't got any email,{' '}
                    <Button onClick={() => setSent(false)} variant="outline" size="xs">
                      try again
                    </Button>
                    .
                  </small>
                </Text>
              </Box>
            </StyledLoginCard>
          ) : (
            <Box>
              <Title order={3} align="center" mb={8}>
                Forgot your password?
              </Title>
              {/*@ts-ignore*/}
              <StyledLoginCard p={20} withBorder>
                <form onSubmit={form.onSubmit(handleSubmit)}>
                  <Text color="dimmed" mb={16}>
                    Please enter your email. You will receive an email containing a link to create a
                    new password (within a few minutes).
                  </Text>
                  <StyledTextInput
                    icon={<IconMail />}
                    placeholder="Enter your Email"
                    label="Email"
                    my={10}
                    withAsterisk
                    {...form.getInputProps('email')}
                  />
                  <Box>
                    {/*<LoadingOverlay />*/}
                    <Button type="submit" w="100%" mt={20} mb={5}>
                      Submit
                    </Button>
                  </Box>
                </form>
              </StyledLoginCard>
            </Box>
          )}
        </StyledLoginRightBox>
      </StyledLoginGridWrapper>
    </StyledLoginWrapperBox>
  );
};
