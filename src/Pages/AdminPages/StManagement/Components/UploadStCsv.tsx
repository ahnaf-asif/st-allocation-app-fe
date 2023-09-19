import { Box, Button, Card, FileInput, Grid, Text, Title } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import * as Papa from 'papaparse';
import { axios } from '@/Config';
import { notifications } from '@mantine/notifications';
import { AxiosError } from 'axios';

export const UploadStCsv = ({ getAllSts }: any) => {
  const csvForm = useForm({
    initialValues: {
      csv: null
    }
  });

  const addSts = async (data: any[]) => {
    for (const st of data) {
      try {
        const resp = await axios.post('/admin/sts/add', st);

        if (resp) {
          await getAllSts();
        }
      } catch (e) {
        console.log('For st = ', st, 'error: ', e);
      }
    }
  };

  const submitCsv = async (values: any) => {
    const file = values.csv;

    if (file && file.type === 'text/csv') {
      const reader = new FileReader();

      reader.onload = async (event) => {
        const csvContent = event?.target?.result as string;
        const data = Papa.parse(csvContent, { header: true }).data;
        notifications.show({
          title: 'CSV submitted!',
          message: 'Please wait until you get a notification that the process is complete.'
        });

        await addSts(data);

        notifications.show({
          title: 'Success!!',
          message: 'Successfully added the student tutors',
          color: 'green'
        });

        csvForm.reset();
      };

      reader.onerror = function (event) {
        console.error('Error reading CSV file:', event);
      };
      reader.readAsText(file);
    } else {
      console.error('Not a CSV file');
    }
  };

  return (
    <Box>
      <Card mt={30} withBorder>
        You can upload a CSV file containing all the student tutors. The CSV must contain the
        following 4 fields: <strong>name</strong>, <strong>email</strong>,{' '}
        <strong>student_id</strong>, <strong>course</strong>. Here is a sample CSV file to download:{' '}
        <a href="/reference-add-st.csv" download>
          Download the sample
        </a>
        .
      </Card>
      <Box mt={30}>
        <Title my={10} order={4}>
          Upload CSV
        </Title>
        <form
          encType="multipart/form-data"
          onSubmit={csvForm.onSubmit((values) => submitCsv(values))}
        >
          <Grid>
            <Grid.Col span={8}>
              <FileInput
                {...csvForm.getInputProps('csv')}
                accept="text/csv"
                placeholder="Insert the csv file"
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Button type="submit" fullWidth color="green">
                <IconPlus size={18} />
                Upload
              </Button>
            </Grid.Col>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};
