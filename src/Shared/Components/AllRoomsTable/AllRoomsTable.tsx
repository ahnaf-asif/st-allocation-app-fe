import { Box, Button, Flex, Modal, NumberInput, TextInput, Title, Text } from '@mantine/core';
import { CustomDatatable } from '@/Shared/Components';
import { useState } from 'react';
import { isNotEmpty, useForm } from '@mantine/form';
import { axios } from '@/Config';
import { notifications } from '@mantine/notifications';
import { AxiosError } from 'axios';

export const AllRoomsTable = ({ allRooms, getAllRooms }: { allRooms: any[]; getAllRooms: any }) => {
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [itemToBeRemoved, setItemToBeRemoved] = useState<any>(null);

  const updateRoomForm = useForm({
    initialValues: {
      id: 0,
      name: '',
      capacity: 0
    },
    validate: {
      name: isNotEmpty('Room name cannot be empty'),
      capacity: (capacity: number) => (capacity > 0 ? null : 'Capacity has to be at least 1')
    }
  });

  const handleRoomFormSubmit = async (values: { name: string; capacity: number; id: number }) => {
    const { id, ...updValues } = values;
    try {
      const resp = await axios.patch(`/admin/rooms/update/${id}`, updValues);

      notifications.show({
        title: 'Success!!',
        message: `Successfully updated the room`,
        color: 'green'
      });

      await getAllRooms();
      updateRoomForm.reset();
      setUpdateModal(false);
    } catch (e) {
      if (e instanceof AxiosError) {
        const { response } = e;
        if (response && response.data) {
          const { message } = response.data;
          const [field, msg] = message.split(':');
          updateRoomForm.setFieldError(field, msg);
        }
      }
      notifications.show({
        title: 'Error',
        message: 'Error updating the room',
        color: 'red'
      });
    }
  };

  const updatedButtonClicked = (room: any) => {
    updateRoomForm.setValues({
      id: room.id,
      name: room.name,
      capacity: room.capacity
    });
    setUpdateModal(true);
  };

  const deleteButtonClicked = (room: any) => {
    setItemToBeRemoved(room);
    setDeleteModal(true);
  };

  const deleteRoom = async () => {
    try {
      const resp = await axios.delete(`/admin/rooms/delete/${itemToBeRemoved?.id}`);
      if (resp) {
        await getAllRooms();
        setItemToBeRemoved(null);
        setDeleteModal(false);

        notifications.show({
          title: 'Success!!',
          message: `Successfully deleted the room`,
          color: 'green'
        });
      }
    } catch (e) {
      notifications.show({
        title: 'Error',
        message: 'Error deleting the room',
        color: 'red'
      });

      await getAllRooms();
      setItemToBeRemoved(null);
      setDeleteModal(false);
    }
  };

  return (
    <Box mt={50}>
      <CustomDatatable
        pageSize={10}
        columns={[
          {
            accessor: 'name',
            sortable: true
          },
          {
            accessor: 'capacity',
            sortable: true
          },
          {
            accessor: 'action',
            render: (room: any) => {
              return (
                <Flex justify="flex-end" gap={20}>
                  <Button onClick={() => updatedButtonClicked(room)} color="green">
                    Update Capacity
                  </Button>
                  <Button onClick={() => deleteButtonClicked(room)} color="red">
                    Delete
                  </Button>
                </Flex>
              );
            }
          }
        ]}
        tableData={allRooms}
        tableTitle={'List of Rooms available'}
        tableContent={'List of all of the rooms for student tutors'}
      />

      <Modal
        centered
        opened={updateModal}
        onClose={() => setUpdateModal(false)}
        withCloseButton={false}
      >
        <form onSubmit={updateRoomForm.onSubmit((values) => handleRoomFormSubmit(values))}>
          <TextInput
            readOnly
            {...updateRoomForm.getInputProps('name')}
            label="Room Name"
            placeholder="enter the room name"
          />
          <NumberInput
            mt={20}
            label="Room Capacity"
            autoFocus
            {...updateRoomForm.getInputProps('capacity')}
            description="maximum Number of student tutors that can take sessions simultaneously"
          />

          <Flex mt={20} align="center" justify="flex-end" gap={10}>
            <Button onClick={() => setUpdateModal(false)}>Cancel</Button>
            <Button color="green" type="submit">
              Update
            </Button>
          </Flex>
        </form>
      </Modal>

      <Modal
        centered
        withCloseButton={false}
        opened={deleteModal}
        onClose={() => setDeleteModal(false)}
      >
        <Title order={4}>Delete "{itemToBeRemoved?.name}"? </Title>
        <Text my={10}>If you delete the room, it will be permanently removed</Text>
        <Flex justify="flex-end" gap={10}>
          <Button onClick={() => setDeleteModal(false)}>Cancel</Button>
          <Button onClick={deleteRoom} color="red">
            Delete
          </Button>
        </Flex>
      </Modal>
    </Box>
  );
};
