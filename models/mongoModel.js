import mongoose from "mongoose";

const SkynectSchema = new mongoose.Schema({
    roles : {
        type : Array,
        required : true
    },

    isStartUp : {
        type : Boolean,
        required : true
    },

    name : {
        type : String,
        required : true
    },

    oneLinerSelf : {
        type : String,
        required : true
    },

    detailedDescSelf : {
        type : String,
        required : true
    },

    oneLinerStUp : {
        type : String,
    },

    detailedDescStUp : {
        type : String,
    },

    idea : {
        type : String
    },

    phone : {
        type: String,
        unique : true,
        required : true
    },

    email : {
        type : String,
    },

    password : {
        type: String,
        required : true
    }

},{timestamps : true})

SkynectSchema.set('toJSON',{
    transform: function (doc, ret, opt) {
        delete ret['password']
        delete ret['__v']
        return ret
    }
})


const SkynectModel = new mongoose.model("Skynectors",SkynectSchema)

export default SkynectModel