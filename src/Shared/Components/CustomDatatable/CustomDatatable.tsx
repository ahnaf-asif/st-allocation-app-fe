import './custom-datatable.css';
import sortBy from 'lodash/sortBy';
import React, { useEffect, useState } from 'react';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { Box, Button, Card, Flex, Grid, Text, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

export interface ICustomDatatable {
  pageSize: number;
  columns: any[];
  tableData: any[];
  tableTitle: string;
  tableContent: string;
  removeFunctionality?: boolean;
}

import { filterRecords } from './Helpers';
import { remove } from 'lodash';

export const CustomDatatable = ({
  pageSize,
  columns,
  tableData,
  tableTitle,
  tableContent,
  removeFunctionality
}: ICustomDatatable) => {
  const [page, setPage] = useState(1);
  const [records, setRecords] = useState(tableData.slice(0, pageSize));
  const [query, setQuery] = useState('');
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: 'name',
    direction: 'asc'
  });

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecords(tableData.slice(from, to));
  }, [page]);

  useEffect(() => {
    const data = sortBy(tableData, sortStatus.columnAccessor);
    const from = (page - 1) * pageSize;
    const to = from + pageSize;

    setRecords(
      sortStatus.direction === 'desc' ? data.reverse().slice(from, to) : data.slice(from, to)
    );
  }, [sortStatus]);

  useEffect(() => {
    setRecords(tableData.slice(0, pageSize));
  }, [tableData]);

  useEffect(() => {
    const data = filterRecords(tableData, query);
    setRecords(data.slice(0, pageSize));
  }, [query]);

  const clearSearch = () => {
    setQuery('');
    setRecords(tableData.slice(0, pageSize));
    setSortStatus({
      columnAccessor: 'name',
      direction: 'asc'
    });
  };

  return (
    <Box>
      <Text fw={500} mb={8}>
        {tableTitle}
      </Text>
      <Card withBorder>
        <Text color="dimmed" mb={24}>
          {tableContent}
        </Text>
        <Grid mb={10} align="center">
          <Grid.Col sm={9.8} span={12}>
            <TextInput
              icon={<IconSearch size={16} />}
              value={query}
              onChange={(e) => setQuery(e.currentTarget.value)}
              height="100%"
              placeholder="Search Item"
            />
          </Grid.Col>
          <Grid.Col sm={2.2} span={12}>
            <Flex align="flex-end" justify="flex-end">
              <Button onClick={clearSearch} fullWidth radius={0}>
                Clear
              </Button>
            </Flex>
          </Grid.Col>
        </Grid>
        <Box sx={records.length === 0 ? { height: '300px' } : {}}>
          <DataTable
            withBorder
            withColumnBorders
            sortStatus={sortStatus}
            onSortStatusChange={setSortStatus}
            totalRecords={tableData.length}
            recordsPerPage={pageSize}
            page={page}
            onPageChange={(p) => setPage(p)}
            columns={columns}
            records={records}
            rowClassName={(row) => 'hover-light-blue'}
            paginationText={({
              from,
              to,
              totalRecords
            }: {
              from: number;
              to: number;
              totalRecords: number;
            }) => (
              <>
                {from} - {to} of {totalRecords} records
              </>
            )}
          />
        </Box>
      </Card>
    </Box>
  );
};
