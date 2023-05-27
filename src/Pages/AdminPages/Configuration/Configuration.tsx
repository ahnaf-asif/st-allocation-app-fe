import { Layout } from '@/Layouts';
import { Box, Button, Divider, Text, Title } from '@mantine/core';
import { CURRENT_SEMESTER } from '@/Config';
import { notifications } from '@mantine/notifications';
import { axios } from '@/Config';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/Redux/hooks';
import { isNotEmpty, useForm } from '@mantine/form';
import { StyledBorderedBox } from '@/Shared/Components/BoxStyles';
import { StyledDateTimePicker } from '@/Shared/Components/FormStyles/FormStyles';
import { IconEdit } from '@tabler/icons-react';

export const AdminConfiguration = () => {
  const [updateRoutineDeadline, setUpdateRoutineDeadline] = useState<Date>(new Date());
  const auth = useAppSelector((state) => state.auth);

  const getConfiguration = async () => {
    try {
      const { data } = await axios.get('/user/configuration');
      setUpdateRoutineDeadline(data.updateRoutineDeadline);
    } catch (e) {
      notifications.show({
        title: 'Error!!!',
        color: 'red',
        message: 'Error getting the app configuration'
      });
    }
  };

  useEffect(() => {
    if (auth.user) {
      getConfiguration();
    }
  }, [auth]);

  const updateRoutineForm = useForm({
    initialValues: {
      updateRoutineDeadline: new Date()
    },

    validate: {
      updateRoutineDeadline: (date: Date) => null
    }
  });

  useEffect(() => {
    if (updateRoutineDeadline !== null) {
      updateRoutineForm.setFieldValue('updateRoutineDeadline', new Date(updateRoutineDeadline));
    }
  }, [updateRoutineDeadline]);

  const updateDeadline = async (values: any) => {
    try {
      const { data } = await axios.patch('/admin/configuration', values);
      setUpdateRoutineDeadline(new Date(data.updateRoutineDeadline));

      notifications.show({
        title: 'Success!!!',
        message: 'Successfully updated deadline',
        color: 'green'
      });
    } catch (e) {
      notifications.show({
        title: 'Error!!!',
        message: 'Unexpected error during deadline update',
        color: 'red'
      });
    }
  };

  return (
    <Layout admin>
      <Title order={3}>App Configuration - {CURRENT_SEMESTER}</Title>
      <Text my={10} size="sm" color="dimmed">
        Update Configurations Here
      </Text>
      <Divider />

      <Box mt={40}>
        <StyledBorderedBox>
          <form onSubmit={updateRoutineForm.onSubmit((values) => updateDeadline(values))}>
            <StyledDateTimePicker
              valueFormat="DD MMM YYYY hh:mm A"
              {...updateRoutineForm.getInputProps('updateRoutineDeadline')}
              label="Deadline for ST routine update"
            />
            <Button type="submit">
              <IconEdit size={18} />
              &nbsp; Update Deadline
            </Button>
          </form>
        </StyledBorderedBox>
      </Box>
    </Layout>
  );
};
