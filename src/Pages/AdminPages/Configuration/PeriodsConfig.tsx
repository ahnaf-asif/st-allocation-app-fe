import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Grid,
  Modal,
  Table,
  Text,
  TextInput,
  Title
} from '@mantine/core';
import { StyledBorderedBox } from '@/Shared/Components/BoxStyles';
import { useEffect, useRef, useState } from 'react';
import { notifications } from '@mantine/notifications';
import { axios } from '@/Config';
import { isNotEmpty, useForm } from '@mantine/form';
import { TimeInput } from '@mantine/dates';
import { useAppSelector } from '@/Redux/hooks';
import { convertTo12HourFormat, convertTo24HourFormat } from './Helpers';

export const PeriodsConfig = () => {
  const auth = useAppSelector((state) => state.auth);
  const [periods, setPeriods] = useState([]);
  const [periodToBeUpdated, setPeriodToBeUpdated] = useState<any>(null);
  const [periodToBeDeleted, setPeriodToBeDeleted] = useState<any>(null);

  const [periodUpdateModal, setPeriodUpdateModal] = useState(false);
  const [periodDeleteModal, setPeriodDeleteModal] = useState(false);

  const getSchedules = async () => {
    try {
      const resp = await axios.get('/st/schedules');
      setPeriods(resp.data);
    } catch (e) {
      notifications.show({
        title: 'Error!!!',
        message: 'Unexpected error while getting the periods',
        color: 'red'
      });
    }
  };

  useEffect(() => {
    if (auth.user) {
      getSchedules();
    }
  }, [auth]);

  const updatePeriodClicked = (period: any) => {
    setPeriodToBeUpdated(period);

    updatePeriodForm.setValues({
      from: convertTo24HourFormat(period.from),
      to: convertTo24HourFormat(period.to)
    });

    setPeriodUpdateModal(true);
  };

  const deletePeriodClicked = (period: any) => {
    setPeriodToBeDeleted(period);
    setPeriodDeleteModal(true);
  };

  const addPeriodForm = useForm({
    initialValues: {
      from: '',
      to: ''
    },
    validate: {
      from: isNotEmpty('Enter a valid time'),
      to: isNotEmpty('Enter a valid time')
    }
  });

  const updatePeriodForm = useForm({
    initialValues: {
      from: '',
      to: ''
    },
    validate: {
      from: isNotEmpty('Enter a valid time'),
      to: isNotEmpty('Enter a valid time')
    }
  });

  const addPeriod = async (values: { from: string; to: string }) => {
    const from = convertTo12HourFormat(values.from);
    const to = convertTo12HourFormat(values.to);

    try {
      const resp = await axios.post('/admin/schedules/add', { from, to });

      if (resp) {
        await getSchedules();
        addPeriodForm.reset();

        notifications.show({
          title: 'Success!!!',
          message: 'Successfully added a schedule',
          color: 'green'
        });
      }
    } catch (e) {
      notifications.show({
        title: 'Error!!!',
        message: 'Cannot add the period',
        color: 'red'
      });
    }
  };

  const updatePeriod = async (values: { from: string; to: string }) => {
    const from = convertTo12HourFormat(values.from);
    const to = convertTo12HourFormat(values.to);

    try {
      const resp = await axios.patch(`/admin/schedules/update/${periodToBeUpdated?.id}`, {
        from,
        to
      });

      if (resp) {
        await getSchedules();

        notifications.show({
          title: 'Success!!!',
          message: 'Successfully updated a schedule',
          color: 'green'
        });

        setPeriodUpdateModal(false);
      }
    } catch (e) {
      notifications.show({
        title: 'Error!!!',
        message: 'Cannot update the period',
        color: 'red'
      });
    }
  };

  const deleteSchedule = async () => {
    try {
      const resp = await axios.delete(`/admin/schedules/delete/${periodToBeDeleted?.id}`);

      if (resp) {
        await getSchedules();

        notifications.show({
          title: 'Success!!!',
          message: 'Successfully deleted the schedule',
          color: 'green'
        });

        setPeriodDeleteModal(false);
      }
    } catch (e) {
      notifications.show({
        title: 'Error!!!',
        message: 'Cannot delete the period',
        color: 'red'
      });
    }
  };

  return (
    <StyledBorderedBox>
      <Box>
        <Title order={4}>Add New Period</Title>
        <Text mb={20} color="dimmed" size={14}>
          The time format of your input must be specifically <b>hour:minute AM/PM</b>. Do not use
          any unnecessary spaces, and if the hour and day are less than 10, add a trailing 0 to it.
        </Text>
        <form onSubmit={addPeriodForm.onSubmit((values) => addPeriod(values))}>
          <Grid align="flex-end">
            <Grid.Col sm={5} span={12}>
              <TimeInput {...addPeriodForm.getInputProps('from')} label="From" />
            </Grid.Col>
            <Grid.Col sm={5} span={12}>
              <TimeInput {...addPeriodForm.getInputProps('to')} label="To" />
            </Grid.Col>
            <Grid.Col sm={2} span={12}>
              <Button type="submit" fullWidth>
                Add Period
              </Button>
            </Grid.Col>
          </Grid>
        </form>
      </Box>
      <Box mt={30}>
        <Table withBorder withColumnBorders>
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {periods.map((period: any, index) => (
              <tr key={index}>
                <td>{period.from}</td>
                <td>{period.to}</td>
                <td>
                  <Flex gap={10}>
                    <Button onClick={() => updatePeriodClicked(period)}>Update</Button>
                    <Button onClick={() => deletePeriodClicked(period)} color="red">
                      Remove
                    </Button>
                  </Flex>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Box>

      <Modal
        centered
        withCloseButton={false}
        opened={periodUpdateModal}
        onClose={() => setPeriodUpdateModal(false)}
      >
        <form onSubmit={updatePeriodForm.onSubmit((values) => updatePeriod(values))}>
          <TimeInput {...updatePeriodForm.getInputProps('from')} label="From" />
          <TimeInput {...updatePeriodForm.getInputProps('to')} mt={10} label="To" />

          <Flex mt={20} justify="flex-end" gap={10}>
            <Button onClick={() => setPeriodUpdateModal(false)}>Cancel</Button>
            <Button type="submit" color="green">
              Update
            </Button>
          </Flex>
        </form>
      </Modal>

      <Modal
        centered
        withCloseButton={false}
        opened={periodDeleteModal}
        onClose={() => setPeriodDeleteModal(false)}
      >
        <Title order={4}>Do you want to delete the following period?</Title>
        <Text my={10}>
          {periodToBeDeleted?.from} - {periodToBeDeleted?.to}
        </Text>
        <Flex mt={20} justify="flex-end" gap={10}>
          <Button onClick={() => setPeriodDeleteModal(false)}>Cancel</Button>
          <Button onClick={deleteSchedule} color="red">
            Delete
          </Button>
        </Flex>
      </Modal>
    </StyledBorderedBox>
  );
};
