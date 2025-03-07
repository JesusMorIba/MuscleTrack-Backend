// Importar dependencias
const connection = require("./database/connection");
const express = require("express");
const cors = require("cors");

// Mensaje bienvenida
console.log("API NODE para Muscle Track arrancada");

// Conexión a bbdd
connection();

// Crear servidor node
const app = express();
const puerto = 3900;

// Configurar cors
app.use(cors());

// Convertir los datos del body a objetos js
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cargar conf rutas
const userRoutes = require("./modules/user/routes/user");
const adminRoutes = require("./modules/admin/routes/admin");
const workoutRoutes = require("./modules/workout/routes/workout");
const exerciseRoutes = require("./modules/exercise/routes/exercise");

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/admin", adminRoutes); 
app.use("/api/v1/workout", workoutRoutes);
app.use("/api/v1/exercise", exerciseRoutes);

// Poner servidor a escuchar peticiones http
app.listen(puerto, () => {
    console.log("Servidor corriendo en el puerto: ", puerto);
});
