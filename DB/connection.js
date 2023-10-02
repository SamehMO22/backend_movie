import mongoose from 'mongoose'

const connectDB  = async ()=>{
     return await mongoose.connect(`mongodb+srv://samehmo:127123_Mo@cluster0.ea74tpe.mongodb.net/`)
    .then(res=>console.log(`DB Connected successfully on .........`))
    .catch(err=>console.log(` Fail to connect  DB.........${err} `))
}


export default connectDB;   