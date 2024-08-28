import * as mongoose from 'mongoose';

const connection = {};

export const connectToDb = async () => {
    try {
        if(connection.isConnected) {
            console.log("Using existing connection");
            return;
        }
        const db = await mongoose.connect(process.env.MONGO);
        connection.isConnected = db.connections[0].readyState;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

// export async function connectToDb(){
//     try {
//         await mongoose.connect(process.env.MONGO)
//     } catch (error) {
//         console.log(error);
//     }
// }

//così è possibile collegarsi al nostro server mongo atlas tramite mongoose, richiameremo la funzione nel momento in cui vogliamo
//connetterci al DB