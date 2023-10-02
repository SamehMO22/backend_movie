import { Schema, model } from "mongoose";



const problemSchema = new Schema ({

    name:{
        
    },


    email:{
        type:String,
        required:true
    }
    ,


    message:{
        type:String,
        required:true
    }


},{timestamps:true})





const problemModel = model('problems' , problemSchema)



export default problemModel