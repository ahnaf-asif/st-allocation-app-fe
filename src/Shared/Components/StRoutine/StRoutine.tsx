import { Box, Center, Table } from '@mantine/core';
import { useAppSelector } from '@/Redux/hooks';
import { useEffect, useState } from 'react';
import { axios } from '@/Config';
import { notifications } from '@mantine/notifications';

export const StRoutine = ({ userId }: { userId: number }) => {
  const [routine, setRoutine] = useState([]);
  const auth = useAppSelector((state) => state.auth);

  const getRoutine = async () => {
    try {
      const resp = await axios.get(`/st/routine/${userId}`);

      setRoutine(resp.data);
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
      getRoutine();
    }
  }, [auth]);

  return (
    <Box>
      <Table withBorder withColumnBorders verticalSpacing="xl">
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
          {routine.map((r: any, index) => (
            <tr key={index}>
              <td>{r.schedule}</td>
              <td style={r.Saturday ? { fontWeight: 'bold', background: '#ceffbf' } : {}}>
                <Center>{r.Saturday}</Center>
              </td>
              <td style={r.Sunday ? { fontWeight: 'bold', background: '#ceffbf' } : {}}>
                <Center>{r.Sunday}</Center>
              </td>
              <td style={r.Monday ? { fontWeight: 'bold', background: '#ceffbf' } : {}}>
                <Center>{r.Monday}</Center>
              </td>
              <td style={r.Tuesday ? { fontWeight: 'bold', background: '#ceffbf' } : {}}>
                <Center>{r.Tuesday}</Center>
              </td>
              <td style={r.Wednesday ? { fontWeight: 'bold', background: '#ceffbf' } : {}}>
                <Center>{r.Wednesday}</Center>
              </td>
              <td style={r.Thursday ? { fontWeight: 'bold', background: '#ceffbf' } : {}}>
                <Center>{r.Thursday}</Center>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Box>
  );
};
