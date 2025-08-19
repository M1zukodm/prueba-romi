# ROMI Express - Sistema de Diagnóstico Médico

![ROMI Express Logo](./src/assets/logo1.png)

Sistema automatizado para evaluación de síntomas médicos y generación de recomendaciones preliminares.

## 🚀 Características Principales

- 📋 Formulario interactivo para registro de síntomas
- 📊 Escala visual de dolor (1-10) con retroalimentación inmediata
- ⚠️ Detección de casos que requieren atención urgente
- 📑 Historial de pacientes registrados
- 📱 Diseño responsive (mobile-first)

## 🛠️ Tecnologías Utilizadas

- React 18 + TypeScript
- Tailwind CSS
- Lucide React + FontAwesome (iconos)
- Vite (bundler)
- Firebase
- Express
- NodeJs
- JavaScript
- Shadcn

## 🏗️ Arquitectura del Proyecto
```mermaid
graph TD
    A[src] --> B[components]
    A --> C[lib]
    A --> D[assets]
    A --> E[App.tsx]
    
    B --> B1[/ui/]
    B --> B2[symptom-form.tsx]
    B --> B3[symptom-result.tsx]
    B --> B4[FirestoreDate.tsx]
    
    C --> C1[api.ts]
    
    style A fill:#f9f,stroke:#333
    style B fill:#bbf,stroke:#333
    style C fill:#bbf,stroke:#333
    style D fill:#bbf,stroke:#333
    style E fill:#bfb,stroke:#333


## 📦 Componentes Clave

### `SymptomForm`
- Captura nombre, síntoma y nivel de dolor
- Validación en tiempo real
- Selector de síntomas con búsqueda
- Control deslizable de dolor (1-10)

### `SymptomResult`
- Muestra recomendaciones médicas
- Destaca casos urgentes (alerta roja)
- Permite reiniciar el diagnóstico

### `App`
- Coordina el flujo de la aplicación
- Gestiona estados globales
- Maneja pantallas de carga


## 📌 Requisitos
- Node.js 16+
- npm 8+


## ⚙️ Instalación
- Clonar repositorio este repositorio
  
- Instalar dependencias:
  npm install

-Ejecutar en desarrollo:
 npm run dev
 
- Construir para producción:
 npm run build
