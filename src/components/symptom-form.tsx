// Importaciones de componentes UI personalizados
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// Importaciones de iconos
import { AlertCircle, Stethoscope, Plus, Minus } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Importaciones de React y tipos
import { useEffect, useState } from "react";
import type { Symptom } from "@/lib/api"; 
import { faSpinner, faFileMedical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Definición de las props del componente
interface SymptomFormProps {
  symptoms: Symptom[];          // Lista de síntomas disponibles
  onSubmit: (data: {            // Función para manejar el envío del formulario
    name: string; 
    symptomId: number; 
    painLevel: number 
  }) => void;
  loading: boolean;             // Estado de carga
}

/**
 * Componente para el formulario de registro de síntomas médicos
 * Muestra un formulario con campos para nombre, síntoma y nivel de dolor
 */
export function SymptomForm({ symptoms, onSubmit, loading }: SymptomFormProps) {
  // Estados del formulario
  const [name, setName] = useState("");              // Nombre del paciente
  const [symptomId, setSymptomId] = useState<number | null>(null); // ID del síntoma seleccionado
  const [painLevel, setPainLevel] = useState(5);     // Nivel de dolor (1-10)
  const [error, setError] = useState("");            // Mensajes de error

  // Efecto para limpiar mensajes de error después de 3 segundos
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  /**
   * Maneja el envío del formulario
   * @param e Evento del formulario
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación de campos requeridos
    if (!name || !symptomId) {
      setError("Por favor completa todos los campos");
      return;
    }
    
    // Llamada a la función onSubmit con los datos del formulario
    onSubmit({ name, symptomId, painLevel });
  };

  /**
   * Incrementa el nivel de dolor (máximo 10)
   * @param e Evento de click
   */
  const incrementPain = (e: React.MouseEvent) => {
    e.preventDefault();
    if (painLevel < 10) setPainLevel(painLevel + 1);
  };

  /**
   * Decrementa el nivel de dolor (mínimo 1)
   * @param e Evento de click
   */
  const decrementPain = (e: React.MouseEvent) => {
    e.preventDefault();
    if (painLevel > 1) setPainLevel(painLevel - 1);
  };

  // Renderizado del componente
  return (
    <Card className="w-full max-w-md mx-auto">
      {/* Encabezado de la tarjeta */}
      <CardHeader>
        <CardTitle className="text-center flex items-center justify-center gap-2">
          <Stethoscope className="w-5 h-5 text-blue-600" />
          <span className="text-lg font-semibold">ROMI Express - Registro de Síntomas</span>
        </CardTitle>
      </CardHeader>
      
      {/* Contenido de la tarjeta */}
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Mensaje de error */}
          {error && (
            <Alert variant="destructive" className="animate-fade-in">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {/* Campo para el nombre del paciente */}
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 text-center">
              Nombre del Paciente
            </label>
            <Input
              id="name"
              placeholder="Ingresa tu nombre y apellido"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-center border-gray-300 focus:border-blue-500"
            />
          </div>

          {/* Selector de síntomas */}
          <div className="space-y-2">
            <label htmlFor="symptom" className="block text-sm font-medium text-gray-700 text-center">
              Síntoma Principal
            </label>
            <Select 
              value={symptomId?.toString() ?? ""} 
              onValueChange={(value) => setSymptomId(parseInt(value))}
            >
              <SelectTrigger className="w-full text-center">
                <SelectValue placeholder="Selecciona un síntoma" />
              </SelectTrigger>
              <SelectContent>
                {symptoms.map((symptom) => (
                  <SelectItem key={symptom.id} value={symptom.id.toString()}>
                    {symptom.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Selector de nivel de dolor */}
          <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
            <div className="text-center">
              {/* Muestra el nivel de dolor con color según la intensidad */}
              <p className={
                `text-lg font-bold ${
                  painLevel <= 3 ? "text-green-600" :
                  painLevel <= 7 ? "text-orange-500" : "text-red-500"
                }`
              }>
                Nivel de Dolor: {painLevel}/10
              </p>
            </div>

            {/* Controles para ajustar el nivel de dolor */}
            <div className="flex items-center gap-4">
              {/* Botón para disminuir dolor */}
              <Button 
                variant="outline" 
                size="icon" 
                onClick={decrementPain}
                disabled={painLevel <= 1}
                className="rounded-full"
                type="button"
              >
                <Minus className="h-4 w-4" />
              </Button>

              {/* Slider para seleccionar nivel de dolor */}
              <Slider
                value={[painLevel]}
                onValueChange={(value) => setPainLevel(value[0])}
                max={10}
                min={1}
                step={1}
                className="flex-1 [&_.slider-base]:h-2 [&_.slider-thumb]:h-4 [&_.slider-thumb]:w-4"
              />

              {/* Botón para aumentar dolor */}
              <Button 
                variant="outline" 
                size="icon" 
                onClick={incrementPain}
                disabled={painLevel >= 10}
                className="rounded-full"
                type="button"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Leyenda de niveles de dolor */}
            <div className="flex justify-between text-sm">
              <span className={painLevel <= 3 ? "font-bold text-green-600" : "text-gray-500"}>Leve (1-3)</span>
              <span className={painLevel > 3 && painLevel <= 7 ? "font-bold text-orange-500" : "text-gray-500"}>Moderado (4-7)</span>
              <span className={painLevel > 7 ? "font-bold text-red-500" : "text-gray-500"}>Severo (8-10)</span>
            </div>
          </div>

          {/* Botón de envío del formulario */}
          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 transition-colors"
            disabled={loading}
          >
            {loading ? (
              // Estado de carga
              <>
                <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
                Analizando...
              </>
            ) : (
              // Estado normal
              <>
                <FontAwesomeIcon icon={faFileMedical} className="mr-2" />
                Obtener Recomendación
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}