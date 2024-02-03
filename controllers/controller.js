import {checkExistsSchema,signUpSchema,stUpSignUpSchema} from '../JoiValidation/joiValidate.js'
import bcrypt from 'bcrypt';
import SkynectModel from '../models/mongoModel.js';

export const checkExists = async(req,res) => {
    try{
        const phone = await checkExistsSchema.validateAsync(req.body , {abortEarly : false});
        const userExists = await SkynectModel.findOne(phone);
        if(userExists){
            res.status(405).json({message:"User already exists"})
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
            res.status(405).json({message:"User already exists"})
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