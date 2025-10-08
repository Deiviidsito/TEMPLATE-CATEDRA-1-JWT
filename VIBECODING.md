# 🎯 Guía de Vibe Coding con Claude Sonnet 4.5

Esta guía te ayuda a trabajar de forma efectiva con Claude en modo agente para desarrollo backend.

## 📋 Reglas de Oro para Vibe Coding

### ✅ Sé Específico y Directo

**❌ MAL - Vago y Amplio:**
- "Crea un sistema de usuarios completo"
- "Mejora la seguridad"
- "Haz validaciones"

**✅ BIEN - Específico y Acotado:**
- "Crea un modelo User con: name (STRING), rut (STRING único), password (STRING)"
- "Agrega validación para que el RUT tenga formato XX.XXX.XXX-X"
- "Implementa el controlador createUser que valide campos vacíos"

### ✅ Sigue el Orden Correcto

**Para Backend con Express + Sequelize:**

```
1. MODELO → Define la estructura de datos
2. MIGRACIÓN → Crea la tabla en la BD
3. SEEDER (opcional) → Datos de ejemplo
4. CONTROLADOR → Lógica de negocio
5. RUTA → Endpoint HTTP
6. PRUEBA → Verifica que funciona
```

**Ejemplo de prompts en orden:**

```
1. "Crea un modelo User con name, rut y password"
2. "Crea la migración para el modelo User"
3. "Crea un seeder con 2 usuarios de ejemplo"
4. "Implementa el controlador getUsers"
5. "Implementa el controlador createUser con validaciones"
6. "Prueba el endpoint POST /users"
```

### ✅ Una Tarea a la Vez

**❌ MAL - Múltiples tareas:**
```
"Crea el modelo User, sus controladores, validaciones, 
autenticación JWT, middleware de permisos y tests"
```

**✅ BIEN - Paso a paso:**
```
1. "Crea el modelo User con name, rut y password"
   [Espera que termine]
   
2. "Ahora implementa getUsers y createUser"
   [Espera que termine]
   
3. "Agrega validación de formato de RUT en createUser"
   [Espera que termine]
```

## 🎯 Prompts Efectivos por Tipo de Tarea

### 1️⃣ Crear Modelos

```
"Crea un modelo [NombreModelo] con los campos:
- [campo1]: [tipo] [restricciones]
- [campo2]: [tipo] [restricciones]"
```

**Ejemplo:**
```
"Crea un modelo Product con los campos:
- name: STRING, obligatorio
- price: INTEGER, obligatorio, mayor a 0
- stock: INTEGER, por defecto 0"
```

### 2️⃣ Crear Migraciones

```
"Crea la migración para el modelo [NombreModelo]"
```

**Si necesitas campos especiales:**
```
"Crea la migración para Product y agrega un índice 
único en el campo 'code'"
```

### 3️⃣ Crear Seeders

```
"Crea un seeder con [cantidad] [modelos] de ejemplo"
```

**Ejemplo:**
```
"Crea un seeder con 3 productos de ejemplo"
```

### 4️⃣ Implementar Controladores

```
"Implementa el controlador [nombreFuncion] que:
1. [acción 1]
2. [acción 2]
3. [retorna]"
```

**Ejemplo:**
```
"Implementa el controlador createProduct que:
1. Valide que name y price no estén vacíos
2. Valide que price sea mayor a 0
3. Cree el producto
4. Retorne el producto con status 201"
```

### 5️⃣ Agregar Rutas

```
"Agrega las rutas [método HTTP] para [recurso]:
- [método] [path] → [controlador]"
```

**Ejemplo:**
```
"Agrega las rutas REST para productos:
- GET /products → getProducts
- POST /products → createProduct"
```

### 6️⃣ Agregar Validaciones

```
"Agrega validación en [controlador] para que 
[campo] [condición]"
```

**Ejemplo:**
```
"Agrega validación en createUser para que:
- name tenga mínimo 3 caracteres
- rut tenga formato XX.XXX.XXX-X
- password tenga mínimo 6 caracteres"
```

## 🚫 Qué NO Hacer

### ❌ No pidas todo junto
```
❌ "Crea un CRUD completo de usuarios con validaciones, 
    autenticación, permisos, logs y tests"
```
👉 **Divide en pasos pequeños**

### ❌ No uses términos vagos
```
❌ "Mejora el código"
❌ "Haz que sea más seguro"
❌ "Optimiza la base de datos"
```
👉 **Sé específico en qué quieres mejorar**

### ❌ No cambies de tarea sin terminar
```
❌ Paso 1: "Crea el modelo User"
    Paso 2: "Ahora crea un modelo Product" (sin terminar User)
```
👉 **Termina un módulo completo antes de pasar al siguiente**

### ❌ No asumas conocimiento compartido
```
❌ "Haz lo que falta"
❌ "Completa el resto"
```
👉 **Siempre especifica exactamente qué necesitas**

## 📝 Plantilla de Prompts para Backend

### Para crear un nuevo recurso completo:

```
1. "Crea un modelo [Nombre] con:
   - [campo1]: [tipo], [restricciones]
   - [campo2]: [tipo], [restricciones]"

2. "Crea la migración para [Nombre]"

3. "Crea un seeder con [X] ejemplos de [Nombre]"

4. "Implementa el controlador get[Nombres] que retorne 
   todos los registros"

5. "Implementa el controlador create[Nombre] que:
   - Valide [campo1] y [campo2]
   - Cree el registro
   - Retorne status 201"

6. "Agrega las rutas GET y POST para /[nombres]"

7. "Ejecuta las migraciones, seeders y prueba el endpoint 
   GET /[nombres]"
```

## ⚡ Tips para Vibe Coding Efectivo

### 1. **Verifica antes de continuar**
Después de cada paso importante:
```
"Muéstrame el contenido del archivo [archivo] para verificar"
"Ejecuta npm run migrate y muéstrame el resultado"
```

### 2. **Corrige específicamente**
Si algo está mal:
```
✅ "En user.controller.js, línea 15, cambia res.status(200) 
    por res.status(404)"
    
❌ "Arregla el error en el controlador"
```

### 3. **Pide explicaciones breves**
```
"Explica en 2 líneas qué hace el método findByPk"
```

### 4. **Usa el proyecto actual como contexto**
```
"Siguiendo el patrón que usamos en User, crea el modelo Product"
```

## 🎯 Ejemplo de Sesión Perfecta

```
TÚ: "Crea un modelo Product con: name (STRING, obligatorio), 
     price (INTEGER, obligatorio), stock (INTEGER, por defecto 0)"

CLAUDE: [Crea el modelo]

TÚ: "Perfecto. Ahora crea la migración para Product"

CLAUDE: [Crea la migración]

TÚ: "Ejecuta la migración"

CLAUDE: [Ejecuta npm run migrate]

TÚ: "Crea un seeder con 3 productos de ejemplo"

CLAUDE: [Crea el seeder]

TÚ: "Ejecuta el seeder"

CLAUDE: [Ejecuta npm run seed]

TÚ: "Implementa el controlador getProducts que:
     1. Obtenga todos los productos
     2. Si no hay productos, retorne 404
     3. Si hay, retorne 200 con los productos"

CLAUDE: [Implementa el controlador]

TÚ: "Agrega la ruta GET /products que use getProducts"

CLAUDE: [Agrega la ruta]

TÚ: "Inicia el servidor y prueba GET /products"

CLAUDE: [Inicia y prueba]
```

## 📚 Recursos Rápidos

### Tipos de datos Sequelize más comunes:
- `STRING` - Texto (varchar)
- `TEXT` - Texto largo
- `INTEGER` - Número entero
- `FLOAT` - Número decimal
- `BOOLEAN` - true/false
- `DATE` - Fecha y hora
- `ENUM` - Lista de valores permitidos

### Restricciones comunes:
- `allowNull: false` - Campo obligatorio
- `unique: true` - Valor único
- `defaultValue: X` - Valor por defecto
- `validate: { ... }` - Validaciones personalizadas

### Status HTTP comunes:
- `200` - OK (éxito)
- `201` - Created (creado exitosamente)
- `400` - Bad Request (datos inválidos)
- `404` - Not Found (no encontrado)
- `500` - Server Error (error del servidor)

---

## 🎉 Resumen Ultra Corto

1. **Sé específico**: Di exactamente qué campos, qué tipo, qué validaciones
2. **Sigue el orden**: Modelo → Migración → Seeder → Controlador → Ruta → Prueba
3. **Una cosa a la vez**: Termina una tarea antes de pedir la siguiente
4. **Verifica cada paso**: Pide ejecutar y mostrar resultados
5. **Corrige con precisión**: Di archivo, línea y qué cambiar

**Ejemplo perfecto:**
```
"Crea un modelo User con name (STRING, obligatorio), 
rut (STRING, único) y password (STRING, obligatorio)"
```

¡Ahora estás listo para hacer vibe coding efectivo! 🚀
