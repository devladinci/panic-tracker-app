import {
  format as fnsFormat,
  isSameDay,
  isSameWeek,
  isSameYear,
  subDays,
} from 'date-fns';

export function formatDateTime(interval: number | null) {
  if (!interval) {
    return null;
  }

  const date = new Date(interval);

  return fnsFormat(date, 'dd MMM, yyyy HH:mm');
}

export function formatDate(interval: number | null) {
  if (!interval) {
    return null;
  }

  const date = new Date(interval);

  return fnsFormat(date, 'dd MMM, yyyy');
}

export function formatTime(interval: number | null) {
  if (!interval) {
    return null;
  }

  const date = new Date(interval);

  return fnsFormat(date, 'HH:mm');
}

export function forHeatmap(interval: number) {
  const date = new Date(interval);
  return fnsFormat(date, 'yyyy-MM-dd');
}

export function readableDate(interval: number): string {
  const date = new Date(interval);
  const now = new Date();

  if (isSameDay(date, now)) {
    return 'today';
  }

  if (isSameDay(date, subDays(now, 1))) {
    return 'yesterday';
  }

  if (isSameWeek(date, now)) {
    return fnsFormat(date, 'cccc');
  }

  if (isSameYear(date, now)) {
    return fnsFormat(date, 'LLLL do');
  }

  return fnsFormat(date, 'LLLL do yyyy');
}
