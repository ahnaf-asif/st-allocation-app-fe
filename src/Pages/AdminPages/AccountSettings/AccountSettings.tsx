import { Box, Button, Divider, Text, TextInput, Title } from '@mantine/core';
import { Layout } from '@/Layouts';
import { useAppDispatch, useAppSelector } from '@/Redux/hooks';
import { useEffect, useState } from 'react';
import { isEmail, isNotEmpty, useForm } from '@mantine/form';
import { axios, CURRENT_SEMESTER } from '@/Config';
import { StyledBorderedBox } from '@/Shared/Components/BoxStyles';
import { notifications } from '@mantine/notifications';
import { updateAuth } from '@/Redux/Slices/AuthSlice';

export const AccountSettings = () => {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const userDataForm = useForm({
    initialValues: {
      name: '',
      email: ''
    },
    validate: {
      name: isNotEmpty('Name cannot be empty'),
      email: isEmail('Enter a valid email')
    }
  });

  useEffect(() => {
    if (auth.user) {
      userDataForm.setValues({
        name: auth.user.name,
        email: auth.user.email
      });
    }
  }, [auth]);

  const saveChanges = async (values: any) => {
    try {
      const resp = await axios.patch('/admin/update-account', values);

      await dispatch(updateAuth(resp.data.token));

      notifications.show({
        title: 'Success!!!',
        message: 'Successfully updated account',
        color: 'green'
      });
    } catch (e) {
      console.log(e);

      notifications.show({
        title: 'Error!!!',
        message: 'Unexpected Error. Maybe the email you provided already exists',
        color: 'red'
      });
    }
  };

  return (
    <Layout admin>
      <Title order={3}>Account Settings</Title>
      <Text my={10} size="sm" color="dimmed">
        Update your name and email
      </Text>
      <Divider />

      <Box mt={30}>
        <StyledBorderedBox>
          <form onSubmit={userDataForm.onSubmit((values) => saveChanges(values))}>
            <TextInput {...userDataForm.getInputProps('name')} label="Your Name" />
            <TextInput mt={20} {...userDataForm.getInputProps('email')} label="Your Email" />

            <Button type="submit" mt={30}>
              Save Changes
            </Button>
          </form>
        </StyledBorderedBox>
      </Box>
    </Layout>
  );
};
