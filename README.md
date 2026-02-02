# Management Task

Prueba Técnica - Gestionar Tareas

Este proyecto es una aplicación para gestionar tus tareas personales. Permite a los usuarios iniciar sesión utilizando su correo electrónico y, una vez autenticados, pueden:

- **Crear tareas**: Añadir nuevas tareas con descripciones y fechas.
- **Ver tareas**: Visualizar todas las tareas en una lista organizada.
- **Editar tareas**: Modificar los detalles de las tareas existentes.
- **Eliminar tareas**: Borrar tareas que ya no sean necesarias.
- **Marcar tareas como completadas**: Marcar tareas como terminadas una vez finalizadas.
- **Buscar tareas**: Filtrar por título o descripción.
- **Exportar a PDF**: Descargar la lista de tareas en formato PDF.

La aplicación está diseñada para facilitar la organización de tareas diarias y mejorar la productividad mediante una interfaz simple y accesible.

## Requisitos

- Node.js (versión v18.13.0 o superior, recomendado v18.20.4)
- npm (versión 10.7.0 o superior)

## Tecnologías

- Angular 17
- Angular Material
- TypeScript 5.4
- Signals y Reactividad
- Deferrable Views (@defer)

## Adicional

- Guards
- Interceptors
- Patrones de diseño (repository, inyección de dependencias, etc.)
- Clean Architecture
- Componentes reutilizables
- Injects para módulos
- Reactividad con Signals
- Unit tests (Jasmine + Karma)

## Instalación

1. Instala las dependencias: `npm install`

## Uso

1. Ejecuta el proyecto: `npm start` o `ng serve`
2. Abre el navegador en `http://localhost:4200`

## Tests

Ejecuta los unit tests:

```bash
npm test
```

Para ejecutar una sola vez (sin abrir navegador):

```bash
npm run test:ci
```
