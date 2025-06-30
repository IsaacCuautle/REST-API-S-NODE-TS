# REST API's con Node.js y TypeScript

Este proyecto es una API RESTful construida con Node.js, Express y TypeScript. Permite gestionar productos y está estructurada para facilitar la escalabilidad y el mantenimiento.

## Características

- CRUD de productos
- Validación de datos de entrada
- Documentación con Swagger
- Pruebas unitarias con Jest
- Cobertura de código

## Estructura del proyecto

```
src/
  config/         # Configuración (DB, Swagger)
  data/           # Datos de ejemplo o inicialización
  handlers/       # Controladores de rutas
  middleware/     # Middlewares personalizados
  models/         # Modelos de datos (Sequelize, etc)
  __tests__/      # Pruebas unitarias
  index.ts        # Punto de entrada
  router.ts       # Definición de rutas
  server.ts       # Configuración y arranque del servidor
```

## Instalación

1. Clona el repositorio:
   ```sh
   git clone https://github.com/tu-usuario/tu-repo.git
   cd tu-repo
   ```

2. Instala las dependencias:
   ```sh
   npm install
   ```

3. Configura las variables de entorno en `.env`.

## Uso

Para iniciar el servidor en modo desarrollo:
```sh
npm run dev
```

Para construir el proyecto:
```sh
npm run build
```

Para ejecutar las pruebas:
```sh
npm test
```

## Endpoints principales

- `GET /products` - Listar productos
- `GET /products/:id` - Obtener producto por ID
- `POST /products` - Crear producto
- `PUT /products/:id` - Actualizar producto
- `DELETE /products/:id` - Eliminar producto

## Documentación

La documentación Swagger está disponible en:  
`/api-docs`


> Hecho con ❤️ usando Node.js y TypeScript.
