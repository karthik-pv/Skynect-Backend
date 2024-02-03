import joi from 'joi'

export const checkExistsSchema = joi.object({

    phone : joi.string().pattern(/^\+91\d{10}$/).required()

})

export const signUpSchema = joi.object({

    name : joi.string().required(),

    roles : joi.array().items(joi.string().valid("Entrprnr","evtMgrClg", "Mentor", "Investor", "EmpStup")).min(1).required() ,

    isStartUp : joi.boolean().required() ,

    oneLinerSelf : joi.string().max(150).required(),

    detailedDescSelf : joi.string().max(500).required(),

    idea : joi.string().max(500),

    phone : joi.string().pattern(/^\+91\d{10}$/).required() ,
    
    email : joi.string().email(),

    password : joi.string().required()
})

export const stUpSignUpSchema = joi.object({

    name : joi.string().required(),

    roles : joi.array().items(joi.string().valid("Entrprnr","evtMgrClg", "Mentor", "Investor", "EmpStup")).min(1).required() ,

    isStartUp : joi.boolean().required() ,

    oneLinerSelf : joi.string().max(150).required(),

    detailedDescSelf : joi.string().max(500).required(),

    oneLinerStUp : joi.string().max(150).required(),

    detailedDescStUp : joi.string().max(500).required(),

    idea : joi.string().max(500),

    phone : joi.string().pattern(/^\+91\d{10}$/).required(),
    
    email : joi.string().email(),

    password : joi.string().required()

})

export const loginSchema = joi.object({

    phone : joi.string().pattern(/^\+91\d{10}$/).required(),

    password : joi.string().required()
    
})