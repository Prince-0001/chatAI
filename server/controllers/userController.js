
import User from "../model/user.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register=async(req,res)=>{

    const {email,username}=req.body;
    const user= await User.findOne({email})
    console.log(user);
    if(user) return res.send("User already exists");
    const salt =bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password,salt);
    
    try{
        const user= await User.create({email,username,password:hash});
        const savedUser=await user.save();
        res.status(200).send(savedUser);
    }
    catch(err){
        console.log(err);
        res.status(501).send(err);
    }
}

export const login=async(req,res)=>{
    const {email}=req.body;

    try{
        const user= await User.findOne({email});

        if(!user) return res.status(404).json("User not found!");

        //CHECK PASSWORD
        const isPasswordCorrect =bcrypt.compareSync(req.body.password,user.password);
        if(!isPasswordCorrect) return res.status(400).json("Wrong username or password!");

        const token=jwt.sign({id:user._id},"&*()",{expiresIn:'1h'});
        const {password,...other}=user;

        res.setHeader(
            'Set-Cookie',
            `access_token=${token};  Secure; SameSite=None; Path=/`
        ).status(200).json(other);
    }
    catch(err){
        console.log(err);
        res.status(401).send(err);
    }
    
}


export const logout=(req,res)=>{
    res.clearCookie("access_token",{
        sameSite:"none",
        secure:true,
    }).status(200).json("User has been logged out.")
}
