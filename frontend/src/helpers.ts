import { format, formatRelative } from 'date-fns';

export function formatDate(date: Date) {
  return format(date, 'MMMM dd, yyyy HH:mm');
}

export function formatDateRelative(date: Date) {
  return formatRelative(date, new Date());
}
