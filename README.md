# Catedra 1 - DSWM

Proyecto de ejemplo para aprender desarrollo backend con Node.js, Express y Sequelize.

> 🤖 **¿Vas a hacer vibe coding con Claude?** Lee primero [VIBECODING.md](./VIBECODING.md) para trabajar de forma efectiva

## Información de las librerías

- **express**: Framework web para Node.js
- **sequelize**: ORM para trabajar con bases de datos SQL
- **sequelize-cli**: Herramienta de línea de comandos para migraciones y seeders
- **sqlite3**: Base de datos SQLite (simple y sin configuración)
- **dotenv**: Variables de entorno
- **nodemon**: Reinicio automático del servidor en desarrollo

## Como correr el proyecto

1. Instalar dependencias:
```bash
npm install
```

2. Crear archivo `.env` en la raíz del proyecto (opcional, usa valores por defecto):
```
PORT=3000
DB_NAME=ejemplo
```

Adicionalmente puedes definir el secreto para los JWT:
```
JWT_SECRET=tu_secreto_super_seguro
```

Puedes generar un secreto seguro con alguno de estos comandos:

- PowerShell (Windows): genera 48 bytes en base64

```powershell
$bytes = New-Object byte[] 48; (New-Object System.Security.Cryptography.RNGCryptoServiceProvider).GetBytes($bytes); [Convert]::ToBase64String($bytes)
```

- Node (cross-platform): genera 48 bytes en base64

```powershell
node -e "console.log(require('crypto').randomBytes(48).toString('base64'))"
```

Copiala y pégala en tu `.env` así:

```
JWT_SECRET=la_cadena_generada_aqui
```

3. Ejecutar migraciones para crear las tablas:
```bash
npm run migrate
```

4. Ejecutar seeders para insertar datos de ejemplo:
```bash
npm run seed
```

5. Iniciar el servidor:
```bash
npm run dev
```

## Comandos disponibles

- `npm run dev` - Inicia el servidor en modo desarrollo (con nodemon)
- `npm start` - Inicia el servidor en modo producción
- `npm run migrate` - Ejecuta las migraciones (crea tablas)
- `npm run undo:migrate` - Revierte la última migración
- `npm run seed` - Ejecuta los seeders (inserta datos de ejemplo)

## Orden de desarrollo (Qué tengo que hacer)

### 1. PRIMERO: Modelos
- Ya está creado el modelo `User` en `src/models/user.js`
- Define la estructura de datos (name, lastName)

### 2. SEGUNDO: Migraciones
- Ya está creada la migración en `src/database/migrations/`
- Define la estructura de la tabla en la base de datos
- Ejecutar con: `npm run migrate`

### 3. TERCERO: Seeders (opcional)
- Ya está creado el seeder en `src/database/seeders/`
- Inserta datos de ejemplo
- Ejecutar con: `npm run seed`

### 4. CUARTO: Controladores
- Implementar la lógica en `src/controllers/user.controller.js`
- Sigue los comentarios TODO en el archivo
- Funciones a implementar:
  - `getUsers`: Obtener todos los usuarios
  - `createUser`: Crear un nuevo usuario

### 5. QUINTO: Rutas
- Ya está configurado en `src/routes/user.routes.js`
- Define los endpoints disponibles

### 6. SEXTO: Probar
- Usar Postman, Thunder Client o similar para probar:
  - GET `http://localhost:3000/users` - Listar usuarios
  - POST `http://localhost:3000/users` - Crear usuario (body: { "name": "Juan", "lastName": "Pérez" })

## Endpoints disponibles

- `GET /users` - Obtener todos los usuarios
- `POST /users` - Crear un nuevo usuario

Autenticación / JWT

- `POST /auth/login` - Iniciar sesión y recibir un JWT
  - Body JSON: { "rut": "tu_rut", "contraseña": "tu_contraseña" }
  - Respuesta: { "token": "<jwt>" }

Notas sobre rutas protegidas

- `GET /users` ahora está protegida: debes enviar el header
  `Authorization: Bearer <token>` usando el token recibido en `/auth/login`.

Ejemplo rápido con curl (PowerShell / bash):

1) Login y obtener token:

```bash
curl -s -X POST http://localhost:3000/auth/login -H "Content-Type: application/json" -d '{"rut":"mi_rut","contraseña":"mi_pass"}'
```

2) Usar token para solicitar usuarios (reemplaza <TOKEN>):

```bash
curl -s http://localhost:3000/users -H "Authorization: Bearer <TOKEN>"
```

Cors

- CORS está habilitado globalmente para desarrollo. Si deseas restringir orígenes, modifica `src/server.js` y ajusta `cors()` con la opción `origin`.

## Autor

David Alvarez