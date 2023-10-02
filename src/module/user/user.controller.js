
    import { tokenGeneration, tokenDecode } from "../../utiles/GenerateAndVerifyToken.js"
    import sendEmail from "../../utiles/sendEmail.js"
    
    import pkg from 'bcryptjs'
    
    
    
    import userModel from "../../../DB/model/auth.mode.js"

    // "first_name":"Ahmed",
//  "last_name":"Ali",
//  "email":"ahmedAli@gmail.com",
//  "password":"Ahmed@123",
//  "age":"23"
    
    
    export const addUser= async(req , res ,next)=>{
    
    
        const { 
            first_name,
            last_name,
            email,
            password,
            age,
            
    
        } = req.body
        if(!first_name ||!last_name ||!email||!password ||!age){
            res .json({ message: "please complet all data" })


        }
        const checkemail = await userModel.findOne({ email }).select('_id email')
        if (checkemail){
            // return next (new Error('please enter anoter email',{cause:400}))
            res .json({ message: "please enter anoter email" })

        }
    
    
    
        const newUser = new userModel({
            first_name,
            last_name,
            email,
            password,
            age,
            
    
        })
        // if(newUser){
        //     res.json({message:''})
        // }
    
    
        // confimation
        const token =  tokenGeneration({ payload: { x:newUser.first_name,_id: newUser._id, email: newUser.email  } })
        console.log({
            token
        });
        if (!token) {
            return next(new Error('Token Generation Fail', { cause: 400 }))
        }
    
    
    
    
        const confirmationLink =
            `${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}`
    
        const message = `<a href= ${confirmationLink}>Click to confirm</a>`
        const sentEmail = await sendEmail({
            to: email,
            message,
            subject: "Confirmation Email"
        })
        if (!sentEmail) {
            return next(new Error('Send Email Service Fails', { cause: 400 }))
        }
        await newUser.save()
        res.status(201).json({ message: "success" })
    }
    
    
    
    
    // confirmation email
    
    
    
    export const confirmEmail = async (req, res, next) => {
        const { token } = req.params
    
        const decode = tokenDecode({ payload: token })
        if (!decode?._id) {
            return next(new Error('Decoding Fails', { cause: 400 }))
        }
        const userConfirmed = await userModel.findOneAndUpdate({ _id: decode._id }, {
            isConfirmed: true
        })  

        if (!userConfirmed) {
            return next(new Error('please check if you already confirm you email , if not please try to signup again', { cause: 400 }))
    
        }
        return res.status(200).json({ message: "Your email confirmed", decode })
    }
    // axios
    
// ===================================login Api===========================================================================================
    export const login = async (req, res, next) => {
        
        const { email, password } = req.body
        const user = await userModel.findOne({email})
        if (!user) {
            // return next(new Error('please if enter a valid email or make sure that you confirm your email', { cause: 400 }))
            return res.json({ message: "PLEASE ENTER VAILD MAIL " })

        }
        const match = pkg.compareSync(password, user.password)
        if (!match) {
            return res.json({message:"password not correct"})
            // return next(new Error('in-valid login information', { cause: 400 }))
        }
        const token = tokenGeneration({
            payload: {
                first_name:user.first_name,
                last_name:user.last_name,
                _id: user._id,
                email: user.email,
                isLoggedIn: true,
                age:user.age
            }
        })
        await userModel.findOneAndUpdate({ email })
        return res.status(200).json({ message:"Login Done", token })
    
    }
        




















































