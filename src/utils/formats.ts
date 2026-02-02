export interface FirestoreTimestamp {
  _seconds: number;
  _nanoseconds?: number;
}

export type TimestampInput = FirestoreTimestamp | string | null | undefined;

const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: true,
};

export const formatTimestamp = (createdAt: TimestampInput): string => {
  if (createdAt == null) {
    return 'Fecha no disponible';
  }

  let date: Date;

  if (typeof createdAt === 'string') {
    date = new Date(createdAt);
  } else if (
    typeof createdAt === 'object' &&
    typeof createdAt._seconds === 'number'
  ) {
    const nanoseconds = createdAt._nanoseconds ?? 0;
    date = new Date(createdAt._seconds * 1000 + nanoseconds / 1_000_000);
  } else {
    return 'Fecha no disponible';
  }

  if (isNaN(date.getTime())) {
    return 'Fecha no disponible';
  }

  return date.toLocaleString('es-PE', DATE_OPTIONS);
};
