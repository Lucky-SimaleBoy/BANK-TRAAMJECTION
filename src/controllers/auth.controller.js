const userModel = require('../models/user.model.js');
const jwt = require('jsonwebtoken');
const emailService=require('../services/email.service.js');
/**
 * user register controler 
 * POST/ api /auth / register
 */

async function userRegisterController(req, res) {
    const { email, password, name } = req.body;

    const isExist = await userModel.findOne({ email });
    if (isExist) {
        return res.status(422).json({
            message: 'User already exists',
            status: 'failed'
        });
    }

    const user = await userModel.create({ email, password, name });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '3d'
    });

    res.cookie('token', token);
    await emailService.sendRegistrationEmail(user.email,user.name)
    return res.status(201).json({
        user: {
            _id: user._id,
            email: user.email,
            name: user.name
        },
        token
    });
}
/**
 * -User login controler
 * POST/ api / auth /login
 */
async function userLoginController(req,res){
    try{
        const {email,password}=req.body;
    const user= await userModel.findOne({email}).select("+password");
    if (!user){
         return res.status(401).json({
            message:"User not found"
        })
    }
    const isValidPassword=await user.comparePassword(password)
    if (!isValidPassword){
        return   res.status(401).json({
            message:"invalid email or password "
        })
    }
    const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{
        expiresIn:"3d"
    })
     await emailService.sendLoginEmail(user.email,user.name)
    res.cookie("token",token);
     return res.status(200).json({
        message:"Login succesfully",
        user:{
            userId:user._id,
            email:user.emmail,
            name:user.name
        },token
    })
    }catch{
        res.status(500).json({
            message:"Internal server error "
        });
    }
}
module.exports = {
    userRegisterController,
    userLoginController
};