// Importaciones de componentes UI personalizados
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { 
  AlertTriangle, 
  CheckCircle2, 
  Stethoscope, 
  ClipboardList, 
  RotateCw, 
  AlertCircle, 
  ClipboardCheck, 
  Activity, 
  User 
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

// Importación de assets
import logo1 from "@/assets/logo1.png";

// Definición de las props del componente
interface SymptomResultProps {
  recommendation: {
    nombre: string;           // Nombre del paciente
    sintoma: string;          // Síntoma reportado
    recomendaciones: string[]; // Lista de recomendaciones
    alerta: boolean;          // Bandera de alerta médica
  };
  onReset: () => void;        // Función para reiniciar el diagnóstico
}

/**
 * Componente para mostrar los resultados de un diagnóstico médico
 * Presenta recomendaciones basadas en los síntomas ingresados
 */
export function SymptomResult({ recommendation, onReset }: SymptomResultProps) {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Logo flotante en la parte superior */}
      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center space-y-2">
        <div className="rounded-full border-4 border-white bg-white shadow-lg w-20 h-20 flex items-center justify-center overflow-hidden">
          <img 
            src={logo1} 
            alt="Médico Express Logo" 
            className="w-full h-full object-contain p-1"
          />
        </div>
        <h2 className="text-md font-bold text-[#6096ba] bg-white px-4 py-1 rounded-full shadow-sm">
          Médico Express
        </h2>
      </div>

      {/* Tarjeta principal de resultados */}
      <Card className="w-full bg-[#6096ba] border-[#6096ba] text-white pt-20">
        {/* Encabezado de la tarjeta */}
        <CardHeader className="pb-4">
          <CardTitle className="text-center text-2xl flex justify-center items-center gap-3 mt-4">
            <Stethoscope className="h-6 w-6" />
            Recomendación Médica
            <ClipboardList className="h-6 w-6" />
          </CardTitle>
        </CardHeader>
        
        {/* Contenido de la tarjeta */}
        <CardContent className="space-y-6 bg-white text-gray-800 rounded-b-lg p-6">
          {/* Alerta principal (roja si es urgente, verde si no) */}
          <Alert variant={recommendation.alerta ? "destructive" : "default"} className="shadow-md">
            <div className="flex items-start gap-3">
              {/* Icono condicional según tipo de alerta */}
              {recommendation.alerta ? (
                <AlertTriangle className="h-5 w-5 mt-0.5 text-red-600" />
              ) : (
                <CheckCircle2 className="h-5 w-5 mt-0.5 text-green-600" />
              )}
              
              <div className="flex-1 text-center">
                {/* Título con información del paciente y síntoma */}
                <AlertTitle className="text-lg">
                  <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:gap-4 sm:justify-center">
                    {/* Sección de información del paciente */}
                    <div className="flex flex-col items-center sm:flex-row sm:items-center gap-1">
                      <div className="flex items-center gap-1">
                        <User className="h-6 w-6 flex-shrink-0" />
                        <span className="font-semibold text-sm sm:text-base">Paciente:</span>
                      </div>
                      <span className="text-sm sm:text-base text-center sm:text-left break-words max-w-full">
                        {recommendation.nombre}
                      </span>
                    </div>

                    {/* Sección de información del síntoma */}
                    <div className="flex flex-col items-center sm:flex-row sm:items-center gap-1">
                      <div className="flex items-center gap-1">
                        <Activity className="h-6 w-6 flex-shrink-0" />
                        <span className="font-semibold text-sm sm:text-base">Síntoma:</span>
                      </div>
                      <span className="text-sm sm:text-base text-center sm:text-left break-words max-w-full">
                        {recommendation.sintoma}
                      </span>
                    </div>
                  </div>
                </AlertTitle>

                {/* Descripción de la alerta */}
                <AlertDescription className="mt-2 whitespace-normal text-center text-gray-600">
                  {recommendation.alerta 
                    ? <span className="flex justify-center items-center gap-1">
                        <AlertCircle className="h-10 w-10 text-red-500" />
                        Se recomienda atención médica inmediata
                      </span>
                    : <span className="flex justify-center items-center gap-1">
                        <ClipboardCheck className="h-10 w-10 text-green-500" />
                        Estas son algunas recomendaciones generales para tu condición
                      </span>}
                </AlertDescription>
              </div>
            </div>
          </Alert>

          {/* Lista de recomendaciones */}
          <div className="space-y-3 bg-blue-50 p-4 rounded-lg border border-blue-100">
            <h3 className="font-semibold text-lg text-center flex items-center justify-center gap-2 text-blue-800">
              <ClipboardList className="h-5 w-5" />
              Recomendaciones:
            </h3>
            <ul className="space-y-3 list-disc pl-6">
              {recommendation.recomendaciones.map((item, index) => (
                <li key={index} className="text-gray-700">{item}</li>
              ))}
            </ul>
          </div>

          {/* Nota de advertencia */}
          <Alert className="bg-blue-100 border-blue-200 shadow-sm">
            <AlertDescription className="text-blue-800 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Recuerda que esta es una recomendación automatizada. Si los síntomas persisten o empeoran, consulta a un profesional de la salud.
            </AlertDescription>
          </Alert>

          {/* Botón para reiniciar el diagnóstico */}
          <Button 
            onClick={onReset} 
            className="w-full mt-4 bg-[#6096ba] hover:bg-[#4a7c9a] text-white"
            size="lg"
          >
            <RotateCw className="mr-2 h-4 w-4" />
            Realizar otro diagnóstico
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}