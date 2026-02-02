import { formatTimestamp } from './formats';

describe('formatTimestamp', () => {
  it('should return "Fecha no disponible" for null', () => {
    expect(formatTimestamp(null)).toBe('Fecha no disponible');
  });

  it('should return "Fecha no disponible" for undefined', () => {
    expect(formatTimestamp(undefined)).toBe('Fecha no disponible');
  });

  it('should format Firestore timestamp', () => {
    const firestoreTimestamp = {
      _seconds: 1704067200, // 2024-01-01 00:00:00 UTC
      _nanoseconds: 0,
    };
    const result = formatTimestamp(firestoreTimestamp);
    expect(result).toMatch(/\d{2}\/\d{2}\/\d{4}/);
    expect(result).not.toBe('Fecha no disponible');
  });

  it('should format ISO string', () => {
    const result = formatTimestamp('2024-01-15T10:30:00.000Z');
    expect(result).toMatch(/\d{2}\/\d{2}\/\d{4}/);
    expect(result).not.toBe('Fecha no disponible');
  });

  it('should return "Fecha no disponible" for invalid string', () => {
    expect(formatTimestamp('invalid-date')).toBe('Fecha no disponible');
  });

  it('should return "Fecha no disponible" for object without _seconds', () => {
    expect(formatTimestamp({ _nanoseconds: 0 } as never)).toBe(
      'Fecha no disponible'
    );
  });

  it('should handle Firestore timestamp with optional nanoseconds', () => {
    const firestoreTimestamp = { _seconds: 1704067200 };
    const result = formatTimestamp(firestoreTimestamp);
    expect(result).not.toBe('Fecha no disponible');
  });
});
