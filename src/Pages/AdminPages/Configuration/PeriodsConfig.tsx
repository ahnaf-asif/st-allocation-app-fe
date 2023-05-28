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
import { IconClock } from '@tabler/icons-react';
import { convertTo12HourFormat } from '@/Pages/AdminPages/Configuration/Helpers';

export const PeriodsConfig = () => {
  const auth = useAppSelector((state) => state.auth);
  const [periods, setPeriods] = useState([]);
  const [periodToBeUpdated, setPeriodToBeUpdated] = useState(null);
  const [periodToBeDeleted, setPeriodToBeDeleted] = useState(null);

  const [periodUpdateModal, setPeriodUpdateModal] = useState(false);
  const [periodDeleteModal, setPeriodDeleteModal] = useState(false);

  const timeInputPattern = /^\b(0[1-9]|1[0-2]):[0-5][0-9]\s(?:AM|PM)\b$/;

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

  const addPeriod = async (values: { from: string; to: string }) => {
    const from = convertTo12HourFormat(values.from);
    const to = convertTo12HourFormat(values.to);

    try {
      console.log('fuck ', from, to);

      const resp = await axios.post('/admin/schedules/add', { from, to });

      if (resp) {
        await getSchedules();

        notifications.show({
          title: 'Success!!!',
          message: 'Successfully added a schedule',
          color: 'green'
        });
      }
    } catch (e) {
      console.log(e);
      notifications.show({
        title: 'Error!!!',
        message: 'Cannot add stuff bruh fuckup',
        color: 'red'
      });
    }

    console.log({ from, to });
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
              {/*<TextInput {...addPeriodForm.getInputProps('from')} label="From" />*/}
              <TimeInput {...addPeriodForm.getInputProps('from')} label="From" />
            </Grid.Col>
            <Grid.Col sm={5} span={12}>
              {/*<TextInput {...addPeriodForm.getInputProps('to')} label="To" />*/}
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
        update period modal
        <Flex mt={20} justify="flex-end" gap={10}>
          <Button onClick={() => setPeriodUpdateModal(false)}>Cancel</Button>
          <Button color="green">Update</Button>
        </Flex>
      </Modal>

      <Modal
        centered
        withCloseButton={false}
        opened={periodDeleteModal}
        onClose={() => setPeriodDeleteModal(false)}
      >
        delete period modal
        <Flex mt={20} justify="flex-end" gap={10}>
          <Button onClick={() => setPeriodDeleteModal(false)}>Cancel</Button>
          <Button color="red">Delete</Button>
        </Flex>
      </Modal>
    </StyledBorderedBox>
  );
};
