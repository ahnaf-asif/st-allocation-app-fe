export function convertTo12HourFormat(time24: string): string {
  const [hours, minutes] = time24.split(':').map(Number);

  let period = 'AM';
  let convertedHours = hours;

  if (convertedHours >= 12) {
    period = 'PM';
    convertedHours = convertedHours === 12 ? 12 : convertedHours - 12;
  } else if (convertedHours === 0) {
    convertedHours = 12;
  }

  return `${convertedHours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')} ${period}`;
}
