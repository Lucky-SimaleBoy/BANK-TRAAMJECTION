const mongoose =require("mongoose")

const accountSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:True

    },
    status:{
        enum:{ 
        values:["ACTIVE","FROZEN","CLOESD"],
        message:"status can be either Active ,Frozen , Closed"
        }
    },
    currency:{
        type:String,
        required:[true,"currency is required for creating an account"],
        default:"INR"

    }
},{ timestamps:True})

accountSchema.index({user:1,status:1})

const accountModel=mongoose.model("account",accountSchema)

module.exports=accountModel