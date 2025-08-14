export function formatDateToHumanReadable(date: any) {
  const now: any = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInSeconds < 60) {
    return 'Just now';
  }
  else if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  }
  else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  }
  else if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  }
  else {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  }
}

export function convertToISOWithOffset(dateStr: string, offsetHours: number) {
  const [datePart, timePart] = dateStr.split(' ');

  const isoDateStr = `${datePart}T${timePart}:00+${String(
    offsetHours,
  ).padStart(2, '0')}:00`;

  return isoDateStr;
}

export function convertDatesToServerTime<
  T extends { startDate: string; endDate: string }[],
>(items: T): T {
  const SERVER_TIME_UTC_OFFSET = 8;
  return items.map(item => ({
    ...item,
    startDate: convertToISOWithOffset(
      item.startDate,
      SERVER_TIME_UTC_OFFSET,
    ),
    endDate: convertToISOWithOffset(item.endDate, SERVER_TIME_UTC_OFFSET),
  })) as T;
}
