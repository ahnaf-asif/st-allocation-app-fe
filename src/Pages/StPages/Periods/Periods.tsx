import { Box, Button, Grid, Select, Text, Title } from '@mantine/core';

import { Layout } from '@/Layouts';
import { StyledBorderedBox } from '@/Shared/Components/BoxStyles';
import { axios, CURRENT_SEMESTER } from '@/Config';
import { notifications } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/Redux/hooks';
import dayjs from 'dayjs';
import { isNotEmpty, useForm } from '@mantine/form';
import { AxiosError } from 'axios';
import { StPeriodsTable } from '@/Shared/Components';

export const StPeriods = () => {
  const [schedules, setSchedules] = useState([]);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [showRoomAvailability, setShowRoomAvailability] = useState(false);
  const [days, setDays] = useState([]);
  const [updateRoutineStartTime, setUpdateRoutineStartTime] = useState<Date>(new Date());
  const [updateRoutineDeadline, setUpdateRoutineDeadline] = useState<Date>(new Date());
  const [config, setConfig] = useState<any>({});

  const [periods, setPeriods] = useState([]);

  const auth = useAppSelector((state) => state.auth);

  const getConfiguration = async () => {
    try {
      const { data } = await axios.get('/user/configuration');
      setUpdateRoutineDeadline(new Date(data.updateRoutineDeadline));
      setUpdateRoutineStartTime(data.updateRoutineStartTime);
      setConfig(data);
    } catch (e) {
      notifications.show({
        title: 'Error!!!',
        color: 'red',
        message: 'Error getting the app configuration'
      });
    }
  };

  const getDays = async () => {
    try {
      const { data } = await axios.get('/st/days');

      if (data) {
        setDays(data.map((day: any) => ({ label: day.name, value: day.id })));
      }
    } catch (e) {
      notifications.show({
        title: 'Error!',
        message: 'Unexpected error happened while getting the rooms',
        color: 'red'
      });
    }
  };

  const getSchedules = async () => {
    try {
      const { data } = await axios.get('/st/schedules');

      if (data) {
        setSchedules(
          data.map((schedule: any) => ({
            value: schedule.id,
            label: `${schedule.from} - ${schedule.to}`
          }))
        );
      }
    } catch (e) {
      notifications.show({
        title: 'Error!',
        message: 'Unexpected error happened while getting the rooms',
        color: 'red'
      });
    }
  };

  const getPeriods = async () => {
    try {
      const resp = await axios.get(`/st/periods/${auth?.user?.id}`);

      const userPeriods = resp.data.map((period: any) => ({
        id: period.id,
        day: period.day.name,
        room: period.room.name,
        schedule: `${period.schedule.from} - ${period.schedule.to}`
      }));

      setPeriods(userPeriods);
    } catch (e) {
      notifications.show({
        title: 'Error!',
        message: 'Unexpected error happened while getting the periods',
        color: 'red'
      });
    }
  };

  useEffect(() => {
    if (auth.user) {
      getConfiguration();
      getDays();
      getSchedules();
      getPeriods();
    }
  }, [auth]);

  const searchRoomForm = useForm({
    initialValues: {
      dayId: '',
      scheduleId: ''
    },
    validate: {
      dayId: isNotEmpty('Please select a day'),
      scheduleId: isNotEmpty('Please select a time')
    }
  });

  const searchRoom = async ({ dayId, scheduleId }: { dayId: string; scheduleId: string }) => {
    try {
      const resp = await axios.get(
        `/st/search-rooms/${auth?.user?.id}?dayId=${dayId}&scheduleId=${scheduleId}`
      );

      setAvailableRooms(resp.data);
      setShowRoomAvailability(true);
    } catch (e) {
      if (e instanceof AxiosError) {
        const { response } = e;

        if (response && response.data) {
          const { message } = response.data;

          notifications.show({
            title: 'Caution!!',
            message: `${message}`,
            color: 'red',
            autoClose: 10000
          });

          setAvailableRooms([]);
          setShowRoomAvailability(false);
        }
      } else {
        notifications.show({
          title: 'Error!!!',
          message: 'Unexpected error happened while searching rooms',
          color: 'red'
        });
      }
    }
  };

  const bookPeriod = async (roomId: number) => {
    const values = { ...searchRoomForm.values, roomId };
    try {
      const resp = await axios.post(`/st/book-period/${auth?.user?.id}`, values);

      if (resp) {
        searchRoomForm.reset();
        setAvailableRooms([]);
        setShowRoomAvailability(false);
        await getPeriods();

        notifications.show({
          title: 'Success!!!!',
          message: `Successfully booked a period`,
          color: 'green'
        });
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        const { response } = e;

        if (response && response.data) {
          const { message } = response.data;

          notifications.show({
            title: 'Error!!',
            message: `${message}. Please book again`,
            color: 'red',
            autoClose: 10000
          });

          setAvailableRooms([]);
          setShowRoomAvailability(false);
          await searchRoom(searchRoomForm.values);
        } else {
          notifications.show({
            title: 'Error!!',
            message: 'Unexpected error happened. Try again',
            color: 'red'
          });
        }
      }
    }
  };

  return (
    <Layout user>
      {updateRoutineStartTime < new Date() ? (
        <>
          <Box mb={40}>
            <Title order={3}>My Consultation Periods - {CURRENT_SEMESTER}</Title>
            <Text size="sm" my={10} color="dimmed">
              {updateRoutineDeadline
                ? `Routine Update Deadline is ${dayjs(updateRoutineDeadline).format(
                    'DD MMM YYYY, hh:mm A'
                  )}. You will not be able to update your routine after that.`
                : 'Deadline is not set Yet'}
            </Text>
          </Box>
          <StyledBorderedBox>
            {updateRoutineDeadline > new Date() && updateRoutineStartTime <= new Date() ? (
              <Box>
                <Text color="dimmed" size="sm" mb={20}>
                  You have to book <b>at least</b> {config.totalPeriodsPerWeek} periods (in the
                  whole week). You can have at most {config.maxPeriodsPerDay} periods in a day.
                  However, you have to select at least {config.minDaysPerWeek} different days of the
                  week.
                </Text>
                {periods.length < config.totalPeriodsPerWeek && (
                  <Text weight="bold" mb={10} color="purple">
                    Caution: You have to book at least {config.totalPeriodsPerWeek - periods.length}{' '}
                    more periods.
                  </Text>
                )}
                <Grid align="center">
                  <Grid.Col xl={12} span={12}>
                    <form onSubmit={searchRoomForm.onSubmit((values) => searchRoom(values))}>
                      <Grid align="flex-end">
                        <Grid.Col lg={4} span={12}>
                          <Select
                            {...searchRoomForm.getInputProps('dayId')}
                            data={days}
                            label="Day"
                          />
                        </Grid.Col>
                        <Grid.Col lg={4} span={12}>
                          <Select
                            {...searchRoomForm.getInputProps('scheduleId')}
                            data={schedules}
                            label="Time"
                          />
                        </Grid.Col>
                        <Grid.Col lg={4} span={12}>
                          <Button type="submit" fullWidth>
                            Check Available Rooms
                          </Button>
                        </Grid.Col>
                      </Grid>
                    </form>
                  </Grid.Col>
                </Grid>
              </Box>
            ) : (
              <Text color="red">Routine Update Deadline is over already</Text>
            )}
          </StyledBorderedBox>

          {showRoomAvailability && (
            <Box>
              {availableRooms.length === 0 ? (
                <Box mt={30}>
                  <StyledBorderedBox>
                    <Text color="red">There is no room available at the selected time.</Text>
                  </StyledBorderedBox>
                </Box>
              ) : (
                <Box mt={30}>
                  <Text weight="bold">
                    There are {availableRooms.length} Available rooms for the selected time:
                  </Text>
                  <Text size="sm" mt={5} color="dimmed">
                    While seats may appear to be available when you check room availability, it is
                    possible that by the time you book the period, someone else has already booked
                    it, leading to the cancellation of yours.
                  </Text>
                  <Box mt={30}>
                    {availableRooms.map((availableRoom: any, index: number) => (
                      // @ts-ignore
                      <StyledBorderedBox key={index}>
                        <Grid align="center">
                          <Grid.Col span={9}>
                            <Text size={18}>
                              {availableRoom.name}
                              <Text size="sm" color="dimmed">
                                {availableRoom.availableSeats} out of {availableRoom.capacity} seats
                                available
                              </Text>
                            </Text>
                          </Grid.Col>
                          <Grid.Col span={3}>
                            <Button
                              onClick={() => bookPeriod(availableRoom.id)}
                              color="green"
                              fullWidth
                            >
                              Book Period
                            </Button>
                          </Grid.Col>
                        </Grid>
                      </StyledBorderedBox>
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          )}

          <Box mt={50}>
            <StPeriodsTable
              updateRoutineDeadline={updateRoutineDeadline}
              periods={periods}
              getPeriods={getPeriods}
            />
          </Box>
        </>
      ) : (
        <Box>
          <Text>Routine Update has not started yet.</Text>
          You will be able to start updating your routine from{' '}
          <strong>{dayjs(updateRoutineStartTime).format('DD MMMM YYYY, hh:mm A')}</strong>
        </Box>
      )}
    </Layout>
  );
};
