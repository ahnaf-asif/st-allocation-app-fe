import { Layout } from '@/Layouts';
import { Box, Divider, Table, Text, Title } from '@mantine/core';
import { CURRENT_SEMESTER } from '@/Config';
import { useAppSelector } from '@/Redux/hooks';
import { StRoutine } from '@/Shared/Components';

export const StDashboard = () => {
  const auth = useAppSelector((state) => state.auth);

  return (
    <Layout user>
      <Title order={3}>Student Tutor Dashboard - {CURRENT_SEMESTER}</Title>
      <Text my={10} size="sm" color="dimmed">
        Welcome to the BRACU ST Allocation Dashboard!
      </Text>
      <Divider />
      <Box mt={30}>
        <Table withBorder withColumnBorders>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{auth?.user?.name}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{auth?.user?.email}</td>
            </tr>
            <tr>
              <td>Student ID</td>
              <td>{auth?.user?.student_id}</td>
            </tr>
            <tr>
              <td>Course</td>
              <td>{auth?.user?.course}</td>
            </tr>
            <tr>
              <td>Section</td>
              <td>{auth?.user?.section}</td>
            </tr>
          </tbody>
        </Table>
      </Box>

      <Box mt={30}>
        <Title mb={20} order={3}>
          My Routine
        </Title>

        <StRoutine userId={auth.user ? auth.user.id : 0} />
      </Box>

      <Box mt={30}></Box>
    </Layout>
  );
};
