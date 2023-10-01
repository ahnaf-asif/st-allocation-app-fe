import { Box, Button, Center, Text, Title } from '@mantine/core';
import {
  StyledLoginCard,
  StyledLoginGridWrapper,
  StyledLoginLeftBox,
  StyledLoginRightBox,
  StyledLoginWrapperBox
} from '@/Pages/DefaultPages/Login/Login.styles';
import { logo } from '@/Shared/Images';
import { StyledLink, StyledPasswordInput } from '@/Shared/Components';
import { useForm } from '@mantine/form';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { axios } from '@/Config';
import { notifications, showNotification } from '@mantine/notifications';

export const ResetPassword = () => {
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const { token } = useParams();
  const form = useForm({
    initialValues: {
      newPassword: '',
      confirmPassword: ''
    },
    validate: {
      newPassword: (value) =>
        value.length < 8 ? 'Password must be at least 8 characters long' : null,
      confirmPassword: (value, values) =>
        value === values.newPassword ? null : 'Passwords do not match'
    }
  });
  const navigate = useNavigate();
  const checkTokenValidity = async () => {
    try {
      const resp = await axios.get(`/auth/check-token-validity/${token}`);
      setCurrentUser(resp.data);
    } catch (e) {
      setError('Invalid Token');
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      const resp = await axios.post('/auth/password-reset', {
        password: values.newPassword,
        confirmPassword: values.confirmPassword,
        token
      });

      showNotification({
        title: 'Success!!!',
        message: 'Successfully updated the password. You can now login with your new credentials',
        color: 'green'
      });

      form.reset();
      navigate('/login');
    } catch (e) {
      form.setErrors({ email: 'Unexpected Error happened. Please contact Admins.' });
    }
  };

  useEffect(() => {
    checkTokenValidity();
  }, [token]);

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
          {error ? (
            // @ts-ignore
            <StyledLoginCard p={20} withBorder>
              <Box>
                Invalid Token. Please go back to <StyledLink to="/login">login page</StyledLink>.
              </Box>
            </StyledLoginCard>
          ) : (
            <Box>
              <Title order={3} align="center" mb={8}>
                Reset Your Password
              </Title>
              {/*@ts-ignore*/}
              <StyledLoginCard p={20} withBorder>
                <form onSubmit={form.onSubmit(handleSubmit)}>
                  <Text color="dimmed" mb={16}>
                    Hello <strong>{currentUser && currentUser.name}</strong>, Please reset your
                    password.
                  </Text>
                  <StyledPasswordInput
                    placeholder="Enter New Password"
                    label="New Password"
                    my={10}
                    withAsterisk
                    {...form.getInputProps('newPassword')}
                  />
                  <StyledPasswordInput
                    placeholder="Confirm Password"
                    label="Confirm Password"
                    my={10}
                    withAsterisk
                    {...form.getInputProps('confirmPassword')}
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
