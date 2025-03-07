# MuscleTrack-Backend

## Descripción
MuscleTrack-Backend es la API REST que da soporte a MuscleTrack, una aplicación para el seguimiento de entrenamientos y progreso fitness. Permite a los usuarios gestionar sus rutinas, registrar ejercicios y analizar su desempeño.

## Tecnologías Utilizadas
- **Node.js** - Entorno de ejecución para JavaScript en el backend.
- **Express.js** - Framework para la construcción de APIs REST.
- **MongoDB** - Base de datos NoSQL para el almacenamiento de datos.
- **Mongoose** - ODM para interactuar con MongoDB.
- **JWT (JSON Web Token)** - Para la autenticación y seguridad.
- **dotenv** - Para la gestión de variables de entorno.

## Endpoints Principales
### Autenticación
- **POST** `/api/auth/register` - Registro de usuario.
- **POST** `/api/auth/login` - Inicio de sesión.

### Usuarios
- **GET** `/api/users/:id` - Obtener datos de un usuario.
- **PUT** `/api/users/:id` - Actualizar información de usuario.
- **DELETE** `/api/users/:id` - Eliminar usuario.

### Ejercicios y Rutinas
- **POST** `/api/exercises` - Crear un ejercicio.
- **GET** `/api/exercises` - Obtener todos los ejercicios.
- **GET** `/api/routines` - Obtener todas las rutinas del usuario.
- **POST** `/api/routines` - Crear una nueva rutina.

## Licencia
Este proyecto está bajo la licencia MIT. Puedes ver el archivo [LICENSE](LICENSE) para más detalles.

---
Hecho por [JesusMorIba](https://github.com/JesusMorIba)

