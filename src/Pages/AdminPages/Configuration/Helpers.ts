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

export function convertTo24HourFormat(time12: string): string {
  const [hrmn, a] = time12.split(' ');
  const [hour, minute] = hrmn.split(':');

  let hour24 = parseInt(hour, 10);

  if (a === 'PM' && hour24 !== 12) {
    hour24 += 12;
  } else if (a === 'AM' && hour24 === 12) {
    hour24 = 0;
  }

  const hour24String = hour24.toString().padStart(2, '0');
  const minuteString = minute.padStart(2, '0');

  return `${hour24String}:${minuteString}`;
}
