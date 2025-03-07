const jwt = require("jwt-simple");
const moment = require("moment");
const libjwt = require("../helpers/jwt");

// Importar clave secreta
const secret = libjwt.secret;

// Middleware de autenticación
exports.authenticateAdmin = (req, res, next) => {
    console.log("Authorization Header:", req.headers.authorization);
    // Comprobar si me llega la cabecera de auth
    if (!req.headers.authorization) {
        return res.status(403).send({
            status: "error",
            message: "La petición no tiene la cabecera de autenticación"
        });
    }

    // Limpiar el token
    let token = req.headers.authorization.split(' ')[1];

    // Decodificar el token
    try {
        let payload = jwt.decode(token, secret);

        // Comprobar expiración del token
        if (payload.exp <= moment().unix()) {
            return res.status(401).send({
                status: "error",
                message: "Token expirado"
            });
        }

        // Agregar datos de usuario a request
        req.user = payload;

    } catch (error) {
        return res.status(404).send({
            status: "error",
            message: "Token invalido"
        });
    }

    // Pasar a ejecución de acción
    next();
}