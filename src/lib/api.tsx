const API_BASE_URL = 'https://backend-romi.vercel.app';


export interface Symptom {
  id: number;
  name: string;
  categories: string[];
  solutions: {
    painLevel: [number, number];
    recommendations: string[];
    alert: boolean;
  }[];
}

interface PatientRecord {
  nombre: string;
  sintomaId: number;
  nivelDolor: number;
}

export interface Patient {
  id: string;
  nombre: string;
  sintomaId: number;
  nivelDolor: number;
  fecha: {
    _seconds: number;
    _nanoseconds: number;
  };
  sintomaNombre: string;
}

export const fetchPatients = async (): Promise<Patient[]> => {
  const response = await fetch(`${API_BASE_URL}/pacientes`);
  if (!response.ok) throw new Error('Error al obtener pacientes');
  return await response.json();
};

export interface RecommendationResponse {
  id: string;
  nombre: string;
  sintoma: string;
  recomendaciones: string[];
  alerta: boolean;
}

export const fetchSymptoms = async (): Promise<Symptom[]> => {
  const response = await fetch(`${API_BASE_URL}/sintomas`);
  if (!response.ok) throw new Error('Error al obtener síntomas');
  return await response.json();
};

export const submitSymptoms = async (data: PatientRecord): Promise<RecommendationResponse> => {
  const response = await fetch(`${API_BASE_URL}/pacientes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error al enviar síntomas');
  return await response.json();
};