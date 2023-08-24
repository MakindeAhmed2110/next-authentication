import mongoose from 'mongoose';


export async function connect() {
    try{
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection;

        connection.on('connected', ()=>{
            console.log("Connected successfully")
        })
    } catch(error){
        console.log('Something went wrong')
        console.log(error)
    }
}