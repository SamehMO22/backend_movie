import { nanoid } from "nanoid"
import cloudinary from "../../utiles/cloudinary.js"
import newsModel from "../../../DB/model/newa.model.schema.js"
import problemModel from "../../../DB/model/problem.mode.js"

export const addnews = async(req , res , next)=>{

    // const {text}=req.body
    const text = req.body.text

    if(!req.file){
        return res.json({message:"please select your photo"})
    }

    const newname = nanoid(10)

    const {secure_url , public_id}= await cloudinary.uploader.upload(req.file.path,{
        folder : `${process.env.PROJECT_FOLDER}/news/${newname}`



    })


    const savenews = await newsModel.create({
        text,
        image:{
            path:secure_url,
            public_id
        }

    })

    if (savenews){
        res.status(200).json({message:"we uploud the news for you"})
            
    }

    else{
        res.status(400).json({message:"sorry fail"})
    }



    }





    export const deletenew = async (req , res , next)=>{
        const {_id} = req.body

        if(!req.body._id){
            res.json({message:"inter id"})
        }
        // if(req.body._id !=newsModel._id){
        //     res.json({message:"not correct id"})
        // }

    
    
        const deleteid = await newsModel.findOneAndDelete({_id})
        if(deleteid){
            res.json({message:"we delet this post"})
        }
        else{
            res.json({message:"sorry can not delete"})
        }
    }






    export const getnews = async(req , res , next)=>{
        const getnew = await newsModel.find()
        if(getnew){
            res.json({message:"we get this post",getnew})
        }
        else{
            res.json({message:"sorry can not get"})
        }

    }































    export const searchnews = async (req , res , next)=>{
        const {_id} = req.body

        if(!req.body._id){
            res.json({message:"inter id"})
        }
        // if(req.body._id !=newsModel._id){
        //     res.json({message:"not correct id"})
        // }

    
    
        const searchid = await newsModel.findOne({_id})
        if(searchid){
            res.json({message:"we get this post",searchid})
        }
        else{
            res.json({message:"sorry can not get"})
        }
    }













    export const problem = async(req , res ,next)=>{
        const {name , email , message} = req.body
        if(!email || !name || !message){
            res.json("please enter the data")
        }
        const saveprobem = await problemModel.create({
            name,
            email,
            message

        })
        if (saveprobem){
            res.json("add done")
        }
        else{
            "sorry can not add"
        }
        


    }









