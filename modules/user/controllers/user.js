const User = require("../../../models/user");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("../helpers/jwt");

const login = async (req, res) => {
    // Recoger datos de la petición
    const { email, password } = req.body;

    console.log(email);
    
    console.log(password);

    // Validar campos obligatorios
    if (!email || !password) {
        return res.status(400).json({
            status: "error",
            message: "Faltan datos por enviar"
        });
    }

    // Validar formato del email
    if (!validator.isEmail(email)) {
        return res.status(400).json({
            status: "error",
            message: "El email no es válido"
        });
    }

    try {
        // Buscar usuario en la BBDD
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "Usuario no encontrado"
            });
        }

        // Comprobar contraseña
        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({
                status: "error",
                message: "Contraseña incorrecta"
            });
        }

        // Generar accessToken
        const accessToken = jwt.createAccessToken(user);

        // Generar refreshToken
        const refreshToken = jwt.createRefreshToken(user);

        // Devolver respuesta exitosa con token
        return res.status(200).json({
            status: "success",
            data: {
              accessToken,
              refreshToken
            }
        });

    } catch (error) {
        // Manejo de errores
        return res.status(500).json({
            status: "error",
            message: "Error al autenticar usuario",
            error: error.message
        });
    }
};

// Registro de usuarios
const signup = async (req, res) => {
    // Recoger datos de la petición
    const { firstName, lastName, email, password } = req.body;

    // Validar campos obligatorios
    if (!firstName || !email || !password) {
        return res.status(400).json({
            status: "error",
            message: "Faltan datos por enviar"
        });
    }

    // Validar formato del email
    if (!validator.isEmail(email)) {
        return res.status(400).json({
            status: "error",
            message: "El email no es válido"
        });
    }

    try {
        // Comprobar si el usuario ya existe
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(409).json({
                status: "error",
                message: "El usuario ya existe"
            });
        }

        // Cifrar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear nuevo usuario
        const userToSave = new User({
            firstName,
            lastName,
            email: email.toLowerCase(),
            password: hashedPassword
        });

        // Guardar usuario en la base de datos
        await userToSave.save();

        // Devolver respuesta exitosa
        return res.status(201).json({
            status: "success",
            message: "Usuario registrado correctamente",
            user: userToSave
        });

    } catch (error) {
        // Manejo de errores
        return res.status(500).json({
            status: "error",
            message: "Error al registrar usuario",
            error: error.message
        });
    }
};

// Datos de usuario
const me = (req, res) => {
    return res.status(200).send({
        message: "Mensaje enviado desde: controllers/user.js",
    });
};


module.exports = {
    login,
    signup,
    me,
};
