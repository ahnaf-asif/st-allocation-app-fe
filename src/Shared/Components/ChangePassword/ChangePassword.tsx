import { Box, Button, Flex, Modal, PasswordInput, Text, Title } from '@mantine/core';
import { useAppSelector } from '@/Redux/hooks';
import { isNotEmpty, useForm } from '@mantine/form';
import { axios } from '@/Config';
import { AxiosError } from 'axios';
import { useState } from 'react';

export const ChangePassword = ({
  openChangePassword,
  closeChangePassword,
  userId
}: {
  openChangePassword: boolean;
  closeChangePassword: any;
  userId: number;
}) => {
  const auth = useAppSelector((state) => state.auth);
  const [errorText, setErrorText] = useState('');

  const changePasswordForm = useForm({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    },
    validate: {
      newPassword: (password) =>
        password.trim().length < 8 ? 'Password must be at least 8 characters' : null,
      confirmNewPassword: (confirm, { newPassword }: any) =>
        newPassword === confirm ? null : 'Please make sure the passwords match'
    }
  });

  const submitChangePassword = async (values: any) => {
    const data = {
      oldPassword: values.currentPassword,
      newPassword: values.newPassword
    };

    try {
      const resp = await axios.patch(`/user/change-password/${userId}`, data);
      changePasswordForm.reset();

      await closeChangePassword(true);
    } catch (e) {
      if (e instanceof AxiosError) {
        const { response } = e;
        if (response) {
          const { data } = response;
          const { message } = data;

          setErrorText(message);
        }
      }
    }
  };

  return (
    <Box>
      <Modal
        centered
        withCloseButton={false}
        opened={openChangePassword}
        onClose={() => closeChangePassword(false)}
      >
        <Title mb={30} order={4}>
          Change Password
        </Title>

        <form onSubmit={changePasswordForm.onSubmit(submitChangePassword)}>
          {auth.user && !auth.user.isAdmin && (
            <PasswordInput
              {...changePasswordForm.getInputProps('currentPassword')}
              label="Current Password"
              mt={20}
            />
          )}
          <PasswordInput
            {...changePasswordForm.getInputProps('newPassword')}
            label="New Password"
            mt={20}
          />
          <PasswordInput
            {...changePasswordForm.getInputProps('confirmNewPassword')}
            label="Confirm New Password"
            mt={20}
          />
          <Text my={errorText.length > 0 ? 20 : 0} color="red" weight="bold" size={13}>
            {errorText}
          </Text>
          <Flex mt={30} justify="flex-end" gap={10}>
            <Button type="submit" color="green">
              Save
            </Button>
            <Button onClick={() => closeChangePassword(false)}>Cancel</Button>
          </Flex>
        </form>
      </Modal>
    </Box>
  );
};
