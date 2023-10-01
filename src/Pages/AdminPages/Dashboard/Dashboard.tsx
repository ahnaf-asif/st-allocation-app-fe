import { Box, Divider, Grid, Text, Title } from '@mantine/core';
import { notifications, showNotification } from '@mantine/notifications';
import { Layout } from '@/Layouts';
import { axios, CURRENT_SEMESTER } from '@/Config';
import { CustomDatatable, InfoCard } from '@/Shared/Components';
import { IconUser } from '@tabler/icons-react';
import { AllStTable } from '@/Shared/Components/AllStTable/AllStTable';
import { useAppSelector } from '@/Redux/hooks';
import { useEffect, useState } from 'react';
import { AllRoomsTable } from '@/Shared/Components/AllRoomsTable/AllRoomsTable';

export const AdminDashboard = () => {
  const [allSts, setAllSts] = useState<any[]>([]);
  const [allRooms, setAllRooms] = useState<any[]>([]);
  const [allAdmins, setAllAdmins] = useState<any[]>([]);
  const auth = useAppSelector((state) => state.auth);

  const getAllSts = async () => {
    try {
      const { data } = await axios.get('/admin/sts');
      setAllSts(data);
    } catch (e) {
      showNotification({
        title: 'Error',
        message: 'Error getting all sts'
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
        message: 'Error getting all sts',
        color: 'red'
      });
    }
  };

  const getAllAdmins = async () => {
    try {
      const resp = await axios.get('/admin/super/admins');
      setAllAdmins(resp.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (auth.user) {
      getAllSts();
      getAllRooms();
      getAllAdmins();
    }
  }, [auth]);

  return (
    <Layout admin>
      <Box>
        <Title order={3}>Admin Dashboard - {CURRENT_SEMESTER}</Title>
        <Text my={10} size="sm" color="dimmed">
          Welcome to the BRACU ST Allocation Admin Dashboard!
        </Text>
        <Divider />
        <Box mt={30}>
          <Grid>
            <Grid.Col sm={4} span={6}>
              <InfoCard
                title="Admins"
                data={allAdmins.length}
                bgColor="#068000"
                textColor="white"
              />
            </Grid.Col>
            <Grid.Col sm={4} span={6}>
              <InfoCard
                title="Student Tutors"
                data={allSts.length}
                bgColor="#003796"
                textColor="white"
              />
            </Grid.Col>
            <Grid.Col sm={4} span={6}>
              <InfoCard title="Rooms" data={allRooms.length} bgColor="#7a0076" textColor="white" />
            </Grid.Col>
          </Grid>
        </Box>
        <AllRoomsTable allRooms={allRooms} getAllRooms={getAllRooms} />
        <AllStTable allSts={allSts} getAllSts={getAllSts} />
      </Box>
    </Layout>
  );
};
