const express=require("express");
const { UserModel } = require("../Models/userModel");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const userRouter=express.Router();

userRouter.post("/register",async(req,res)=>{
const {username,email,pass}=req.body;
try {
    bcrypt.hash(pass, 5,async (err, hash) =>{
       if(err){
        res.send({"err":err})
       }
       else{
        const user=new UserModel({username,email,pass:hash});
        await user.save()
        res.json({msg:"user has been registered",user:req.body})
       }
    });
} catch (error) {
    res.send({"err":error})
}
})

userRouter.post("/login",async(req,res)=>{
    const {email,pass}=req.body
try {
    const user=await UserModel.findOne({email});
    if(user){
        bcrypt.compare(pass, user.pass, (err, result) =>{
            if(result){
                const token=jwt.sign({userID:user._id,user:user.username},"masai")
                res.send({"msg":"logged in","token":token})
            }
            else{
                res.send({"error":err})
            }
        });
    }
    else{
        res.send({"msg":"user is not exist"})
    }
} catch (error) {
    res.send({error:"error"})
}
})

module.exports={
    userRouter
}