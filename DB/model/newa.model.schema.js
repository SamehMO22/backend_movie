import { Schema, model } from "mongoose";



const newsSchema = new Schema ({

    image:{
        path: {
            type: String,
            required: true
        },
        public_id: {
            type: String,
            required: true
        }
    },


    text:{
        type:String,
        required:true
    }


},{timestamps:true})





const newsModel = model('new' , newsSchema)



export default newsModel