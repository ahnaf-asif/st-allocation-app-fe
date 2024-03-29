import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Modal,
  NumberInput,
  Text,
  TextInput,
  Title
} from '@mantine/core';
import { Layout } from '@/Layouts';
import { axios } from '@/Config';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/Redux/hooks';
import { notifications, showNotification } from '@mantine/notifications';
import { AllStTable } from '@/Shared/Components/AllStTable/AllStTable';
import { isEmail, isNotEmpty, useForm } from '@mantine/form';
import { IconPlus } from '@tabler/icons-react';
import { AxiosError } from 'axios';
import { UploadStCsv } from './Components';

export const StManagement = () => {
  const [allSts, setAllSts] = useState<any[]>([]);
  const [addStModal, setAddStModal] = useState(false);
  const auth = useAppSelector((state) => state.auth);

  const getAllSts = async () => {
    try {
      const { data } = await axios.get('/admin/sts');
      setAllSts(data);
    } catch (e) {
      notifications.show({
        title: 'Error',
        message: 'Error getting all sts'
      });
    }
  };

  useEffect(() => {
    if (auth.user) {
      getAllSts();
    }
  }, [auth]);

  const addStForm = useForm({
    initialValues: {
      name: '',
      email: '',
      course: '',
      student_id: ''
    },
    validate: {
      name: isNotEmpty('Name cannot be empty'),
      email: isEmail('Please enter a valid email'),
      course: isNotEmpty('Course cannot be empty'),
      student_id: isNotEmpty('Student ID cannot be empty')
    }
  });

  const addSt = async (values: any) => {
    try {
      const resp = await axios.post('/admin/sts/add', values);

      if (resp) {
        await getAllSts();
        addStForm.reset();

        notifications.show({
          title: 'Success!!',
          message: 'Successfully added a student tutor',
          color: 'green'
        });
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        const { response } = e;
        if (response && response.data) {
          const { message } = response.data;
          const [field, msg] = message.split(':');
          addStForm.setFieldError(field, msg);
        }
      }
    }
  };

  return (
    <Layout admin>
      <Box>
        <Title order={3}>Student Tutor Management</Title>
        <Text my={10} size="sm" color="dimmed">
          Here you can add/manage/remove student tutors
        </Text>
        <Divider />
      </Box>

      <Box mt={30}>
        <Button onClick={() => setAddStModal(!addStModal)}>Add New ST</Button>
      </Box>

      <UploadStCsv getAllSts={getAllSts} />

      <Modal
        centered
        size="xl"
        withCloseButton={false}
        opened={addStModal}
        onClose={() => setAddStModal(false)}
      >
        <Box>
          <Card p={20} shadow="xs">
            <Title mb={20} order={4}>
              Add Student Tutor
            </Title>
            <form onSubmit={addStForm.onSubmit((values) => addSt(values))}>
              <TextInput {...addStForm.getInputProps('name')} label="Name" />
              <Grid gutter="xs">
                <Grid.Col sm={6} span={12}>
                  <TextInput {...addStForm.getInputProps('email')} mt={20} label="Email" />
                </Grid.Col>
                <Grid.Col sm={6} span={12}>
                  <TextInput
                    {...addStForm.getInputProps('student_id')}
                    mt={20}
                    label="Student ID"
                  />
                </Grid.Col>
                <Grid.Col sm={12} span={12}>
                  <TextInput
                    {...addStForm.getInputProps('course')}
                    mt={20}
                    label="Course(s)"
                    description="Please put courses and section numbers in brackets. for example CSE110(1, 3), CSE221(5), where 1, 3, 5 are the sections of the corresponding courses."
                  />
                </Grid.Col>
              </Grid>

              <Button type="submit" mt={20}>
                <IconPlus /> Add Student Tutor
              </Button>
            </form>
          </Card>
        </Box>
      </Modal>
      <Box mt={30}>
        <AllStTable allSts={allSts} getAllSts={getAllSts} />
      </Box>
    </Layout>
  );
};
