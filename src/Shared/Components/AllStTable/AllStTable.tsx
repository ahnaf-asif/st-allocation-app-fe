import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Modal,
  NumberInput,
  Text,
  TextInput,
  Title
} from '@mantine/core';
import { ChangePassword, CustomDatatable } from '@/Shared/Components';
import { useState } from 'react';
import { isEmail, isNotEmpty, useForm } from '@mantine/form';
import { axios } from '@/Config';
import { notifications } from '@mantine/notifications';
import { AxiosError } from 'axios';
import { useAppSelector } from '@/Redux/hooks';

export const AllStTable = ({ allSts, getAllSts }: { allSts: any[]; getAllSts: any }) => {
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [changePasswordModal, setChangePasswordModal] = useState(false);
  const [itemToBeRemoved, setItemToBeRemoved] = useState<any>(null);
  const auth = useAppSelector((state) => state.auth);
  const [changePasswordUserId, setChangePasswordUserId] = useState<null | number>(null);

  const updateStForm = useForm({
    initialValues: {
      id: 1,
      name: '',
      course: '',
      section: 1
    },

    validate: {
      name: isNotEmpty('Name cannot be empty'),
      course: isNotEmpty('Course cannot be empty'),
      section: isNotEmpty('Section cannot be empty')
    }
  });

  const handleUpdateForm = async (values: { name: string; course: string; id: number }) => {
    const { id, ...updValues } = values;
    try {
      const resp = await axios.patch(`/admin/sts/update/${id}`, updValues);

      notifications.show({
        title: 'Success!!',
        message: `Successfully updated the student tutor`,
        color: 'green'
      });

      await getAllSts();
      updateStForm.reset();
      setUpdateModal(false);
    } catch (e) {
      console.log(e);
      if (e instanceof AxiosError) {
        const { response } = e;
        if (response && response.data) {
          const { message } = response.data;
          const [field, msg] = message.split(':');
          updateStForm.setFieldError(field, msg);
        }
      }
      notifications.show({
        title: 'Error',
        message: 'Error updating the student tutor',
        color: 'red'
      });
    }
  };

  const updatedButtonClicked = (st: any) => {
    updateStForm.setValues({
      id: st.id,
      name: st.name,
      course: st.course,
      section: st.section
    });

    setUpdateModal(true);
  };

  const deleteButtonClicked = (room: any) => {
    setItemToBeRemoved(room);
    setDeleteModal(true);
  };

  const deleteSt = async () => {
    try {
      const resp = await axios.delete(`/admin/sts/delete/${itemToBeRemoved.id}`);
      if (resp) {
        await getAllSts();
        setItemToBeRemoved(null);
        setDeleteModal(false);

        notifications.show({
          title: 'Success!!',
          message: `Successfully deleted the student tutor`,
          color: 'green'
        });
      }
    } catch (e) {
      notifications.show({
        title: 'Error',
        message: 'Error deleting the student tutor',
        color: 'red'
      });

      await getAllSts();
      setItemToBeRemoved(null);
      setDeleteModal(false);
    }
  };

  const passwordModalClose = async (isPasswordChanged: boolean) => {
    if (isPasswordChanged) {
      notifications.show({
        title: 'Success!!!',
        message: 'Successfully changed password',
        color: 'green'
      });
      await getAllSts();
    }

    setChangePasswordModal(false);
  };

  const changePasswordClicked = (st: any) => {
    setChangePasswordUserId(st.id);
    setChangePasswordModal(true);
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
            accessor: 'email',
            sortable: true
          },
          {
            accessor: 'student_id',
            sortable: true
          },
          {
            accessor: 'course',
            title: 'Course(s)',
            sortable: true
          },
          {
            accessor: 'action',
            render: (st: any) => {
              return (
                <Flex justify="space-around">
                  <Button size="xs" onClick={() => updatedButtonClicked(st)} color="green">
                    Update
                  </Button>
                  {/*<Button size="xs" onClick={() => changePasswordClicked(st)}>*/}
                  {/*  Change Password*/}
                  {/*</Button>*/}
                  <Button size="xs" onClick={() => deleteButtonClicked(st)} color="red">
                    Delete
                  </Button>
                </Flex>
              );
            }
          },
          {
            accessor: 'verificationEmailSent',
            title: 'Verification',
            width: 200,
            render: (st: any) => <Text>{st.verificationEmailSent ? 'Sent' : 'Not Sent'}</Text>
          }
        ]}
        tableData={allSts}
        tableTitle={'List of Student Tutors'}
        tableContent={'Here is the list of all the student tutors that have been added'}
      />

      <Modal
        centered
        opened={updateModal}
        onClose={() => setUpdateModal(false)}
        withCloseButton={false}
      >
        <form onSubmit={updateStForm.onSubmit((values) => handleUpdateForm(values))}>
          <TextInput
            {...updateStForm.getInputProps('name')}
            label="Name"
            placeholder="enter the name"
          />

          <TextInput
            mt={20}
            {...updateStForm.getInputProps('course')}
            label="Course(s)"
            placeholder="enter the course"
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
          <Button onClick={deleteSt} color="red">
            Delete
          </Button>
        </Flex>
      </Modal>

      {changePasswordUserId && (
        <ChangePassword
          openChangePassword={changePasswordModal}
          closeChangePassword={passwordModalClose}
          userId={changePasswordUserId}
        />
      )}
    </Box>
  );
};
