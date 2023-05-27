export const filterRecords = (records: any[], filterText: string) => {
  if (filterText === '') {
    return records;
  }
  return records.filter((record) =>
    Object.values(record).some((value) =>
      String(value).trim().toLowerCase().includes(filterText.trim().toLowerCase())
    )
  );
};
