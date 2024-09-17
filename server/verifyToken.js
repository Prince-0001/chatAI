import jwt from "jsonwebtoken"

export default function verify(req,res,next){
    const token=req.cookies.access_token
   
    if(!token) return res.status(401).json("Not authenticated!")

        try{
            jwt.verify(token,"&*()",(err,userInfo)=>{
                if(err) return res.status(403).json("Token is not valid!")
                req.userId=userInfo.id;
                next();
            })
        }
        catch(err){
            return res.status(401).json("You are not authenticated!");
        }
    

}