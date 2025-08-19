// components/FirestoreDate.tsx
import type { Patient } from '@/lib/api';
import { Timestamp } from 'firebase/firestore';

interface FirestoreDateProps {
  timestamp: {
    _seconds: number;
    _nanoseconds: number;
  };
  format?: 'full' | 'date' | 'time';
}

export default function FirestoreDate({ timestamp, format = 'full' }: FirestoreDateProps) {
  const firestoreTimestamp = new Timestamp(timestamp._seconds, timestamp._nanoseconds);
  const date = firestoreTimestamp.toDate();

  const formatOptions: Record<string, Intl.DateTimeFormatOptions> = {
    full: {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    },
    date: {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    },
    time: {
      hour: '2-digit',
      minute: '2-digit'
    }
  };

  return (
    <span>
      {date.toLocaleDateString('es-ES', formatOptions[format])}
    </span>
  );
}

// Función helper para ordenar
export function sortPatientsByDate(patients: Patient[]): Patient[] {
  return [...patients].sort((a, b) => {
    const dateA = new Timestamp(a.fecha._seconds, a.fecha._nanoseconds).toMillis();
    const dateB = new Timestamp(b.fecha._seconds, b.fecha._nanoseconds).toMillis();
    return dateB - dateA; // Orden descendente (más reciente primero)
  });
}