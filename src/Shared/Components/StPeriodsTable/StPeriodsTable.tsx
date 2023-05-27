import { Box, Button, Center, Title } from '@mantine/core';
import { CustomDatatable } from '@/Shared/Components';
import { useAppSelector } from '@/Redux/hooks';

import { axios } from '@/Config';
import { AxiosError } from 'axios';
import { notifications } from '@mantine/notifications';

interface IPeriod {
  id: number;
  day: string;
  room: string;
  schedule: string;
}
export const StPeriodsTable = ({
  periods,
  getPeriods,
  updateRoutineDeadline
}: {
  periods: IPeriod[];
  getPeriods: any;
  updateRoutineDeadline: Date;
}) => {
  const auth = useAppSelector((state) => state.auth);
  const removePeriod = async (periodId: number) => {
    if (auth.user) {
      try {
        const resp = await axios.delete(`/st/remove-period/${auth.user.id}/${periodId}`);

        await getPeriods();

        notifications.show({
          title: 'Success!!!',
          message: 'Successfully removed the period',
          color: 'green'
        });
      } catch (e) {
        if (e instanceof AxiosError) {
          const { response } = e;

          if (response && response.data) {
            const { message } = response.data;

            notifications.show({
              title: 'Caution!!',
              message: `${message}`,
              color: 'red'
            });
          }
        } else {
          notifications.show({
            title: 'Error!!!',
            message: 'Unexpected error happened while searching rooms',
            color: 'red'
          });
        }
      }
    }
  };

  return (
    <Box>
      <Title order={3}>Booked Periods</Title>
      <Box mt={20}>
        <CustomDatatable
          pageSize={10}
          columns={[
            {
              accessor: 'day',
              sortable: true
            },
            {
              accessor: 'schedule',
              title: 'Time',
              sortable: true
            },
            {
              accessor: 'room',
              sortable: true
            },
            {
              accessor: 'action',
              render: ({ id }: any) => (
                <Center>
                  {updateRoutineDeadline >= new Date() ? (
                    <Button onClick={() => removePeriod(id)} size="xs" color="red">
                      Remove
                    </Button>
                  ) : (
                    '--'
                  )}
                </Center>
              )
            }
          ]}
          tableData={periods}
          tableTitle={''}
          tableContent={''}
        />
      </Box>
    </Box>
  );
};
