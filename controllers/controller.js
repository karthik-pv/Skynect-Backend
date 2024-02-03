import {checkExistsSchema,signUpSchema,stUpSignUpSchema,loginSchema} from '../JoiValidation/joiValidate.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import SkynectModel from '../models/mongoModel.js';

export const checkExists = async(req,res) => {
    try{
        const phone = await checkExistsSchema.validateAsync(req.body , {abortEarly : false});
        const userExists = await SkynectModel.findOne(phone);
        if(userExists){
            res.status(405).json({message:`User with phone number ${phone} already exists`})
        }
        else{
            res.status(200).json({message : "User doesn't exist"});
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json(error.details);
    }
}

export const signUp = async(req,res) => {
    try{
        let {password , phone} = req.body

        if(!req.body.isStartUp){
            await signUpSchema.validateAsync(req.body , {abortEarly : false});
            password = req.body.password
            phone = req.body.phone
        }

        else{
            await stUpSignUpSchema.validateAsync(req.body, {abortEarly : false});
            password = req.body.password
            phone = req.body.phone
        }

        const userExists = await SkynectModel.findOne({phone});

        if(userExists){
            res.status(405).json({message:`User with phone number ${phone} already exists`})
        }

        const hashedPassword = await bcrypt.hash(password, Number(process.env.BCRYPT_SALT_ROUNDS));

        req.body.password = hashedPassword;

        const newUser = new SkynectModel({...req.body});

        await newUser.save();

        res.status(200).json({message:"Signed up successfully"})
    }
    catch(error){
        console.log(error);
        res.status(500).json(error.details);
    }
}

export const login = async (req, res) => {
    try{
        const {phone , password} = await loginSchema.validateAsync(req.body , {abortEarly : false})

        const registeredUser = await SkynectModel.findOne({phone});

        if(!registeredUser){
            res.status(405).json({message:`User with phone number ${phone} doesn't exist`})
        }

        else{
            if(await bcrypt.compare(password , registeredUser.password)){

                const token = jwt.sign({_id:registeredUser._id} , process.env.JWT_SECRET, {expiresIn : process.env.JWT_EXPIRY})

                res.status(200).json({token})
            }
            else{
                res.status(405).json({message : "Wrong Password entered"});
            }
        }
    }
    catch(error){
        console.log(error);
    }
}

export const getList = async (req,res) => {
    try{
        const users = await SkynectModel.find();

        if(users.length===0){
            res.status(405).json({message : "No users found"})
        }
        else{
            res.status(200).json(users);
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json(error.details);
    }
}