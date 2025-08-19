// Importaciones de librerías y componentes
import { useState, useEffect } from 'react';
import { SymptomForm } from './components/symptom-form';
import { SymptomResult } from './components/symptom-result';
import { 
  fetchSymptoms, 
  submitSymptoms, 
  fetchPatients, 
  type RecommendationResponse, 
  type Symptom, 
  type Patient 
} from './lib/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import logo from './assets/logo1.png'; 
import FirestoreDate, { sortPatientsByDate } from './components/FirestoreDate';
import { 
  faUser, 
  faHospital, 
  faClock, 
  faLevelUpAlt 
} from '@fortawesome/free-solid-svg-icons';
import { Bot } from 'lucide-react';

// Componente principal de la aplicación
export default function App() {
  // Estados de la aplicación
  const [symptoms, setSymptoms] = useState<Symptom[]>([]); // Lista de síntomas disponibles
  const [recommendation, setRecommendation] = useState<RecommendationResponse | null>(null); // Recomendación médica
  const [patients, setPatients] = useState<Patient[]>([]); // Lista de pacientes registrados
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(''); // Mensajes de error
  const [view, setView] = useState<'form' | 'patients'>('form'); // Vista actual (formulario o lista de pacientes)
  const [showLoadingScreen, setShowLoadingScreen] = useState(true); // Mostrar pantalla de carga inicial

  // Efecto para carga inicial
  useEffect(() => {
    // Retraso inicial de 2 segundos para la pantalla de carga
    const timer = setTimeout(() => {
      setShowLoadingScreen(false);
      loadSymptoms(); // Cargar síntomas después del retraso
    }, 2000);

    // Limpieza del timer al desmontar el componente
    return () => clearTimeout(timer);
  }, []);

  /**
   * Función para cargar los síntomas desde la API
   */
  const loadSymptoms = async () => {
    try {
      const data = await fetchSymptoms();
      setSymptoms(data);
    } catch (err) {
      setError('Error al cargar síntomas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Función para cargar la lista de pacientes
   */
  const loadPatients = async () => {
    setLoading(true);
    try {
      // Retraso artificial de 1.5 segundos para mejor experiencia de usuario
      await new Promise(resolve => setTimeout(resolve, 1500));
      const data = await fetchPatients();
      setPatients(data);
      setView('patients'); // Cambiar a vista de pacientes
    } catch (err) {
      setError('Error al cargar pacientes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Maneja el envío del formulario de síntomas
   * @param formData Datos del formulario (nombre, ID de síntoma, nivel de dolor)
   */
  const handleSubmit = async (formData: { 
    name: string; 
    symptomId: number; 
    painLevel: number 
  }) => {
    setLoading(true);
    try {
      // Enviar síntomas a la API
      const result = await submitSymptoms({
        nombre: formData.name,
        sintomaId: formData.symptomId,
        nivelDolor: formData.painLevel
      });
      setRecommendation(result); // Guardar recomendación recibida
    } catch (err) {
      setError('Error al procesar síntomas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Pantalla de carga inicial (mostrada por 2 segundos)
  if (showLoadingScreen) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-[#bde0fe] p-4">
        <h1 className="text-3xl font-bold text-[#2a4365] mb-8">ROMI Express</h1>
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg mb-6">
          <img 
            src={logo} 
            alt="ROMI Express"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-xl font-medium text-[#2a4365]">
          Cargando...
        </div>
      </div>
    );
  }

  // Pantalla de carga durante operaciones (cuando no hay recomendación ni pacientes)
  if (loading && !recommendation && patients.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-[#bde0fe] p-4">
        <h1 className="text-3xl font-bold text-[#2a4365] mb-8">ROMI Express</h1>
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg mb-6">
          <img 
            src={logo} 
            alt="ROMI Express"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-xl font-medium text-[#2a4365]">
          Cargando...
        </div>
      </div>
    );
  }

  // Manejo de errores
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  // Renderizado principal de la aplicación
  return (
    <div className="min-h-screen bg-[#0077b6] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Vista de lista de pacientes */}
        {view === 'patients' ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            {/* Botón para volver al formulario */}
            <button 
              onClick={() => setView('form')}
              className="mb-4 flex items-center text-blue-500 hover:text-blue-700"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
              Volver al formulario
            </button>
            
            {/* Título de la sección de pacientes */}
            <h2 className="text-xl font-bold mb-4 flex items-center justify-center">
              <FontAwesomeIcon icon={faUsers} className="mr-2" />
              Casos registrados
            </h2>
            
            {/* Lista de pacientes o mensaje si no hay */}
            {patients.length === 0 ? (
              <p className='text-center flex items-center justify-center gap-2'>
                <Bot className="h-5 w-5" />
                No hay pacientes registrados
              </p>
            ) : (
              <div className="space-y-2">
                {/* Mapeo de pacientes ordenados por fecha */}
                {sortPatientsByDate(patients).map(patient => (
                  <details key={patient.id} className="border rounded-lg overflow-hidden">
                    <summary className="p-3 bg-gray-50 hover:bg-gray-100 cursor-pointer flex justify-between items-center">
                      <div className="flex items-center">
                        <FontAwesomeIcon icon={faUser} className="mr-2 text-blue-500" />
                        <span className="font-medium">{patient.nombre}</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        <FontAwesomeIcon icon={faClock} className="mr-1" />
                        <FirestoreDate timestamp={patient.fecha} format="date" />
                      </div>
                    </summary>
                    <div className="p-3 bg-white space-y-2">
                      <div className="flex items-center">
                        <FontAwesomeIcon icon={faHospital} className="mr-2 text-red-500 w-4" />
                        <span><strong>Síntoma:</strong> {patient.sintomaNombre}</span>
                      </div>
                      <div className="flex items-center">
                        <FontAwesomeIcon icon={faLevelUpAlt} className="mr-2 text-orange-500 w-4" />
                        <span><strong>Nivel de dolor:</strong> {patient.nivelDolor}/10</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <FontAwesomeIcon icon={faClock} className="mr-2" />
                        <span><strong>Fecha y hora de registro:</strong> <FirestoreDate timestamp={patient.fecha} format="full" /></span>
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            )}
          </div>
        ) : /* Vista de formulario (si no hay recomendación) */ !recommendation ? (
          <>
            <div className="text-center mb-6">
              <div className="mx-auto w-24 h-24 rounded-full bg-white p-2 mb-4 overflow-hidden border-4 border-white shadow-md">
                <img 
                  src={logo} 
                  alt="Logo de la aplicación" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Sistema de Diagnóstico Médico ROMI Express
              </h1>

              <p className="text-lg text-white opacity-90 text-justify max-w-prose mx-auto leading-relaxed">
                Esta aplicación te ayuda a evaluar tus síntomas y obtener recomendaciones médicas preliminares.
                Por favor, completa el formulario a continuación.
              </p>
            </div>
            
            {/* Componente de formulario de síntomas */}
            <SymptomForm 
              symptoms={symptoms} 
              onSubmit={handleSubmit} 
              loading={loading}
            />
            
            {/* Botón para ver pacientes registrados */}
            <button
              onClick={loadPatients}
              className="mt-4 w-full flex justify-center items-center bg-[#ade8f4] hover:bg-[#588157] text-black py-2 px-4 rounded transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faUsers} className="mr-2" />
              Ver casos registrados
            </button>
          </>
        ) : (
          /* Vista de resultados de diagnóstico */
          <SymptomResult 
            recommendation={recommendation}
            onReset={() => setRecommendation(null)}
          />
        )}
      </div>
    </div>
  );
}