const Admin = require("../../../models/admin");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("../helpers/jwt");

const login = async (req, res) => {
    // Recoger datos de la petición
    const { email, password } = req.body;

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
        const admin = await Admin.findOne({ email: email.toLowerCase() });
        if (!admin) {
            return res.status(404).json({
                status: "error",
                message: "Usuario no encontrado"
            });
        }

        // Comprobar contraseña
        const isPasswordCorrect = bcrypt.compareSync(password, admin.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({
                status: "error",
                message: "Contraseña incorrecta"
            });
        }

        // Generar accessToken
        const token = jwt.createAccessToken(admin);

        // Devolver respuesta exitosa con token
        return res.status(200).json({
            user: {
                firstName: admin.firstName,
                lastName: admin.lastName,
                email: admin.email,
                photo: admin.photo
            },
            token
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
    const { firstName, lastName, email, password, photo } = req.body;

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
        // Comprobar si el usuario ya existe
        const existingAdmin = await Admin.findOne({ email: email.toLowerCase() });
        if (existingAdmin) {
            return res.status(409).json({
                status: "error",
                message: "El admin ya existe"
            });
        }

        // Cifrar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear nuevo usuario
        const adminToSave = new Admin({
            firstName: firstName,
            lastName: lastName,
            email: email.toLowerCase(),
            photo: photo,
            password: hashedPassword
        });

        // Guardar usuario en la base de datos
        await adminToSave.save();

        // Devolver respuesta exitosa
        return res.status(201).json({
            status: "success",
            message: "Usuario registrado correctamente",
            admin: adminToSave
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

const me = async (req, res = response ) => {

    // Generar accessToken
    const token = jwt.createAccessToken(req.user); 
    
    res.json({
        user: req.user,
        token: token,
    });
};

module.exports = {
    login,
    signup,
    me
};
