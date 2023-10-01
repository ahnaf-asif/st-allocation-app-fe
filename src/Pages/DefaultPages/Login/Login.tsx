import {
  Box,
  Grid,
  Button,
  Text,
  Anchor,
  LoadingOverlay,
  Center,
  Image,
  TextInput,
  PasswordInput,
  Card,
  Title
} from '@mantine/core';
import { isEmail, useForm } from '@mantine/form';
import { IconMail, IconLock } from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { loginUser } from '@/Redux/Slices/AuthSlice';
import { useAppDispatch, useAppSelector } from '@/Redux/hooks';
import { StyledLink, StyledPasswordInput, StyledTextInput } from '@/Shared/Components';
import {
  StyledLoginCard,
  StyledLoginWrapperBox,
  StyledLoginGridWrapper,
  StyledLoginRightBox,
  StyledLoginLeftBox
} from './Login.styles';

import { logo } from '@/Shared/Images';

const Login = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const [error, setError] = useState<null | string>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.dispatched && auth.error) {
      setError(auth.error);
    }
  }, [auth]);

  useEffect(() => {
    if (auth.dispatched && auth.user) {
      if (auth.user.isAdmin) {
        navigate('/admin');
      } else {
        navigate('/st');
      }
    }
  }, [auth]);

  interface ILogin {
    email: string;
    password: string;
  }

  const initialLoginFormValues: ILogin = {
    email: '',
    password: ''
  };

  const loginFormValidator = {
    email: isEmail('Enter a valid email'),
    password: (pass: string) =>
      pass.trim().length >= 8 ? null : 'Password must be at least 8 characters long'
  };

  const form = useForm({
    initialValues: initialLoginFormValues,
    validate: loginFormValidator
  });

  const handleSubmit = async () => {
    setError(null);
    dispatch(loginUser(form.values));
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
          <Box>
            <Title order={3} align="center" mb={8}>
              Sign In
            </Title>
            {/*@ts-ignore*/}
            <StyledLoginCard p={20} withBorder>
              <form onSubmit={form.onSubmit(handleSubmit)}>
                <Text color="dimmed" mb={16}>
                  Please enter your email and password.
                </Text>
                <StyledTextInput
                  icon={<IconMail />}
                  placeholder="Enter your Email"
                  label="Email"
                  my={10}
                  withAsterisk
                  {...form.getInputProps('email')}
                />
                <StyledPasswordInput
                  icon={<IconLock />}
                  placeholder="Password"
                  label="Password"
                  withAsterisk
                  my={10}
                  {...form.getInputProps('password')}
                />
                <Box>
                  <Text>
                    <StyledLink to="/forgot-password">Forgot Password</StyledLink>
                  </Text>
                </Box>
                <Box>
                  <LoadingOverlay visible={auth.loading} />
                  <Button type="submit" w="100%" mt={20} mb={5}>
                    Log In
                  </Button>
                </Box>
                {error && (
                  <Center>
                    <Text my={10} fw="bold" c="red" fz="xs">
                      {error}
                    </Text>
                  </Center>
                )}
              </form>
            </StyledLoginCard>
          </Box>
        </StyledLoginRightBox>
      </StyledLoginGridWrapper>
    </StyledLoginWrapperBox>
  );
};

export default Login;
