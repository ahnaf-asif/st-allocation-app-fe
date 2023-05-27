import { Layout } from '@/Layouts';
import { Box, Divider, Modal, Table, Text, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/Redux/hooks';
import { notifications } from '@mantine/notifications';
import { axios } from '@/Config';
import { CustomDatatable } from '@/Shared/Components';

export const AdminRoutine = () => {
  const [routine, setRoutine] = useState<any[]>([]);

  const [filteredSts, setFilteredSts] = useState([]);
  const [filteredStsTableTitle, setFilteredStsTableTitle] = useState('');
  const [filteredStsModal, setFilteredStsModal] = useState(false);

  const auth = useAppSelector((state) => state.auth);

  const getRoutine = async () => {
    try {
      const resp = await axios.get('/admin/routine');

      setRoutine(resp.data);
    } catch (e) {
      notifications.show({
        title: 'Error!!!',
        message: 'Unexpected Error Happened while getting the routine',
        color: 'red'
      });
    }
  };

  useEffect(() => {
    if (auth.user) {
      getRoutine();
    }
  }, [auth]);

  const routineClicked = async (
    dayId: number,
    dayName: string,
    scheduleId: number,
    scheduleName: string,
    roomId: number,
    roomName: string
  ) => {
    try {
      const resp = await axios.get(
        `/admin/routine/filter?dayId=${dayId}&scheduleId=${scheduleId}&roomId=${roomId}`
      );
      setFilteredSts(resp.data);
      setFilteredStsTableTitle(`${dayName}, ${scheduleName} (${roomName})`);
      setFilteredStsModal(true);
    } catch (e) {
      notifications.show({
        title: 'Error!!!',
        message: 'Unexpected Error Happened while filtering the users',
        color: 'red'
      });
    }
  };

  return (
    <Layout admin>
      <Box>
        <Title order={3}>ST Overall Routine</Title>
        <Text my={10} size="sm" color="dimmed">
          Here you can see the overall routine of Student Tutors
        </Text>
        <Divider />
      </Box>
      <Box mt={30}>
        <Table withBorder withColumnBorders verticalSpacing="lg">
          <thead>
            <tr>
              <th>Period / Day</th>
              <th>Saturday</th>
              <th>Sunday</th>
              <th>Monday</th>
              <th>Tuesday</th>
              <th>Wednesday</th>
              <th>Thursday</th>
            </tr>
          </thead>
          <tbody>
            {routine.map((r, index) => (
              <tr key={index}>
                <td>{r.schedule}</td>
                <td>
                  {r.Saturday.map(({ dayId, room, sts }: any) => (
                    <Text key={room.roomId}>
                      {room.name} :{' '}
                      <span
                        onClick={() =>
                          routineClicked(
                            dayId,
                            'Saturday',
                            r.scheduleId,
                            r.schedule,
                            room.roomId,
                            room.name
                          )
                        }
                        style={{ color: 'blue', cursor: 'pointer', userSelect: 'none' }}
                      >
                        [{sts}]
                      </span>
                    </Text>
                  ))}
                </td>
                <td>
                  {r.Sunday.map(({ dayId, room, sts }: any) => (
                    <Text key={room.roomId}>
                      {room.name} :{' '}
                      <span
                        onClick={() =>
                          routineClicked(
                            dayId,
                            'Sunday',
                            r.scheduleId,
                            r.schedule,
                            room.roomId,
                            room.name
                          )
                        }
                        style={{ color: 'blue', cursor: 'pointer', userSelect: 'none' }}
                      >
                        [{sts}]
                      </span>
                    </Text>
                  ))}
                </td>

                <td>
                  {r.Monday.map(({ dayId, room, sts }: any) => (
                    <Text key={room.roomId}>
                      {room.name} :{' '}
                      <span
                        onClick={() =>
                          routineClicked(
                            dayId,
                            'Monday',
                            r.scheduleId,
                            r.schedule,
                            room.roomId,
                            room.name
                          )
                        }
                        style={{ color: 'blue', cursor: 'pointer', userSelect: 'none' }}
                      >
                        [{sts}]
                      </span>
                    </Text>
                  ))}
                </td>

                <td>
                  {r.Tuesday.map(({ dayId, room, sts }: any) => (
                    <Text key={room.roomId}>
                      {room.name} :{' '}
                      <span
                        onClick={() =>
                          routineClicked(
                            dayId,
                            'Tuesday',
                            r.scheduleId,
                            r.schedule,
                            room.roomId,
                            room.name
                          )
                        }
                        style={{ color: 'blue', cursor: 'pointer', userSelect: 'none' }}
                      >
                        [{sts}]
                      </span>
                    </Text>
                  ))}
                </td>
                <td>
                  {r.Wednesday.map(({ dayId, room, sts }: any) => (
                    <Text key={room.roomId}>
                      {room.name} :{' '}
                      <span
                        onClick={() =>
                          routineClicked(
                            dayId,
                            'Wednesday',
                            r.scheduleId,
                            r.schedule,
                            room.roomId,
                            room.name
                          )
                        }
                        style={{ color: 'blue', cursor: 'pointer', userSelect: 'none' }}
                      >
                        [{sts}]
                      </span>
                    </Text>
                  ))}
                </td>
                <td>
                  {r.Thursday.map(({ dayId, room, sts }: any) => (
                    <Text key={room.roomId}>
                      {room.name} :{' '}
                      <span
                        onClick={() =>
                          routineClicked(
                            dayId,
                            'Thursday',
                            r.scheduleId,
                            r.schedule,
                            room.roomId,
                            room.name
                          )
                        }
                        style={{ color: 'blue', cursor: 'pointer', userSelect: 'none' }}
                      >
                        [{sts}]
                      </span>
                    </Text>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Modal
          centered
          size="xl"
          withCloseButton={false}
          opened={filteredStsModal}
          onClose={() => setFilteredStsModal(false)}
        >
          <CustomDatatable
            pageSize={5}
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
                sortable: true
              },
              {
                accessor: 'section',
                sortable: true
              }
            ]}
            tableData={filteredSts}
            tableTitle={''}
            tableContent={filteredStsTableTitle}
          />
        </Modal>
      </Box>
    </Layout>
  );
};
