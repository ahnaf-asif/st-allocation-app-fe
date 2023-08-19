import { Layout } from '@/Layouts';
import { Box, Divider, Modal, Table, Text, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/Redux/hooks';
import { notifications } from '@mantine/notifications';
import { axios } from '@/Config';
import { CustomDatatable } from '@/Shared/Components';
import StaticRoutine from './StaticRoutine.json';

export const AdminStaticRoutine = () => {
  const [routine, setRoutine] = useState<any[]>([]);

  const [filteredSts, setFilteredSts] = useState([]);
  const [filteredStsTableTitle, setFilteredStsTableTitle] = useState('');
  const [filteredStsModal, setFilteredStsModal] = useState(false);
  const getRoutine = async () => {
    try {
      setRoutine(StaticRoutine);
    } catch (e) {
      notifications.show({
        title: 'Error!!!',
        message: 'Unexpected Error Happened while getting the routine',
        color: 'red'
      });
    }
  };

  useEffect(() => {
    getRoutine();
  }, []);

  const routineClicked = async (
    dayId: number,
    dayName: string,
    scheduleId: number,
    scheduleName: string,
    roomId: number,
    roomName: string,
    stDetails: any
  ) => {
    try {
      setFilteredSts(stDetails);
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
    <Box m={40}>
      <Box>
        <Title order={3}>ST Overall Routine (Summer 2023 - MNS Department)</Title>
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
                  {r.Saturday.map(({ dayId, room, sts, stDetails }: any) => (
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
                            room.name,
                            stDetails
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
                  {r.Sunday.map(({ dayId, room, sts, stDetails }: any) => (
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
                            room.name,
                            stDetails
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
                  {r.Monday.map(({ dayId, room, sts, stDetails }: any) => (
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
                            room.name,
                            stDetails
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
                  {r.Tuesday.map(({ dayId, room, sts, stDetails }: any) => (
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
                            room.name,
                            stDetails
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
                  {r.Wednesday.map(({ dayId, room, sts, stDetails }: any) => (
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
                            room.name,
                            stDetails
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
                  {r.Thursday.map(({ dayId, room, sts, stDetails }: any) => (
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
                            room.name,
                            stDetails
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
    </Box>
  );
};
