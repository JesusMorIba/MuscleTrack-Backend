const jwt = require("jwt-simple");
const moment = require("moment");
const dotenv = require('dotenv');

// Cargar las vairables de entorno
dotenv.config();

// Clave secreta para JWT, se debe definir en las variables de entorno
const secret = process.env.JWT_SECRET_USER;

if (!secret) {
    throw new Error("JWT_SECRET no está definida en las variables de entorno");
}


// Crear función para generar token
const createAccessToken = (user) => {
    const payload = {
        id: user._id,
        firstname: user.firstName,
        lastname: user.lastName,
        email: user.email,
        image: user.image,
        iat: moment().unix(),
        exp: moment().add(30, "days").unix()
    };

    return jwt.encode(payload, secret);
}

// Crear función para generar el refresh token
const createRefreshToken = (user) => {
    const payload = {
        id: user._id,
        type: "refresh",
        iat: moment().unix(),
        exp: moment().add(30, "days").unix(), 
    };

    return jwt.encode(payload, secret);
};

// Devolver jwt token verificado
module.exports = {
    secret,
    createAccessToken,
    createRefreshToken
};