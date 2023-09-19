import { useEffect, useState } from 'react';
import { Layout } from '@/Layouts';
import {
  Box,
  Button,
  Card,
  Center,
  Divider,
  Grid,
  NumberInput,
  Text,
  TextInput,
  Title
} from '@mantine/core';
import { CURRENT_SEMESTER } from '@/Config';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import { isEmail, isNotEmpty, useForm } from '@mantine/form';
import { CustomDatatable } from '@/Shared/Components';
import { axios } from '@/Config';
import { useAppSelector } from '@/Redux/hooks';
import { AxiosError } from 'axios';
import { notifications } from '@mantine/notifications';

export const SuperAdmin = () => {
  const [allAdmins, setAllAdmins] = useState([]);
  const auth = useAppSelector((state) => state.auth);
  const addAdminForm = useForm({
    initialValues: {
      name: '',
      email: ''
    },
    validate: {
      name: isNotEmpty('Name cannot be empty'),
      email: isEmail('Please enter a valid email')
    }
  });

  const addAdmin = async (values: any) => {
    try {
      const resp = await axios.post('/admin/super/add-admin', values);
      addAdminForm.reset();

      await getAdmins();

      notifications.show({
        title: 'Success!!',
        message: `Successfully added an admin`,
        color: 'green'
      });
    } catch (e) {
      if (e instanceof AxiosError) {
        const { response } = e;
        if (response && response.data) {
          const { message } = response.data;
          const [field, msg] = message.split(':');
          addAdminForm.setFieldError(field, msg);
        }
      }
    }
  };

  const getAdmins = async () => {
    try {
      const resp = await axios.get('/admin/super/admins');
      setAllAdmins(resp.data);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteAdmin = async (admin: any) => {
    try {
      const resp = await axios.delete(`/admin/super/remove-admin/${admin.id}`);
      await getAdmins();
      notifications.show({
        title: 'Success!!',
        message: `Successfully removed an admin`,
        color: 'green'
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (auth && auth.user) {
      getAdmins();
    }
  }, [auth]);

  return (
    <Layout admin>
      <Box>
        <Title order={3}>Super Admin Dashboard - {CURRENT_SEMESTER}</Title>
        <Text my={10} size="sm" color="dimmed">
          Welcome to the BRACU ST Super Admin Dashboard!
        </Text>
        <Divider />
        <Box mt={30}>
          <Card p={20} shadow="xs">
            <Title mb={20} order={4}>
              Add New Admin
            </Title>
            <form onSubmit={addAdminForm.onSubmit((values) => addAdmin(values))}>
              <Grid gutter="xs">
                <Grid.Col sm={6} span={12}>
                  <TextInput {...addAdminForm.getInputProps('name')} label="Name" />
                </Grid.Col>
                <Grid.Col sm={6} span={12}>
                  <TextInput {...addAdminForm.getInputProps('email')} label="Email" />
                </Grid.Col>
              </Grid>
              <Button type="submit" mt={20}>
                <IconPlus /> Add Admin
              </Button>
            </form>
          </Card>
        </Box>
      </Box>
      <Box mt={30}>
        <CustomDatatable
          columns={[
            { accessor: 'name' },
            { accessor: 'email' },
            {
              accessor: 'action',
              render: (admin: any) => {
                return (
                  <Center>
                    <IconTrash color="red" onClick={() => deleteAdmin(admin)} />
                  </Center>
                );
              }
            }
          ]}
          tableData={allAdmins}
          tableTitle={'List of Admins'}
          tableContent={'List of normal admins that has been added'}
          pageSize={10}
        />
      </Box>
    </Layout>
  );
};
