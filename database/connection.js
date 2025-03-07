const mongoose = require("mongoose");

const connection = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION);
        console.log("Conectado correctamente a bd: muscle_track");
    } catch (error) {
        console.log(error);
        throw new Error("No se ha podido conectar a la base de datos!");
    }
};

module.exports = connection;
