export const formatTimestamp = (createdAt: any): string => {
  if (!createdAt || !createdAt._seconds) {
    return 'Fecha no disponible';
  }

  const date = new Date(
    createdAt._seconds * 1000 + createdAt._nanoseconds / 1000000
  );

  return date.toLocaleString('es-PE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};
