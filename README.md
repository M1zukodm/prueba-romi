# ROMI Express - Sistema de Diagnóstico Médico

![ROMI Express Logo](./src/assets/logo1.png)

Sistema automatizado para evaluación de síntomas médicos y generación de recomendaciones preliminares.

---

## 🚀 Características Principales

- 📋 Formulario interactivo para registro de síntomas  
- 📊 Escala visual de dolor (1-10) con retroalimentación inmediata  
- ⚠️ Detección de casos que requieren atención urgente  
- 📑 Historial de pacientes registrados  
- 📱 Diseño responsive (mobile-first)  

---

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

---

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
    
    style A fill:#2563eb,stroke:#333,stroke-width:2px,color:#fff
    style B fill:#3b82f6,stroke:#333,color:#fff
    style C fill:#3b82f6,stroke:#333,color:#fff
    style D fill:#3b82f6,stroke:#333,color:#fff
    style E fill:#10b981,stroke:#333,color:#fff
