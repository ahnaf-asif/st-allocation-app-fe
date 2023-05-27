import { Box, Button, Card, Divider, NumberInput, Text, TextInput, Title } from '@mantine/core';
import { Layout } from '@/Layouts';
import { isNotEmpty, useForm } from '@mantine/form';
import { IconPlus } from '@tabler/icons-react';
import { AllRoomsTable } from '@/Shared/Components/AllRoomsTable/AllRoomsTable';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/Redux/hooks';
import { axios } from '@/Config';
import { notifications, showNotification } from '@mantine/notifications';
import { AxiosError } from 'axios';

export const RoomManagement = () => {
  const [allRooms, setAllRooms] = useState<any[]>([]);
  const auth = useAppSelector((state) => state.auth);
  const addRoomForm = useForm({
    initialValues: {
      name: '',
      capacity: 0
    },
    validate: {
      name: isNotEmpty('Room name cannot be empty'),
      capacity: (capacity: number) => (capacity > 0 ? null : 'Capacity has to be at least 1')
    }
  });

  const handleRoomFormSubmit = async (values: { name: string; capacity: number }) => {
    try {
      const resp = await axios.post('/admin/rooms/add', values);

      await getAllRooms();

      notifications.show({
        title: 'Success!!',
        message: `Successfully created a room`,
        color: 'green'
      });

      addRoomForm.reset();
    } catch (e) {
      if (e instanceof AxiosError) {
        const { response } = e;
        if (response && response.data) {
          const { message } = response.data;
          const [field, msg] = message.split(':');
          addRoomForm.setFieldError(field, msg);
        }
      }
      notifications.show({
        title: 'Error',
        message: 'Error adding the room',
        color: 'red'
      });
    }
  };

  const getAllRooms = async () => {
    try {
      const { data } = await axios.get('/admin/rooms');
      setAllRooms(data);
    } catch (e) {
      notifications.show({
        title: 'Error',
        message: 'Error getting all rooms',
        color: 'red'
      });
    }
  };

  useEffect(() => {
    if (auth.user) {
      getAllRooms();
    }
  }, [auth]);

  return (
    <Layout admin>
      <Box>
        <Title order={3}>ST Room Management</Title>
        <Text my={10} size="sm" color="dimmed">
          here you can add Rooms for STs
        </Text>
        <Divider />
      </Box>
      <Box mt={30}>
        <Card shadow="xs" p="xl">
          <Title mb={20} order={4}>
            Add New Room
          </Title>
          <form onSubmit={addRoomForm.onSubmit((values) => handleRoomFormSubmit(values))}>
            <TextInput
              {...addRoomForm.getInputProps('name')}
              label="Room Name"
              placeholder="enter the room name"
            />
            <NumberInput
              mt={20}
              label="Room Capacity"
              {...addRoomForm.getInputProps('capacity')}
              description="maximum Number of student tutors that can take sessions simultaneously"
            />
            <Button mt={20} type="submit">
              <IconPlus /> Add Room
            </Button>
          </form>
        </Card>
      </Box>
      <Box mt={30}>
        <AllRoomsTable allRooms={allRooms} getAllRooms={getAllRooms} />
      </Box>
    </Layout>
  );
};
