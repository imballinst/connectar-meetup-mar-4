import { differenceInDays, format, formatDistanceStrict } from 'date-fns';

export function formatDate(date: Date) {
  return format(date, 'MMMM dd, yyyy HH:mm');
}

export function formatCardDate(date: Date) {
  const currentDate = new Date();
  const diffInDays = Math.abs(differenceInDays(date, currentDate));

  if (diffInDays > 7) {
    return formatDate(date);
  }

  return `${formatDistanceStrict(date, currentDate)} ago`;
}
