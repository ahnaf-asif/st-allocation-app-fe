import { Layout } from '@/Layouts';
import { Box, Button, Divider, NumberInput, Text, Title } from '@mantine/core';
import { CURRENT_SEMESTER } from '@/Config';
import { notifications } from '@mantine/notifications';
import { axios } from '@/Config';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/Redux/hooks';
import { isNotEmpty, useForm } from '@mantine/form';
import { StyledBorderedBox } from '@/Shared/Components/BoxStyles';
import { StyledDateTimePicker } from '@/Shared/Components/FormStyles/FormStyles';
import { IconEdit } from '@tabler/icons-react';
import { PeriodsConfig } from './PeriodsConfig';

export const AdminConfiguration = () => {
  const [config, setConfig] = useState({
    updateRoutineDeadline: new Date(),
    totalPeriodsPerWeek: 6,
    maxPeriodsPerDay: 3,
    minDaysPerWeek: 3
  });
  const auth = useAppSelector((state) => state.auth);

  const getConfiguration = async () => {
    try {
      const { data } = await axios.get('/user/configuration');
      setConfig({
        maxPeriodsPerDay: data.maxPeriodsPerDay,
        totalPeriodsPerWeek: data.totalPeriodsPerWeek,
        minDaysPerWeek: data.minDaysPerWeek,
        updateRoutineDeadline: new Date(data.updateRoutineDeadline)
      });
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

  const configForm = useForm({
    initialValues: {
      updateRoutineDeadline: new Date(),
      totalPeriodsPerWeek: 6,
      maxPeriodsPerDay: 3,
      minDaysPerWeek: 3
    },

    validate: {
      updateRoutineDeadline: isNotEmpty('enter a valid date'),
      totalPeriodsPerWeek: (periods: number) =>
        periods > 0 ? null : 'total periods per week must be at least 1',
      maxPeriodsPerDay: (periods: number) =>
        periods > 0 ? null : 'maximum periods per day must be at least 1',
      minDaysPerWeek: (periods: number) =>
        periods > 0 ? null : 'minimum days per week must be at least 1'
    }
  });

  useEffect(() => {
    configForm.setValues({
      maxPeriodsPerDay: config.maxPeriodsPerDay,
      totalPeriodsPerWeek: config.totalPeriodsPerWeek,
      minDaysPerWeek: config.minDaysPerWeek,
      updateRoutineDeadline: new Date(config.updateRoutineDeadline)
    });
  }, [config]);

  const updateDeadline = async (values: any) => {
    try {
      const { data } = await axios.patch('/admin/configuration', values);
      setConfig({
        maxPeriodsPerDay: data.maxPeriodsPerDay,
        totalPeriodsPerWeek: data.totalPeriodsPerWeek,
        updateRoutineDeadline: new Date(data.updateRoutineDeadline),
        minDaysPerWeek: data.minDaysPerWeek
      });

      notifications.show({
        title: 'Success!!!',
        message: 'Successfully updated deadline',
        color: 'green'
      });
    } catch (e) {
      console.log(e);
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
          <form onSubmit={configForm.onSubmit((values) => updateDeadline(values))}>
            <StyledDateTimePicker
              valueFormat="DD MMM YYYY hh:mm A"
              {...configForm.getInputProps('updateRoutineDeadline')}
              label="Deadline for ST routine update"
            />
            <NumberInput
              {...configForm.getInputProps('totalPeriodsPerWeek')}
              mt={10}
              label="Number of Sessions per week"
            />
            <NumberInput
              {...configForm.getInputProps('maxPeriodsPerDay')}
              mt={10}
              label="Maximum number of Sessions per day"
            />
            <NumberInput
              {...configForm.getInputProps('minDaysPerWeek')}
              mt={10}
              label="Minimum number of days per week"
            />
            <Button mt={20} type="submit">
              <IconEdit size={18} />
              &nbsp; Update Configuration
            </Button>
          </form>
        </StyledBorderedBox>

        <Box mt={30}>
          <PeriodsConfig />
        </Box>
      </Box>
    </Layout>
  );
};
