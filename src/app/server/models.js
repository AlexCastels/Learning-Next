import * as mongoose from 'mongoose';

const connection = {};

const connectToDb = async () => {
    try {
        if(connection.isConnected) {
            console.log("Using existing connection");
            return;
        }
        const db = await mongoose.connect(process.env.MONGO ,  {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        connection.isConnected = db.connections[0].readyState;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

export default connectToDb;

// export async function connectToDb(){
//     try {
//         await mongoose.connect(process.env.MONGO , {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//           })
//     } catch (error) {
//         console.log(error);
//     }
// }


//così è possibile collegarsi al nostro server mongo atlas tramite mongoose, richiameremo la funzione nel momento in cui vogliamo
//connetterci al DB

//mongoose permette di poter creare tabelle nel DB attraverso gli Schemi, altro non sono che la rappresentazioni delle tabelle
//sottoforma di obj

const userSchema = new mongoose.Schema({
    username:{
        type : String,
        required: true,
        unique: true,
        min:3,
        max:20,
    } ,
    email:{
        type : String,
        required : true,
        unique:true,
        max: 50,
    } ,
    password:{
        type : String ,
        min: 6,
    },
    img:{
        type: String,
    },
    isAdmin:{
        type: Boolean,
        default : false
    },
},
{
    timestamps : true
});

const postSchema = new mongoose.Schema({
    title:{
        type : String,
        required: true,
        unique: true,
    } ,
    desc:{
        type : String,
        required : true,
    } ,
    img:{
        type: String,
    },
    userId:{
        type: String,
        required : true,
    },
    slug:{
        type : String,
        required : true,
        unique: true,
    }
},
{
    timestamps : true
});

export const User = mongoose.models?.User || mongoose.model("User", userSchema);
export const Post = mongoose.models?.Post || mongoose.model("Post", postSchema);

//